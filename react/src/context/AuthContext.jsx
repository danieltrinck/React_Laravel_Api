import { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import axios from "../Api/axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    let [err, setErrors] = useState("");
    let [RegisterErr, setRegisterErrors] = useState([]);
    const [message, setMessage] = useState(null);
    // const csrf = () => axios.get("/sanctum/csrf-cookie");
    const navigate =  useNavigate();

    const getUser = async () => {

        try {
            
            //const token = Cookies.get('token');
            const { data } = await axios.get('/api/user',
            {headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
            }});
            setUser(data);

        }catch (e){

        }
    }

    const login = async({ ...data }) => {

        // await csrf();

        try {
            const login = await axios.post('/api/login', { ...data });
            Cookies.set('token', login.data.token, { expires: 7, secure: true });
            await getUser();
            navigate("/");
        } catch (error) {

            if(error.response.status === 401){
                setErrors(error.response.data.error);
            }

        }

    }

    const register = async({ ...data }) => {

        // await csrf();

        try {
            const login = await axios.post('/api/register', { ...data });
            Cookies.set('token', login.data.token, { expires: 7, secure: true });
            await getUser();
            navigate("/");
        } catch (error) {

            if(error.response.status === 422){
                setRegisterErrors(error.response.data.errors);
            }

        }

    }

    const logout = async () => {

        try {
            
            await axios.post('/api/logout', null,
            {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            }).then(() => {
                setUser(null);
                Cookies.set('token', '', { expires: -1, secure: true });
            });
        } catch (error) {
            
        }
    }

    const ListUsers = async({ ...data }) => {

        // await csrf();

        try {

            const listUsers = await axios.post('/api/users', null,
            {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            }).then(() => {
                setUsers(listUsers);
            });
        } catch (error) {

            if(error.response.status === 422){
                setRegisterErrors(error.response.data.errors);
            }

        }

    }

    const deposit = async({ ...data}) => {

        // await csrf();

        try {
            const deposit = await axios.post('/api/deposit/'+data.id, { ...data },
            {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            });
            setMessage('Seu depósito foi realizado com sucesso!! O número do seu comprovante é: '+deposit.data.comprovant);
        } catch (error) {

            if(error.response.status === 422){
                setRegisterErrors(error.response.data.errors);
            }

        }

    }

    const transfer = async({ ...data}) => {

        // await csrf();

        try {
            const transfer = await axios.post('/api/transfer/'+data.id, { ...data },
            {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            });
            setMessage('Sua transfêrencia foi realizada com sucesso!! O número do seu comprovante é: '+transfer.data.comprovant);
        } catch (error) {

            if(error.response.status === 422){
                setRegisterErrors(error.response.data.errors);
            }

        }

    }

    const messageClear = () => {
        setMessage(null);
        setRegisterErrors([]);
        setErrors("");
    }

   useEffect(()=>{
        if(!user){
            getUser();
        }
    },[])

    return <AuthContext.Provider value={{ user, users, err, RegisterErr, message, getUser, login, logout, register, ListUsers, deposit, transfer, messageClear}}>
        { children }
    </AuthContext.Provider>

}

export default function useAuthContext(){
    return useContext(AuthContext);
}
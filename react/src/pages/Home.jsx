import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useState } from 'react';
import Cookies from 'js-cookie';
import axios from '../Api/axios';
import useAuthContext from '../context/AuthContext';

export const Home = ({valor}) => {
  
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [last_page, setlast_page] = useState(1);

  const { user, messageClear } = useAuthContext();

  useEffect(() => {

    messageClear();
    const fetchUsers = async () => {
      try {

          const getusers = await axios.get(`/api/users?page=${currentPage}`,
          {
              headers: {
                  'Authorization': `Bearer ${Cookies.get('token')}`
              }
          });
          setUsers(getusers.data.data);
          setlast_page(getusers.data.last_page);

          valor(getusers.data.data[0].account.value);

      } catch (error) {

          console.log(error);

      }

    
    };


    fetchUsers();
    
  }, [currentPage]); 


  return (
    <>
  
    <div className="bg-blue-500 text-white p-2">Listando usuários cadastrados</div>
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-600 text-white uppercase text-sm leading-normal">
          <th className="py-3 px-6 text-left">Usuário</th>
          <th className="py-3 px-6 text-center">Saldo</th>
          <th className="py-3 px-6 text-center">Opções</th>
        </tr>
      </thead>
      { users.length > 0 ? (
        <tbody className="text-gray-600 text-sm font-light">
        {
          users.map(usuario => (
            <tr key={usuario.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="flex-shrink-0">
                      <img className="w-8 h-8 rounded-full" src="https://www.w3schools.com/howto/img_avatar.png" />
                  </div>
                  <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {usuario.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {usuario.email}
                      </p>
                  </div>
                </div>
              </td>
              <td className="py-3 px-6 text-center whitespace-nowrap">
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      R$ { (usuario.account ? usuario.account?.value : '0,00')}
                  </div>
              </td>
              <td className="py-3 px-6 text-center whitespace-nowrap">
                  <Link to={'/deposito/'+usuario.id} className="m-2 p-2 bg-red-400 hover:bg-red-700 text-white rounded-md">Depositar</Link>
                  {
                  usuario.id != user.id &&
                  (<Link to={'/transferir/'+usuario.id} className="m-2 p-2 bg-green-400 hover:bg-green-700 text-white rounded-md">Transferir</Link>)
                  }
                  {
                  usuario.id == user.id &&
                  (<Link to={'/historico/'+usuario.id} className="m-2 p-2 bg-gray-500 hover:bg-gray-700 text-white rounded-md">Histórico</Link>)
                  }
              </td> 
            </tr>
          ))
        }
        </tbody>
      ) : (
        <tbody className="text-gray-600 text-sm font-light">
          <tr>
            <td><p className="text-blue-600">Carregando...</p></td>
          </tr> 
        </tbody>
      )}
   </table>

   <div className='w-full space-x-3 text-center'>
        {/* Controles de Paginação */}
        <button
          className="m-2 p-2 bg-blue-500 hover:bg-blue-700 text-white text-sm rounded-md"
          onClick={() => setCurrentPage(prevPage => prevPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>({currentPage})</span>
        <button
          className="m-2 p-2 bg-blue-500 hover:bg-blue-700 text-white  text-sm rounded-md"
          onClick={() => setCurrentPage(prevPage => prevPage + 1)}
          disabled={currentPage === last_page}
          // Adicione aqui uma condição para desabilitar o botão quando atingir a última página
        >
          Próxima
        </button>
      </div>
   </>
  )
}

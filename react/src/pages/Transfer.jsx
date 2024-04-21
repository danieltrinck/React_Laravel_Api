import React, { useEffect } from 'react';
import { useState } from 'react';
import IntlCurrencyInput from "react-intl-currency-input"
import { Link, useParams, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from '../Api/axios';
import useAuthContext from '../context/AuthContext';


export const Transfer = ({uservalor}) => {

  const params = useParams();
  const currencyConfig = {
    locale: "pt-BR",
    formats: {
      number: {
        BRL: {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      },
    },
  };

  const [usersTransfer, setUsersTransfer] = useState('');
  const [valor, setValor] = useState(0);
  const { user, transfer, RegisterErr, message } = useAuthContext();
  const [block, setBlock] = useState(false);
  const navigate =  useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    transfer({
      'valor':valor,
      'id':params.id,
    });
  }

  const handleChange = (event, value, maskedValue) => {
    event.preventDefault();
    let userval = uservalor ? uservalor : '0';
    if(value > parseFloat(userval.replace('.','').replace(',','.'))){
      setBlock('O valor a ser transferido é maior que disponivel em sua conta.')
    }else{
      setBlock('')
    }
    //console.log(value); // value sem mask (ex: 1234.56)
    //console.log(maskedValue); // com mask value (ex: R$1234,56)
    setValor(value);
  };

  const voltar = () => {
    navigate("/");
  }

  useEffect(() => {

    const fetchUsers = async () => {
      try {

          const getusers = await axios.get(`/api/users/${params.id}`,
          {
              headers: {
                  'Authorization': `Bearer ${Cookies.get('token')}`
              }
          });
          setUsersTransfer(getusers.data.name);

      } catch (error) {

          console.log(error);

      }
    };

    fetchUsers();
    
  }, []);

  return (
  <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Transferir valores da sua conta
        </h2>
      </div>
      { message == null ?
      (<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <label className='mb-2 mr-3'>Atualmente você possui R$ { (uservalor ? uservalor : '0,00')}</label>
        <div className="shadow-sm flex">
          <label className='mb-2 mr-3' style={{width:'1000%'}}>Transferir para { usersTransfer }</label>
        </div>
        <div className="shadow-sm flex">
          <label htmlFor="valor" className='mb-2 mr-3' style={{width:'20%'}}>O valor de:</label>
          <IntlCurrencyInput currency="BRL" value={valor} config={currencyConfig} onChange={handleChange} className="text-2md" style={{width:'80%'}}/>
        </div>
        {
          RegisterErr && <div className='max-w-full text-sm text-red-500 text-center mt-2'>{ RegisterErr.valor }</div>
        }
      
        { block && <p className='text-red text-sm'>{block}</p>}
        <div className='max-w-full text-center'>
          <button
            type="submit"
            className="py-2 px-5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled = {block != ''}
          >
            Transferir
          </button>
          <button
            type="button"
            onClick={voltar}
            className="py-2 px-5 ml-3 border border-transparent text-sm font-medium rounded-md text-white bg-gray-400 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Voltar
          </button>
          </div>
      </form>)
      : 
      (
        <div className='max-w-full text-center'>
          <div className='max-w-full text-green-500 text-center font-extrabold mt-2 mb-3'>{message}</div>
          <Link to="/" className="m-2 mt-8 p-2 bg-blue-500 hover:bg-indigo-700 text-white rounded-md">Voltar</Link>
        </div>
      )
    }
    </div>
  </div>
  )
 
}

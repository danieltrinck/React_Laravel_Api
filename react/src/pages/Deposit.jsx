import React from 'react';
import { useState } from 'react';
import useAuthContext from '../context/AuthContext';
import IntlCurrencyInput from "react-intl-currency-input"
import { Link, useParams, useNavigate } from "react-router-dom";

export const Deposit = () => {

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

  const [valor, setValor] = useState(0);
  const { deposit, RegisterErr, message } = useAuthContext();
  const navigate =  useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    deposit({'valor':valor,'id':params.id});
  }

  const handleChange = (event, value, maskedValue) => {
    event.preventDefault();
    //console.log(value); // value sem mask (ex: 1234.56)
    //console.log(maskedValue); // com mask value (ex: R$1234,56)
    setValor(value);
  };

  const voltar = () => {
    navigate("/");
  }

  return (
  <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Faça um depósito na conta
        </h2>
      </div>
      { message == null ?
      (<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="shadow-sm -space-x-px">
          <label htmlFor="valor" className='mb-2 mr-3'>Valor a depositar</label>
          <IntlCurrencyInput currency="BRL" value={valor} config={currencyConfig} onChange={handleChange} className="text-2xl"/>
            {
              RegisterErr && <div className='max-w-full text-sm text-red-500 text-center mt-2'>{ RegisterErr.valor }</div>
            }
        </div>
        <div className='max-w-full text-center'>
          <button
            type="submit"
            className="py-2 px-5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Depositar
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

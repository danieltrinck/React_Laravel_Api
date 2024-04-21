import React, { useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { useState } from 'react';
import Cookies from 'js-cookie';
import { format } from 'date-fns';
import axios from '../Api/axios';
import useAuthContext from '../context/AuthContext';

export const Historic = () => {
  
  const params = useParams();

  const [historic, setHistoric] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [last_page, setlast_page] = useState(1);
  const { user, messageClear } = useAuthContext();

  useEffect(() => {

    messageClear();
    const fetchHistoric = async () => {
      try {

          const historic = await axios.get(`/api/historic/${params.id}?page=${currentPage}`,
          {
              headers: {
                  'Authorization': `Bearer ${Cookies.get('token')}`
              }
          });
          setHistoric(historic.data.data);
          setlast_page(historic.data.last_page);

      } catch (error) {

          console.log(error);

      }
    };

    fetchHistoric();
    
  }, [currentPage]); 

  return (
    <>
    <div className="bg-blue-500 text-white p-2">Listando histórico de transações</div>
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-600 text-white uppercase text-sm leading-normal">
          <th className="py-3 px-6 text-left">Usuário</th>
          <th className="py-3 px-6 text-center">Comprovante</th>
          <th className="py-3 px-6 text-center">Data</th>
        </tr>
      </thead>
      { historic.length > 0 ? (
        <tbody className="text-gray-600 text-sm font-light">
        {
          historic.map(usuario => (
            <tr key={usuario.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="flex-shrink-0">
                      <img className="w-8 h-8 rounded-full" src="https://www.w3schools.com/howto/img_avatar.png" />
                  </div>
                  <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-black">
                        {usuario.user.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {usuario.type == 'D' ? 'Depósito' : 'Transfêrencia'} de {usuario.value} para {usuario.to.name}
                      </p>
                  </div>
                </div>
              </td>
              <td className="py-3 px-6 text-center whitespace-nowrap">
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-black">
                      { (usuario.type == 'D' ? usuario.deposit : usuario.transfer)}
                  </div>
              </td>
              <td className="py-3 px-6 text-center whitespace-nowrap">
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-black">
                      { format(new Date(usuario.created_at), 'dd/MM/yyyy HH:mm:ss')}
                  </div>
              </td>
            </tr>
          ))
        }
        </tbody>
      ) : (
        <tbody className="text-gray-600 text-sm font-light">
          <tr>
            <td className="w-full text-center p-4" colSpan={3}>
            {
              historic.length > 0 ? (<span className="w-full text-center text-blue-700">Carregando...</span>) : (<span className="w-full text-center text-blue-700">Nenhuma transação realizada</span>)
            }
            </td>
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

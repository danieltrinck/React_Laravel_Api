import { useState, useEffect } from 'react';
import { Navigate, Link, Outlet } from "react-router-dom";
import useAuthContext from "../context/AuthContext";


const AuthLayout = ({valor}) => {

const { user, logout } = useAuthContext();

  return user ? 
  (
    <>

      <div className="bg-blue-500 py-2">
        <div className="container mx-auto flex justify-between items-center p-3">
        
          <h1 className="text-white text-xl font-bold">{ user?.name } <br/>Saldo R$ { valor ? valor : '0,00' }</h1>
        
          <div className="flex space-x-2">
            <ul className="flex">
            <li className="m-2 p-2 bg-white-500 hover:bg-indigo-700 text-white rounded-md">
                <Link to="/">Usuários</Link>
              </li>
              <li className="m-2 p-2 bg-white-500 hover:bg-indigo-700 text-white rounded-md">
                <Link to="/register">Cadastro</Link>
              </li>
              <li className="m-2 p-2 bg-white-500 hover:bg-indigo-700 text-white rounded-md">
                <Link to="/" onClick={logout}>Sair</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Outlet/>
    </>
  ) : <Navigate to="/login" />
}

export default AuthLayout
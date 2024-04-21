import React from 'react';
import { useState } from 'react';
import useAuthContext from '../context/AuthContext';

export const Register = () => {

    const [name, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirm] = useState("");
    const { register, RegisterErr } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        register({name, email, password, password_confirmation});
    }

  return (
  <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Faça seu cadastro para ter acesso ao sistema
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
          <label htmlFor="name">Nome Completo</label>
          <input 
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              value={name}
              onChange={(e) => {setNome(e.target.value)}}
            />
            {
              RegisterErr.name && <div>{ RegisterErr.name}</div>
            }
        </div>
        <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address">E-mail</label>
                <input 
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                />
            </div>
            {
              RegisterErr.email && <div>{ RegisterErr.email}</div>
            }
        </div>
        <div className="rounded-md shadow-sm -space-y-px">
            <label htmlFor="password">Senha</label>
            <input 
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
            />
        </div>
        <div className="rounded-md shadow-sm -space-y-px">
            <label htmlFor="password_confirm" >Digite sua Senha novamente</label>
            <input 
                id="password_confirm"
                name="password_confirmation"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={password_confirmation}
                onChange={(e) => {setPasswordConfirm(e.target.value)}}
            />
            {
              RegisterErr.password && <div>{ RegisterErr.password}</div>
            }
        </div>
        
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cadastrar
          </button>
      </form>
    </div>
  </div>
  )
}

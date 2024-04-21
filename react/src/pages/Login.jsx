import React from 'react';
import { useState } from 'react';
import useAuthContext from '../context/AuthContext';

export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, err } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        login({email, password});
    }

  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Faça login na sua conta
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="rounded-md shadow-sm -space-y-px">
              <label htmlFor="email-address">
                E-mail de acesso
              </label>
                <input 
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                    />
                 
        </div>
        <div className="rounded-md shadow-sm -space-y-px">
        <label htmlFor="password">
                Senha
              </label>
                <input 
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}
                    />
          </div>
          {
            err &&
                <div className='w-full text-red-500 text-center text-sm'>{ err }</div>
          }
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Entrar
            </button>
        </form>
      </div>
    </div>
  )
}

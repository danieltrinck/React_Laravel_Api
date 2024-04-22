import React from 'react';
import { useState } from 'react';
import useAuthContext from '../context/AuthContext';
import InputMask from '../components/inputMask';
import getDadosCep from '../components/viaCep';

export const Register = () => {

    const [name, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [cep, setCep] = useState("");
    const [birthday, setBirthday] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirm] = useState("");
    const { register, RegisterErr } = useAuthContext();
    const [endereco, setEndereco] = useState({
      bairro:'',
      cep:'',
      complemento:'',
      localidade:'',
      logradouro:'',
      numero:'',
      uf:''
    });
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        register({name, email, cpf, birthday, cep, endereco, password, password_confirmation});
    }


    const handleChangeCep = (event) => {

        let cardValue = event.target.value
          .replace(/\D/g, '')
          .match(/(\d{0,5})(\d{0,3})/);

        cardValue = !cardValue[2]
          ? cardValue[1]
          : `${cardValue[1]}-${cardValue[2]}`;

        setCep(cardValue);
        if(cardValue.length == 9){
          buscarEndereco(cardValue);
        }
       
    };


    const handleChangeCPF = (event) => {
    
      let cardValue = event.target.value
        .replace(/\D/g, '')
        .match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/);

        cardValue = !cardValue[2]
        ? cardValue[1]
        : `${cardValue[1]}.${cardValue[2]}${`${
            cardValue[3] ? `.${cardValue[3]}` : ''
          }`}${`${cardValue[4] ? `-${cardValue[4]}` : ''}`}`;

        setCpf(cardValue);
      

    };

    const buscarEndereco = async (cep) => {
      const enderecoData = await getDadosCep(cep);
      setEndereco(enderecoData);
    };


  return (
  <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="w-md space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Faça seu cadastro para ter acesso ao sistema
        </h2>
      </div>
      <form className="mt-8" onSubmit={handleSubmit}>
        <div className='grid gap-4 grid-cols-2 gap-y-3'>
          <div >
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
          <div >
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
                RegisterErr.email && <div className='text-sm text-red-400'>{ RegisterErr.email}</div>
              }
          </div>
          <div >
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
          <div >
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
                RegisterErr.password && <div className='text-sm text-red-400'>{ RegisterErr.password}</div>
              }
          </div>
        </div>

        <div className='mt-3 grid gap-4 grid-cols-2 gap-y-3'>
          <div >
            <label htmlFor="name">CPF</label>
            <InputMask 
                name="cpf"
                type="text"
                required
                maxLength="14"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Digite o seu CPF"
                value={cpf}
                onChange={handleChangeCPF}
              />
              {
                RegisterErr.cpf && <div className='text-sm text-red-400'>{ RegisterErr.cpf}</div>
              }
          </div>
          <div >
            <label htmlFor="birthday">Nascimento</label>
            <input 
                id="birthday"
                name="birthday"
                type="date"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={birthday}
                onChange={(e) => {setBirthday(e.target.value)}}
              />
              {
                RegisterErr.birthday && <div className='text-sm text-red-400'>{ RegisterErr.birthday}</div>
              }
          </div>
        </div>

        <div className='mt-3 grid gap-4 grid-cols-2 gap-y-3'>
          <div >
            <label htmlFor="cep">Cep</label>
            <InputMask
              value={cep}
              onChange={handleChangeCep}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Digite seu cep"
            />
            {
              RegisterErr.cep && <div className='text-sm text-red-400'>{ RegisterErr.cep}</div>
            }
          </div>
        </div>
        { endereco.localidade &&
        (
        <div className='mt-3 grid gap-4 grid-cols-2 gap-y-3'>
          <div>
            <label htmlFor="logradouro">Endereço</label>
            <input 
                id="logradouro"
                name="logradouro"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={endereco?.logradouro}
                onChange={(e) => {setEndereco({...endereco, ['logradouro']:e.target.value})}}
              />
              {
                RegisterErr.logradouro && <div className='text-sm text-red-400'>{ RegisterErr.logradouro}</div>
              }
          </div>
          <div>
              <label htmlFor="logradouro">Número</label>
              <input 
                  id="numero"
                  name="numero"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={endereco?.numero}
                  onChange={(e) => {setEndereco({...endereco, ['numero']:e.target.value})}}
                />
                {
                  RegisterErr.numero && <div className='text-sm text-red-400'>{ RegisterErr.numero}</div>
                }
            </div>
            <div>
              <label htmlFor="bairro">Bairro</label>
              <input 
                  id="bairro"
                  name="bairro"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={endereco?.bairro}
                  onChange={(e) => {setEndereco({...endereco, ['bairro']:e.target.value})}}
                />
                {
                  RegisterErr.bairro && <div className='text-sm text-red-400'>{ RegisterErr.bairro}</div>
                }
            </div>
            <div>
              <label htmlFor="complemento">Complemento</label>
              <input 
                  id="complemento"
                  name="complemento"
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={endereco?.complemento}
                  onChange={(e) => {setEndereco({...endereco, ['complemento']:e.target.value})}}
                />
            </div>
            <div>
              <label htmlFor="cidade">Cidade</label>
              <input 
                  id="cidade"
                  name="cidade"
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={endereco?.localidade}
                  onChange={(e) => {setEndereco({...endereco, ['cidade']:e.target.value})}}
                />
                {
                  RegisterErr.localidade && <div className='text-sm text-red-400'>{ RegisterErr.localidade}</div>
                }
            </div>
            <div>
              <label htmlFor="estado">Estado</label>
              <input 
                  id="estado"
                  name="estado"
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={endereco?.uf}
                  onChange={(e) => {setEndereco({...endereco, ['estado']:e.target.value})}}
                />
                {
                  RegisterErr.uf && <div className='text-sm text-red-400'>{ RegisterErr.uf}</div>
                }
            </div>
        </div>
        )}
            
        <div className='w-full text-center'>
          <button
            type="submit"
            className="justify-center mt-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cadastrar
          </button>
          </div>
      </form>
    </div>
  </div>
  )
}

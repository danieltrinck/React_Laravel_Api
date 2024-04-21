import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from "react";
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Deposit } from './pages/Deposit';
import { Transfer } from './pages/Transfer';
import { Historic } from './pages/Historic';

import AuthLayout from './layouts/AuthLayout';
import GuestLayout from './layouts/GuestLayout';

function App() {

  const [nvalor, setInformacao] = useState('0,00');

  const valor = (nvalor) => {
    setInformacao(nvalor);
  };
  return (
    <div className="bg-slate-200">
      <div className=''></div>
      <div className="max-w-6xl mx-auto min-h-screen">

        <Routes>
          <Route element={<AuthLayout valor={nvalor} />}>
            <Route path="/" element={<Home valor={valor} />} />
            <Route path="/deposito/:id" element={<Deposit />} />
            <Route path="/transferir/:id" element={<Transfer uservalor={nvalor} />} />
            <Route path="/historico/:id" element={<Historic />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<GuestLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register/novo" element={<Register />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;

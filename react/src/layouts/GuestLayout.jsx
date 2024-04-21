import { Navigate, Link, Outlet } from "react-router-dom";
import useAuthContext from "../context/AuthContext";

const GuestLayout = () => {
    const { user } =  useAuthContext();
  return !user ? 
    (
    <>
    <div className="bg-blue-500 py-2">
      <div className="container mx-auto flex justify-between items-center p-3">
      
        <h1 className="text-white text-xl font-bold"></h1>
      
        <div className="flex space-x-2">
        <ul className="flex">

          <li className="m-2 p-2 bg-white-500 hover:bg-indigo-700 text-white rounded-md">
          <Link to="/register/novo">Cadastro</Link>
          </li>

          <li className="m-2 p-2 bg-white-500 hover:bg-indigo-700 text-white rounded-md">
          <Link to="/login">Login</Link>
          </li>

        </ul>
        </div>
      </div>
    </div>
    <Outlet/>
    </>
    )
  : <Navigate to="/" />
}

export default GuestLayout
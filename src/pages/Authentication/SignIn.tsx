import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
// import Logo from '../../images/logo/logo.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginImage from './logo.svg';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password,
      });

      if (response.data) {
        localStorage.setItem('token', response.data);
        navigate('/ecommerce');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErrorMessage('Falha no login. Verifique suas credenciais.');
    }
  };

  return (
    <>
      <Breadcrumb pageName="Login" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          {/* Lado esquerdo */}
          <div className="hidden w-full xl:flex xl:w-1/2 justify-center items-center">
            <div className="flex flex-col items-center justify-center py-20 px-10 text-center h-full">


              {/* Texto explicativo */}
              <p className="mt-5 text-white-700">Bem-vindo! Faça login para acessar sua conta.</p>

              {/* Imagem do lado esquerdo */}
              <img src={LoginImage} alt="Imagem de Login" className="mt-5 w-3/4" />
            </div>
          </div>

          {/* Lado direito */}
          <div className="w-full xl:w-1/2">
            <div className="py-20 px-10">
              <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-semibold mb-6">Faça seu Login</h2>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-2">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block mb-2">Senha:</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
                >
                  Entrar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;

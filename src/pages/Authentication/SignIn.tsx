import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
// import Logo from '../../images/logo/logo.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginImage from './logo.png';

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

      console.log(response.data);

      // Verifica se o token está em response.data.data.token
      const token = response.data.access_token;
      const role = response.data.role;
      const user = response.data.user;

      if (token && role) {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role)
        localStorage.setItem('user', user);
        navigate('/ecommerce');
        window.location.reload();
      } else {
        setErrorMessage('Falha no login. Verifique suas credenciais.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErrorMessage('Falha no login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark max-w-2xl w-full p-10">
        <div className="flex flex-wrap items-center">
          {/* Lado esquerdo */}
          <div className="hidden xl:flex xl:w-1/2 justify-center items-center">
            <div className="flex flex-col items-center justify-center text-center">
              <img src={LoginImage} alt="Imagem de Login" className="w-60 mr-4 mb-4" />
              <p className="text-gray-700 mb-5">Bem-vindo! Faça login para acessar sua conta.</p>
            </div>
          </div>


          {/* Lado direito */}
          <div className="w-full xl:w-1/2">
            <form onSubmit={handleSubmit}>
              <h2 className="text-2xl font-semibold mb-6 text-center">Faça seu Login</h2>
              {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}
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
  );
};

export default SignIn;
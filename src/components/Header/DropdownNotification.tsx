import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ClickOutside from '../ClickOutside';
import axios from 'axios';

interface Notification {
  id: number;
  usuario_id: string;
  mensagem: string;
  tipo: string;
  criado_em: string; // Campo de data de criação
}

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [reservas, setReservas] = useState<Array<Notification>>([]);
  const [message, setMessage] = useState('');

  const userid = localStorage.getItem('user');

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/notificacao/${userid}`);
        console.log(response.data); // Verifique se é um objeto ou array
  
        // Se a resposta for um objeto com chave 'notificacoes', extraia o array
        if (Array.isArray(response.data.notificacoes)) {
          setReservas(response.data.notificacoes);
        } else {
          // Caso contrário, diretamente com o array (se o servidor devolver os dados de forma diferente)
          setReservas(Object.values(response.data));  // Isso transforma o objeto em array
        }
      } catch (error) {
        console.error('Erro ao carregar as notificações:', error);
        setMessage('Erro ao carregar as notificações');
      }
    };
  
    fetchReservas();
  }, [userid]);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      {/* Botão de Notificação */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none"
        aria-label="Notificações"
        aria-expanded={dropdownOpen}
      >
        {/* Novo Ícone de Sino Moderno */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-7 h-7 text-gray-800 dark:text-white"
        >
          <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>

        {/* Indicador de Novas Notificações */}
        <span className="absolute top-2 right-2 h-3 w-3 rounded-full bg-red-500"></span>
      </button>

      {/* Dropdown de Notificações */}
      {dropdownOpen && (
        <div
          className="absolute -right-10 mt-2 w-80 max-h-96 overflow-y-auto rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark"
        >
          {/* Cabeçalho */}
          <div className="px-4 py-3 border-b border-stroke dark:border-strokedark">
            <h5 className="text-sm font-medium text-gray-800 dark:text-white">Notificações</h5>
          </div>

          {/* Lista de Notificações */}
          <ul className="flex flex-col">
            {reservas.length > 0 ? (
              reservas.map((notificacao) => (
                <li key={notificacao.id}>
                  <Link
                    to="#"
                    className="flex flex-col gap-2 p-4 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <p className="text-sm text-gray-800 dark:text-white font-semibold">
                      {notificacao.mensagem}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      Tipo: {notificacao.tipo}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {new Date(notificacao.criado_em).toLocaleString()} {/* Formata a data de criação */}
                    </p>
                  </Link>
                </li>
              ))
            ) : (
              <li>
                <p className="text-sm text-gray-500 dark:text-gray-400 p-4">Nenhuma notificação</p>
              </li>
            )}
          </ul>

          {/* Rodapé */}
          <div className="p-4 border-t border-stroke dark:border-strokedark">
            <Link
              to="/notifications"
              className="block text-sm font-medium text-blue-500 hover:underline dark:text-blue-400"
            >
              Ver todas as notificações
            </Link>
          </div>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownNotification;

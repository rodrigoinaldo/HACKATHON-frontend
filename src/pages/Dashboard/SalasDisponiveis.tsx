import React, { useEffect, useState } from 'react';
import RedirectButton from '../../components/button/RedirectButton';
import { IoIosAddCircle } from 'react-icons/io';
import { FaTrash } from 'react-icons/fa';

interface Ambiente {
  id: number;
  nome: string;
  tipo: string;
  status: string;
  descricao: string;
}

const SalasDisponiveis: React.FC = () => {
  const [ambientes, setAmbientes] = useState<Ambiente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const userRole = localStorage.getItem('role');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/ambiente/index');
        const data = await response.json();

        console.log(data);

        if (Array.isArray(data)) {
          setAmbientes(data);
        } else {
          throw new Error('Estrutura inesperada da resposta da API.');
        }
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        setError('Erro ao carregar os usuários. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = (id: number) => {
    console.log(`Excluindo ambiente com ID: ${id}`);
    fetch(`http://127.0.0.1:8000/api/ambiente/${id}/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between items-center">
        <h4 className="text-xl font-semibold text-black dark:text-white">Ambientes</h4>
        {userRole === 'admin' && (
          <RedirectButton
            path="/insurt/ambiente"
            icon={<IoIosAddCircle />}
            name="Criar novo ambiente"
          />
        )}
      </div>

      {loading && (
        <p className="text-center text-gray-500 py-4">Carregando salas...</p>
      )}
      {error && (
        <p className="text-center text-red-500 py-4">{error}</p>
      )}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Ambiente</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Descrição</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Andamento</p>
            </div>
            {userRole === 'admin' && (
              <div className="col-span-1 flex items-center justify-end">
                <p className="font-medium">Ações</p>
              </div>
            )}
          </div>

          {ambientes.map((ambiente) => (
            <div
              className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 items-center"
              key={ambiente.id}
            >
              <div className="col-span-2">
                <p className="text-sm text-black dark:text-white">{ambiente.nome}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-black dark:text-white">{ambiente.descricao}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-black dark:text-white">{ambiente.status}</p>
              </div>

              {userRole === 'admin' && (
                <div className="ml-auto flex justify-end space-x-5">
                  <RedirectButton
                    path={`/update/AboutUs/${ambiente.id}`}
                    icon={<IoIosAddCircle />}
                    name="Editar"
                  />
                  <button
                    className="text-red-500 hover:text-red-700 transition"
                    onClick={() => handleDelete(ambiente.id)}
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default SalasDisponiveis;

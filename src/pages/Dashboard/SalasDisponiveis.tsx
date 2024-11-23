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
  
        // Acessa o array de reservas corretamente
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
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Ambientes
        </h4>
      </div>

      {/* Mensagens de Carregamento ou Erro */}
      {loading && (
        <p className="text-center text-gray-500 py-4">Carregando salas...</p>
      )}
      {error && (
        <p className="text-center text-red-500 py-4">{error}</p>
      )}

      {/* Cabeçalho da Tabela */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Ambiente</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium">descrição</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium">andamento</p>
            </div>

          </div>

          {/* Lista de Usuários */}
          {ambientes.map((ambientes) => (
            <div
              className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
              key={ambientes.id}
            >
              <div className="col-span-2 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {ambientes.nome}
                </p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {ambientes.descricao}
                </p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {ambientes.status}
                </p>
              </div>

              {userRole === 'admin' && (
              <div className="ml-auto h-12.5 w-15 rounded-md">
                <button onClick={() => handleDelete(ambientes.id)}>
                  <FaTrash size={20} />
                </button>
              </div>
    
              
                )}
            {userRole === 'admin' && (
                <div className="ml-auto h-12.5 w-15 rounded-md">
                    <RedirectButton 
                    path={`/update/AboutUs/${ambientes.id}`}  
                    icon={<IoIosAddCircle/> }
                    name='Editar'
                />
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

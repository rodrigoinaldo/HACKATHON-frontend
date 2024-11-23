import React, { useEffect, useState } from 'react';
import RedirectButton from '../../components/button/RedirectButton';
import { IoIosAddCircle } from 'react-icons/io';
import { FaTrash } from 'react-icons/fa';

interface Ambiente {
  id: number;
  data_reserva: string;
  data: string;
  hora_inicio: string;
  hora_fim: string;
  usuario: string;
  ambiente: string;
  usuario_id: string;
}

const ECommerce: React.FC = () => {
  const [ambientes, setAmbientes] = useState<Ambiente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const userId = localStorage.getItem('user');

  useEffect(() => {
    const fetchAmbientes = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/reserva/index');
        const data = await response.json();
  
        console.log(data);

        // Verifique a estrutura da resposta da API
        if (Array.isArray(data)) {
          setAmbientes(data); // Se for um array diretamente
        } else if (data.reservas && Array.isArray(data.reservas)) {
          setAmbientes(data.reservas); // Se estiver dentro do campo 'reservas'
        } else {
          throw new Error('Estrutura inesperada da resposta da API.');
        }
      } catch (error) {
        console.error('Erro ao buscar ambientes:', error);
        setError('Erro ao carregar ambientes. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchAmbientes();
  }, []);

  const handleDelete = (id: number) => {
    console.log(`Excluindo ambiente com ID: ${id}`);
     fetch(`http://127.0.0.1:8000/api/reserva/${id}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white mt-8">
          Lista de salas agendadas
        </h4>
        <div className="col-span-2 flex justify-end mb-12">
          <RedirectButton 
            path="/insurt/reserva"
            icon={<IoIosAddCircle />}
            name="Agendar nova sala"
          />
        </div>
      </div>

      {/* Mensagens de Carregamento ou Erro */}
      {loading && <p className="text-center text-gray-500 py-4">Carregando salas...</p>}
      {error && <p className="text-center text-red-500 py-4">{error}</p>}

      {/* Cabeçalho da Tabela */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Usuário</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Data da reserva</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Horário início / final</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Ambiente</p>
            </div>
          </div>

          {/* Lista de Ambientes */}
          {ambientes.map((ambiente) => (
            <div
              className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
              key={ambiente.id}
            >
              <div className="col-span-2 flex items-center">
                <p className="text-sm text-black dark:text-white">{ambiente.usuario}</p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="text-sm text-black dark:text-white">{ambiente.data_reserva}</p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {ambiente.hora_inicio} / {ambiente.hora_fim}
                </p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="text-sm text-black dark:text-white">{ambiente.ambiente}</p>
              </div>

              {userId == ambiente.usuario_id && (
                <button onClick={() => handleDelete(ambiente.id)}>
                  <FaTrash size={20} />
                </button>
              )}

              
              {userId == ambiente.usuario_id && (
                  <div className="ml-auto h-12.5 w-15 rounded-md mt-4">
                  <RedirectButton 
                    path={`/update/reserva/${ambiente.id}`} 
                    icon={<IoIosAddCircle />}
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

export default ECommerce;

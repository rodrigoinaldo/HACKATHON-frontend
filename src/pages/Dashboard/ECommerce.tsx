import React, { useEffect, useState } from 'react';
import RedirectButton from '../../components/button/RedirectButton';
import { IoIosAddCircle } from 'react-icons/io';

interface Ambiente {
  id: number;
  data_reserva: string;
  data: string;
  hora_inicio: string;
  hora_fim: string;
  usuario: string;
  ambiente: string;
}

const ECommerce: React.FC = () => {
  const [ambientes, setAmbientes] = useState<Ambiente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/reserva/index');
        const data = await response.json();
  
        console.log(data);
  
        // Acessa o array de reservas corretamente
        if (Array.isArray(data.reservas)) {
          setAmbientes(data.reservas);
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

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Lista de salas agendaddaa
        </h4>
        <div className="col-span-2 flex justify-end">
            <RedirectButton 
              path="/insurt/reserva"
              icon={<IoIosAddCircle/> }
            />
        </div>
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
              <p className="font-medium">Usuario</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium">data da reserva</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium">horario inicio / horario final</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Ambiente</p>
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
                  {ambientes.usuario}
                </p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {ambientes.data_reserva}
                </p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {ambientes.hora_inicio} / {ambientes.hora_fim}
                </p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {ambientes.ambiente}
                </p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ECommerce;

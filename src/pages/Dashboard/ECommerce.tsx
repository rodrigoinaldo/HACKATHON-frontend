import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { IoIosAddCircle } from 'react-icons/io';

interface Ambiente {
  id: number;
  usuario: string;
  usuario_id: number;
  data_reserva: string;
  hora_inicio: string;
  hora_fim: string;
  ambiente: string;
}

const ECommerce: React.FC = () => {
  const [ambientes, setAmbientes] = useState<Ambiente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filtro, setFiltro] = useState('');
  const [usuarioFiltro, setUsuarioFiltro] = useState('');
  const [ambienteFiltro, setAmbienteFiltro] = useState('');

  const userId = localStorage.getItem('user');
  console.log('User ID:', userId);

  useEffect(() => {
    const fetchAmbientes = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/reserva/index');
        const data = await response.json();

        console.log('Dados da API:', data);

        if (Array.isArray(data)) {
          setAmbientes(data);
        } else if (data.reservas && Array.isArray(data.reservas)) {
          setAmbientes(data.reservas);
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
    fetch(`http://127.0.0.1:8000/api/reserva/${id}/delete/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      setAmbientes(ambientes.filter((ambiente) => ambiente.id !== id));
    });
  };

  const ambientesFiltrados = ambientes.filter((ambiente) => {
    return (
      (ambiente.ambiente.toLowerCase().includes(ambienteFiltro.toLowerCase()) || !ambienteFiltro) &&
      (ambiente.usuario.toLowerCase().includes(usuarioFiltro.toLowerCase()) || !usuarioFiltro) &&
      (ambiente.data_reserva.includes(filtro) || !filtro)
    );
  });

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex items-center justify-between">
        <h4 className="text-xl font-semibold text-black dark:text-white">Lista de salas agendadas</h4>
        <button
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
          onClick={() => window.location.href = '/insurt/reserva'}
        >
          <IoIosAddCircle size={20} />
          <span>Agendar nova sala</span>
        </button>
      </div>

      <div className="py-1 px-6 mb-5">
        <div className="flex flex-wrap space-x-4 gap-4">
          <div className="w-full sm:w-auto">
            <h2>Filtrar ambiente:</h2>
            <input
              type="text"
              placeholder="Filtrar ambiente..."
              value={ambienteFiltro}
              onChange={(e) => setAmbienteFiltro(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="w-full sm:w-auto">
            <h2>Filtrar usuário:</h2>
            <input
              type="text"
              placeholder="Filtrar usuário..."
              value={usuarioFiltro}
              onChange={(e) => setUsuarioFiltro(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="w-full sm:w-auto">
            <h2>Filtrar data:</h2>
            <input
              type="text"
              placeholder="Filtrar data..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
        </div>
      </div>

      {loading && <p className="text-center text-gray-500 py-4">Carregando salas...</p>}
      {error && <p className="text-center text-red-500 py-4">{error}</p>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-1 flex items-center"><p className="font-medium">Usuário</p></div>
            <div className="col-span-2 flex items-center"><p className="font-medium">Data da reserva</p></div>
            <div className="col-span-2 flex items-center"><p className="font-medium">Horário início / final</p></div>
            <div className="col-span-1 flex items-center"><p className="font-medium">Ambiente</p></div>
            {ambientesFiltrados.some((ambiente) => String(ambiente.usuario_id) === userId) && (
              <div className="col-span-1 flex items-center"><p className="font-medium">Ações</p></div>
            )}
          </div>

          {ambientesFiltrados.map((ambiente) => {
            return (
              <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5" key={ambiente.id}>
                <div className="col-span-1 flex items-center"><p className="text-sm text-black dark:text-white">{ambiente.usuario}</p></div>
                <div className="col-span-2 flex items-center"><p className="text-sm text-black dark:text-white">{ambiente.data_reserva}</p></div>
                <div className="col-span-2 flex items-center"><p className="text-sm text-black dark:text-white">{ambiente.hora_inicio} / {ambiente.hora_fim}</p></div>
                <div className="col-span-1 flex items-center"><p className="text-sm text-black dark:text-white">{ambiente.ambiente}</p></div>

                {String(userId) === String(ambiente.usuario_id) && (
                  <>
                    <div className="flex items-center justify-center space-x-4">
                      <button
                        onClick={() => window.location.href = `/update/reserva/${ambiente.id}`}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 flex items-center space-x-2 w-full sm:w-auto"
                      >
                        <IoIosAddCircle size={20} />
                        <span>Editar</span>
                      </button>
                      <button
                        onClick={() => handleDelete(ambiente.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300 flex items-center space-x-2 w-full sm:w-auto"
                      >
                        <FaTrash size={20} />
                        <span>Excluir</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default ECommerce;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Reserva {
  id: number;
  usuario: string;
  ambiente: string;
  data_reserva: string;
  hora_inicio: string;
  hora_fim: string;
  status: string;
}

const UpdateReserva: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user_id, setUser_id] = useState<string>(''); // ID do usuário
  const [ambiente_id, setAmbiente_id] = useState<string>(''); // ID do ambiente
  const [data_reserva, setData_reserva] = useState<string>('');
  const [hora_inicio, setHora_inicio] = useState<string>('');
  const [hora_fim, setHora_fim] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [ambientes, setAmbientes] = useState<any[]>([]);

  const numericId = id ? Number(id) : 0;
  const userid = localStorage.getItem('user');

  useEffect(() => {
    if (id) {
      axios
        .get(`http://127.0.0.1:8000/api/reserva/${numericId}`)
        .then((response) => {
          console.log(response);
          const data: Reserva = response.data;
          setUser_id(data.usuario); // Armazenando o ID do usuário
          setAmbiente_id(data.ambiente); // Armazenando o ID do ambiente
          setData_reserva(data.data_reserva);
          setHora_inicio(data.hora_inicio);
          setHora_fim(data.hora_fim);
          setStatus(data.status);
        })
        .catch((error) => {
          console.error('Erro ao buscar dados:', error);
          setMessage('Erro ao carregar dados.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    const fetchAmbientes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/ambiente/index');  // Ajuste a URL da sua API
        console.log(response.data);
        setAmbientes(response.data);  // Supondo que sua API retorne um array de ambientes
      } catch (error) {
        console.error('Erro ao carregar os ambientes:', error);
        setMessage('Erro ao carregar os ambientes');
      }
    };

    fetchAmbientes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Preparando os dados para envio no update
    const updatedData = { 
      user_id: userid, // Enviando apenas o ID do usuário
      ambiente_id, // Enviando apenas o ID do ambiente
      data_reserva, 
      hora_inicio, 
      hora_fim, 
      status 
    };


    console.log(updatedData);

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/reserva/${id}/update`,
        updatedData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setMessage('Dados atualizados com sucesso!');
      } else {
        setMessage(`Erro ao atualizar os dados: ${response.data.message || 'Desconhecido'}`);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setMessage('Erro na conexão com o servidor.');
    }
  };

  if (isLoading) {
    return <p>Carregando dados...</p>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-5.5">
          <label htmlFor="user_id" className="mb-3 block text-sm font-medium text-black dark:text-white">
            Usuário
          </label>
          <input
            id="user_id"
            type="text"
            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            value={user_id}
            readOnly
          />
        </div>

        <div className="mb-5.5">
          <label htmlFor="ambiente_id" className="mb-3 block text-sm font-medium text-black dark:text-white">
            Ambiente
          </label>
          <select
            id="ambiente_id"
            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            value={ambiente_id}
            onChange={(e) => setAmbiente_id(e.target.value)} // Atualiza o estado com o ID do ambiente
          >
            {ambientes.length === 0 ? (
              <option>Carregando ambientes...</option>
            ) : (
              ambientes.map((ambiente) => (
                <option key={ambiente.id} value={ambiente.id}> {/* Usando o ID do ambiente */}
                  {ambiente.nome} {/* Exibindo o nome, mas enviando o ID */}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="mb-5.5">
          <label htmlFor="data_reserva" className="mb-3 block text-sm font-medium text-black dark:text-white">
            Data da Reserva
          </label>
          <input
            id="data_reserva"
            type="date"
            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            value={data_reserva}
            onChange={(e) => setData_reserva(e.target.value)}
          />
        </div>

        <div className="mb-5.5">
          <label htmlFor="hora_inicio" className="mb-3 block text-sm font-medium text-black dark:text-white">
            Hora de Início
          </label>
          <input
            id="hora_inicio"
            type="time"
            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            value={hora_inicio}
            onChange={(e) => setHora_inicio(e.target.value)}
          />
        </div>

        <div className="mb-5.5">
          <label htmlFor="hora_fim" className="mb-3 block text-sm font-medium text-black dark:text-white">
            Hora de Fim
          </label>
          <input
            id="hora_fim"
            type="time"
            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            value={hora_fim}
            onChange={(e) => setHora_fim(e.target.value)}
          />
        </div>

        <div className="mb-5.5">
          <label htmlFor="status" className="mb-3 block text-sm font-medium text-black dark:text-white">
            Status
          </label>
          <select
            id="status"
            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Selecione o status</option>
            <option value="ativo">Ativo</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>

        <button
          className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
          type="submit"
        >
          Salvar
        </button>

        {message && <p className="mt-4 text-sm">{message}</p>}
      </form>
    </div>
  );
};

export default UpdateReserva;

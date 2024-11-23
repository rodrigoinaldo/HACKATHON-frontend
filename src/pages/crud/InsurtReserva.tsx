import axios from 'axios';
import React, { useState, useEffect } from 'react';

const InsurtReserva: React.FC = () => {
  const [data, setData] = useState<string>('');  // Estado para armazenar a data
  const [horarioInicio, setHorarioInicio] = useState<string>('');
  const [horarioFim, setHorarioFim] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [ambientes, setAmbientes] = useState<any[]>([]);  // Para armazenar os ambientes
  const [selectedAmbiente, setSelectedAmbiente] = useState<string>('');  // Para armazenar o ambiente selecionado

  // Carregar os ambientes disponíveis da API
  useEffect(() => {
    const fetchAmbientes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/ambiente/index');  // Ajuste a URL da sua API
        setAmbientes(response.data);  // Supondo que sua API retorne um array de ambientes
      } catch (error) {
        console.error('Erro ao carregar os ambientes:', error);
        setMessage('Erro ao carregar os ambientes');
      }
    };

    fetchAmbientes();
  }, []);  // Carrega os ambientes apenas uma vez quando o componente for montado

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verifica se o ambiente foi selecionado
    if (!selectedAmbiente) {
      setMessage('Selecione um ambiente para continuar.');
      return;
    }

    // Recuperando o usuário do localStorage
    const user = localStorage.getItem('user');

    // Verifica se o ID do usuário existe
    if (!user) {
      setMessage('Usuário não encontrado');
      return;
    }

    const formData = new FormData();
    formData.append('data_reserva', data);  // Adicionando a data
    formData.append('hora_inicio', horarioInicio);
    formData.append('hora_fim', horarioFim);
    formData.append('ambiente_id', selectedAmbiente);  
    formData.append('user_id', user);  
    formData.append('status', 'ativo');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/reserva/store', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        setData('');  // Limpa o campo de data
        setHorarioInicio('');  // Limpa o campo de horário de início
        setHorarioFim('');  // Limpa o campo de horário de fim
        setSelectedAmbiente('');  // Limpa o ambiente selecionado
        setMessage('Reserva criada com sucesso!');
      } else {
        setMessage('Erro ao criar reserva');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setMessage('Erro na conexão com o servidor');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-5.5">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="data">
            Data
          </label>
          <input
            id="data"
            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </div>

        <div className="mb-5.5">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="horarioInicio">
            Horário Início
          </label>
          <input
            id="horarioInicio"
            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="time"
            value={horarioInicio}
            onChange={(e) => setHorarioInicio(e.target.value)}
          />
        </div>

        <div className="mb-5.5">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="horarioFim">
            Horário Fim
          </label>
          <input
            id="horarioFim"
            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="time"
            value={horarioFim}
            onChange={(e) => setHorarioFim(e.target.value)}
          />
        </div>

        <div className="mb-5.5">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="ambiente">
            Ambiente
          </label>
          <select
            id="ambiente"
            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            value={selectedAmbiente}
            onChange={(e) => setSelectedAmbiente(e.target.value)} // Captura o id do ambiente selecionado
          >
            {ambientes.length === 0 ? (
              <option>Carregando ambientes...</option>
            ) : (
              ambientes.map((ambiente) => (
                <option key={ambiente.id} value={ambiente.id}>
                  {ambiente.nome}  {/* Supondo que o objeto ambiente tenha um campo 'nome' */}
                </option>
              ))
            )}
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
    </>
  );
};

export default InsurtReserva;

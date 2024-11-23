import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Ambiente {
  id: number;
  nome: string;
  tipo: string;
  status: string;
  descricao: string;
}

const UpdateAboutUs: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // id é extraído como string
  const [name, setName] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [status, setStatus] = useState<string>(''); // Status
  const [message, setMessage] = useState<string | null>(null);
  const [tipo, setTipo] = useState<string>('');

  // Converte o id para número
  const numericId = id ? Number(id) : 0;

  // Carrega os dados do item específico ao montar o componente
  useEffect(() => {
    if (numericId) {
      fetch(`http://127.0.0.1:8000/api/ambiente/${numericId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro ao buscar dados');
          }
          return response.json();
        })
        .then((data: Ambiente) => {
          setName(data.nome); // Preenche o campo com o nome atual
          setDescricao(data.descricao); // Preenche o campo com a descrição atual
          setStatus(data.status); // Preenche o campo status com o valor atual
          setTipo(data.tipo);
        })
        .catch((error) => {
          console.error('Erro ao buscar dados:', error);
          setMessage('Erro ao carregar dados.');
        });
    }
  }, [numericId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Objeto a ser enviado para o servidor
    const updatedData = { nome: name, descricao, status, tipo };

    console.log(updatedData);

    try {
      const response = await axios.put(
        `http://localhost:8000/api/ambiente/${numericId}/update`, // Usando numericId
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
      setMessage('Erro na conexão com o servidor');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-5.5">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="name">
            Nome
          </label>
          <div className="relative">
            <input
              id="name"
              className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-5.5">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="description">
            Descrição
          </label>
          <input
            id="description"
            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        <div className="mb-5.5">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="tipo">
            Tipo
          </label>
          <input
            id="tipo"
            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          />
        </div>

        <div className="mb-5.5">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Selecione o status</option>
            <option value="reservado">Reservado</option>
            <option value="disponivel">Disponível</option>
            <option value="manutencao">Manutenção</option>
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

export default UpdateAboutUs;

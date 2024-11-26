import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const UpdateUser: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // `id` extraído como string
  const [name, setNome] = useState<string>(''); // Corrigido o nome do estado
  const [email, setEmail] = useState<string>(''); // Corrigido o typo
  const [role, setRole] = useState<string>(''); // `role` usado corretamente
  const [message, setMessage] = useState<string | null>(null);

  // Converte o id para número
  const numericId = id ? Number(id) : 0;

  // Carrega os dados do item específico ao montar o componente
  useEffect(() => {
    if (numericId) {
      fetch(`http://127.0.0.1:8000/api/user/${numericId}`)
        .then((response) => {
            
          if (!response.ok) {
            throw new Error('Erro ao buscar dados');
          }
          return response.json();
        })
        .then((data: User) => {
          setNome(data.name); // Preenche o campo `nome`
          setEmail(data.email); // Preenche o campo `email`
          setRole(data.role); // Preenche o campo `role`
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
    const updatedData = { name, email, role }; // Corrigido para usar `nome`

    console.log('Dados enviados:', updatedData);

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/user/${numericId}/update`, // Corrigido o endpoint
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
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              value={name}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-5.5">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5.5">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="role">
            Função (Role)
          </label>
          <select
            id="role"
            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Selecione o status</option>
            <option value="admin">Admin</option>
            <option value="professor">Professor</option>
            <option value="estudante">Estudante</option>
          </select>
        </div>

        <button
          className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
          type="submit"
        >
          Salvar
        </button>

        {message && <p className="mt-4 text-sm text-black dark:text-white">{message}</p>}
      </form>
    </>
  );
};

export default UpdateUser;

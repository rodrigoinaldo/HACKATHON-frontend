import React, { useState } from 'react';

const InsertUser: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<string>('admin'); // Valor padrão
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Dados a serem enviados
    const formData = {
      name,
      email,
      role,
      password,
    };

    console.log(formData);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Enviando como JSON
        },
        
        body: JSON.stringify(formData), // Serializando para JSON
      });
      
      if (response.ok) {
        setName('');
        setEmail('');
        setRole('admin');
        setPassword('');
        setMessage('Usuário inserido com sucesso!');
      } else {
        const errorData = await response.json();
        setMessage(`Erro ao inserir usuário: ${errorData.message || 'Desconhecido'}`);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setMessage('Erro na conexão com o servidor');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5.5">
        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="name">
          Nome
        </label>
        <input
          id="name"
          className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black focus:border-primary"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-5.5">
        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black focus:border-primary"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-5.5">
        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="role">
          Role
        </label>
        <select
          id="role"
          className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black focus:border-primary"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="admin">Admin</option>
          <option value="professor">Professor</option>
          <option value="aluno">Aluno</option>
        </select>
      </div>

      <div className="mb-5.5">
        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="password">
          Senha
        </label>
        <input
          id="password"
          className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black focus:border-primary"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
        type="submit"
      >
        Salvar
      </button>

      {message && <p className="mt-4 text-sm">{message}</p>}
    </form>
  );
};

export default InsertUser;

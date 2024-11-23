import React, { useState } from 'react';

const InsertAmbient: React.FC = () => {
  const [nome, setNome] = useState<string>('');
  const [tipo, setTipo] = useState<string>('');
  const [status, setStatus] = useState<'reservado' | 'disponivel' | 'manutencao'>('disponivel');
  const [descricao, setDescricao] = useState<string>('');

  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();



    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('tipo', tipo);
    formData.append('status', status);
    formData.append('descricao', descricao);


    try {
      const response = await fetch('http://127.0.0.1:8000/api/ambiente/store', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {

        setNome('');
        setTipo('');
        setStatus('disponivel');
        setDescricao('');
        setMessage('Propriedade inserida com sucesso!');
      } else {
        setMessage('Erro ao inserir propriedade');
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
          <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="nome">
            Nome
          </label>
          <input
            id="nome"
            className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black focus:border-primary"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="mb-5.5">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="tipo">
            Tipo
          </label>
          <input
            id="tipo"
            className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black focus:border-primary"
            type="text"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          />
        </div>

        <div className="mb-5.5">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black focus:border-primary"
            value={status}
            onChange={(e) => setStatus(e.target.value as 'reservado' | 'disponivel' | 'manutencao')}
            required
          >
            <option value="disponivel">Disponível</option>
            <option value="reservado">Reservado</option>
            <option value="manutencao">Manutenção</option>
          </select>
        </div>

        <div className="mb-5.5">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="descricao">
            Descrição
          </label>
          <input
            id="descricao"
            className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black focus:border-primary"
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
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
    </>
  );
};

export default InsertAmbient;

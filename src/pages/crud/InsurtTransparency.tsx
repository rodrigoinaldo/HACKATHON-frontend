import React, { useState } from 'react';

const InsurTransparency: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [nome, setNome] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setMessage('Selecione um arquivo para enviar.');
      return;
    }

    const formData = new FormData();
    formData.append('name', nome);
    formData.append('description', descricao);
    formData.append('file', file);
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/transparency', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setFile(null);
        setSelectedFile(null);
        setNome('');
        setDescricao('');
        setMessage('Owner inserido com sucesso!');
      } else {
        setMessage('Erro ao inserir owner');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setMessage('Erro na conexão com o servidor');
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/gif']; // Tipos permitidos

      if (!allowedTypes.includes(selectedFile.type)) {
        setMessage('Por favor, selecione um arquivo PDF, PNG, JPG ou GIF.');
        return;
      }

      setSelectedFile(selectedFile.name);
      setFile(selectedFile);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-5.5">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="nome">
            Nome
          </label>
          <div className="relative">
            <input
              id="nome"
              className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-5.5">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="descricao">
            Descrição
          </label>
          <input
            id="descricao"
            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        <div className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5">
          <input
            type="file"
            accept=".pdf, .png, .jpg, .jpeg, .gif" // Permitir PDFs e outros tipos de arquivos especificados
            className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
            onChange={handleFileChange}
          />
          <div className="flex flex-col items-center justify-center space-y-3">
            {selectedFile ? (
              <p className="text-black">{selectedFile}</p>
            ) : (
              <>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* SVG Path */}
                  </svg>
                </span>
                <p>
                  <span className="text-primary">Clique para enviar</span> ou arraste e solte
                </p>
                <p className="mt-1.5">Aceita PDF, PNG, JPG ou GIF</p>
              </>
            )}
          </div>
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

export default InsurTransparency;

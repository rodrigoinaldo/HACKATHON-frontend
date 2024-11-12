// import axios from 'axios';
import React, { useState } from 'react';

const InsurtImage: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [nome, setNome] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (images.length === 0) {
      setMessage('Selecione pelo menos uma imagem para enviar.');
      return;
    }

    const formData = new FormData();
    formData.append('name', nome);
    formData.append('description', descricao);

    // Adiciona todas as imagens no formData
    images.forEach((image) => {
      formData.append('images[]', image); // usando 'images[]' para corresponder ao backend
    });

    try {
      const response = await fetch('http://127.0.0.1:8000/api/image', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        setImages([]);
        setSelectedImages([]);
        setNome('');
        setDescricao('');
        setMessage('Imagens inseridas com sucesso!');
      } else {
        setMessage('Erro ao inserir imagens');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setMessage('Erro na conexão com o servidor');
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files).slice(0, 5); // Limita a 5 imagens
    
      setImages(files);
      setSelectedImages(files.map(file => URL.createObjectURL(file)));
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
            accept="image/*"
            multiple
            className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
            onChange={handleImageChange}
          />
          <div className="flex flex-col items-center justify-center space-y-3">
            {selectedImages.length > 0 ? (
              <div className="grid grid-cols-5 gap-2">
                {selectedImages.map((src, index) => (
                  <img key={index} src={src} alt={`Preview ${index + 1}`} className="w-20 h-20 rounded" />
                ))}
              </div>
            ) : (
              <>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* SVG Path */}
                  </svg>
                </span>
                <p>
                  <span className="text-primary">Click to upload</span> or drag and drop
                </p>
                <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                <p>(max, 800 X 800px)</p>
              </>
            )}
          </div>
        </div>

        <button
          className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
          type="submit"
        >
          Save
        </button>

        {message && <p className="mt-4 text-sm">{message}</p>}
      </form>
    </>
  );
};

export default InsurtImage;

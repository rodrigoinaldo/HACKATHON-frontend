import { useEffect, useState } from 'react';
import { IoIosAddCircle, IoMdDownload } from "react-icons/io";
import RedirectButton from '../../button/RedirectButton';
import { FaTrash } from 'react-icons/fa';

interface Transparency {
  id: number;
  name: string;
  file: string;
  description: string
}

const TableTwo = () => {
  const [transparency, setTransparency] = useState<Transparency[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/transparency/index')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Acesse o array de usuários em 'data.messagem' em vez de 'data'
        if (Array.isArray(data)) {
            setTransparency(data); // Ajustado para definir `data` diretamente como o estado
        } else {
          console.error('Estrutura inesperada da resposta da API:', data);
        }
      })
      .catch((error) => console.error('Erro ao buscar usuários:', error));

  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/transparency/${id}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setTransparency((prevBazzar) => prevBazzar.filter((item) => item.id !== id));
        console.log('Produto excluído com sucesso!');
      } else {
        console.error('Erro ao excluir o produto');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Lista de Transparência
        </h4>

        <div className="ml-auto h-12.5 w-15 rounded-md">
              <RedirectButton 
                  path="/insurt/transparency"
                  icon={<IoIosAddCircle/> }
                />
        </div>

      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">File</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Descriçãos</p>
        </div>
      </div>

      {transparency.map((transparency) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={transparency.id}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <a href={transparency.file}><IoMdDownload /></a>
              </div>
              <p className="text-sm text-black dark:text-white">
                {transparency.name}
              </p>
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {transparency.description}
            </p>
          </div>

          <div className="ml-auto h-12.5 w-15 rounded-md">
                <button onClick={() => handleDelete(transparency.id)}>
                  <FaTrash size={20} />
                </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableTwo;

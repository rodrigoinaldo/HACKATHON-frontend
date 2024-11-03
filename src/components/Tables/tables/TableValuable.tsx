
import { useEffect, useState } from 'react';
import RedirectButton from '../../button/RedirectButton';
import { IoIosAddCircle } from 'react-icons/io';
import { FaTrash } from 'react-icons/fa';

interface valuable {
  id: number;
  position: string;
  vacancies: number;
}

const TableTwo = () => {
  const [valuable, setValuable] = useState<valuable[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/valuable')
      .then((response) => response.json())
      .then((data) => {

        // Acesse o array de usuários em 'data.messagem' em vez de 'data'
        if (Array.isArray(data)) {
            setValuable(data);
        } else {
          console.error('Estrutura inesperada da resposta da API:', data);
        }
      })
      .catch((error) => console.error('Erro ao buscar usuários:', error));
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/valuable/${id}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setValuable((prevBazzar) => prevBazzar.filter((item) => item.id !== id));
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
          Lista de Voluntarios
        </h4>

        <div className="ml-auto h-12.5 w-15 rounded-md">
              <RedirectButton 
                  path="/insurt/voluable"
                  icon={<IoIosAddCircle/> }
                />
        </div>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">ID</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">vagas</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">quantidade</p>
        </div>
      </div>

      {valuable.map((valuable) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={valuable.id}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white">
                {valuable.id}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {valuable.position}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {valuable.vacancies}
            </p>
          </div>

          <div className="ml-auto h-12.5 w-15 rounded-md">
                <button onClick={() => handleDelete(valuable.id)}>
                  <FaTrash size={20} />
                </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableTwo;

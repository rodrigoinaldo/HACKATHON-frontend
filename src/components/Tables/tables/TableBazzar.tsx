import { useEffect, useState } from 'react';
import RedirectButton from '../../button/RedirectButton';
import { IoIosAddCircle } from "react-icons/io";
import { FaTrash } from "react-icons/fa";


interface Image {
  id: number;
  name: string;
  image: string;
  description: string
}

const TableTwo = () => {
  const [bazzar, setBazzar] = useState<Image[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/bazzar/index')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Acesse o array de usuários em 'data.messagem' em vez de 'data'
        if (Array.isArray(data)) {
            setBazzar(data); // Ajustado para definir `data` diretamente como o estado
        } else {
          console.error('Estrutura inesperada da resposta da API:', data);
        }
      })
      .catch((error) => console.error('Erro ao buscar usuários:', error));

  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/bazzar/${id}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setBazzar((prevBazzar) => prevBazzar.filter((item) => item.id !== id));
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
          Produtos do Bazar
        </h4>

        <div className="ml-auto h-12.5 w-15 rounded-md">
          <RedirectButton 
            path="/insurt/bazzar"
            icon={<IoIosAddCircle/> }
            />
        </div>
      </div>

      

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">image</p>
        </div>
      </div>

      {bazzar.map((bazzar) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={bazzar.id}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <img src={bazzar.image} alt="image" />
              </div>
            </div>
              <div className="ml-auto h-12.5 w-15 rounded-md">
                <button onClick={() => handleDelete(bazzar.id)}>
                  <FaTrash size={40 } />
                </button>
              </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableTwo;

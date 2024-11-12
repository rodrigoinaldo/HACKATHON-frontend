import { useEffect, useState } from 'react';
import RedirectButton from '../../button/RedirectButton';
import { IoIosAddCircle } from "react-icons/io";

interface About_us {
  id: number;
  name: string;
  description: string
}

const TableAboutUs = () => {
  const [aboutUs, setaboutUs] = useState<About_us[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/about_us/index')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Acesse o array de usuários em 'data.messagem' em vez de 'data'
        if (Array.isArray(data)) {
            setaboutUs(data); // Ajustado para definir `data` diretamente como o estado
        } else {
          console.error('Estrutura inesperada da resposta da API:', data);
        }
      })
      .catch((error) => console.error('Erro ao buscar usuários:', error));

  }, []);

  return (
  
    
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">

        <h4 className="text-xl font-semibold text-black dark:text-white">
          Sobre Nós
        </h4>

      </div>

      

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Nome</p>
        </div>

        <div className="col-span-3 flex items-center">
          <p className="font-medium">descricao</p>
        </div>
      </div>

      {aboutUs.map((aboutUs) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={aboutUs.id}
        >
          <div className="col-span-3 flex items-center">
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {aboutUs.name}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {aboutUs.description}
            </p>
          </div>

          <div className="ml-auto h-12.5 w-15 rounded-md">
          <RedirectButton 
            path={`/update/AboutUs/${aboutUs.id}`}  
            icon={<IoIosAddCircle/> }
            />
            </div>
          </div>
      ))}
    </div>
  );
};

export default TableAboutUs;

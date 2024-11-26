
import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { IoIosAddCircle } from 'react-icons/io';
import RedirectButton from '../../button/RedirectButton';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

const TableTwo = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/user/index')
      .then((response) => response.json())
      .then((data) => {
        // Verifica se `data` é um array
        if (Array.isArray(data)) {
          setUsers(data); // Define os usuários diretamente
        } else {
          console.error('Estrutura inesperada da resposta da API:', data);
        }
      })
      .catch((error) => console.error('Erro ao buscar usuários:', error));
  }, []);
  
  const handleDelete = (id: number) => {
    console.log(`Excluindo ambiente com ID: ${id}`);
    fetch(`http://127.0.0.1:8000/api/user/${id}/delete/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between items-center">
        <h4 className="text-xl font-semibold text-black dark:text-white">Usuario</h4>
      
          <RedirectButton
            path="/registrar"
            icon={<IoIosAddCircle />}
            name="Criar novo ambiente"
          />
       
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Npme</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">email</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">cargo</p>
        </div>
      </div>

      {users.map((user) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={user.id}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white">
                {user.name}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {user.email}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {user.role}
            </p>
          </div>

          <div className="flex items-center justify-center space-x-4">
              <button
              onClick={() => window.location.href = `/update/user/${user.id}`}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 flex items-center space-x-2 w-full sm:w-auto"
                >
                <IoIosAddCircle size={20} />
                  <span>Editar</span>
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                 className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300 flex items-center space-x-2 w-full sm:w-auto"
                >
                <FaTrash size={20} />
                <span>Excluir</span>
              </button>
            </div>

        </div>
      ))}
    </div>
  );
};

export default TableTwo;


import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

const TableTwo = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/users')
      .then((response) => response.json())
      .then((data) => {
        // Acesse o array de usuários em 'data.messagem' em vez de 'data'
        if (data.status && Array.isArray(data.messagem)) {
          setUsers(data.messagem);
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
          Lista de Usuários
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">ID</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Nome</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Email</p>
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
                {user.id}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {user.name}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {user.email}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableTwo;

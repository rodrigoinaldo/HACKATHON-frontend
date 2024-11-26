import { useEffect, useState } from 'react';

// Interface Historico ajustada
interface Historico {
  id: number;
  reserva_id: number;
  alteracoes: string;
  modificado_em: string;
  usuario_id: string;
}

const TablePosition = () => {
  const [historico, setHistorico] = useState<Historico[]>([]);
  const [ambienteFiltro, setAmbienteFiltro] = useState('');
  const [usuarioFiltro, setUsuarioFiltro] = useState('');
  const [dataFiltro, setDataFiltro] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const userId = localStorage.getItem('user');

  // Busca os dados do histórico do usuário
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/historico/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao carregar o histórico');
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setHistorico(data);
        } else {
          console.error('Estrutura inesperada da resposta da API:', data);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError('Erro ao carregar o histórico');
        console.error('Erro:', error);
        setLoading(false);
      });
  }, [userId]);

  // Filtro baseado nos critérios
  const historicoFiltrado = historico.filter((item) => {
    return (
      (!ambienteFiltro || item.alteracoes.toLowerCase().includes(ambienteFiltro.toLowerCase())) &&
      (!usuarioFiltro || item.usuario_id.toString().includes(usuarioFiltro)) &&
      (!dataFiltro || item.modificado_em.includes(dataFiltro))
    );
  });

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <div className="flex justify-between items-center">
          <h4 className="text-xl font-semibold text-black dark:text-white mt-8">Histórico de alterações</h4>

          {/* Campos de filtro */}
          <div className="flex space-x-4">
            <div>
              <h2>Filtrar ambiente:</h2>
              <input
                type="text"
                placeholder="Filtrar ambiente..."
                value={ambienteFiltro}
                onChange={(e) => setAmbienteFiltro(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <h2>Filtrar usuário:</h2>
              <input
                type="text"
                placeholder="Filtrar usuário..."
                value={usuarioFiltro}
                onChange={(e) => setUsuarioFiltro(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <h2>Filtrar data:</h2>
              <input
                type="text"
                placeholder="Filtrar data..."
                value={dataFiltro}
                onChange={(e) => setDataFiltro(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mensagens de Carregamento ou Erro */}
      {loading && <p className="text-center text-gray-500 py-4">Carregando histórico...</p>}
      {error && <p className="text-center text-red-500 py-4">{error}</p>}

      {/* Cabeçalho da Tabela */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Alterações</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Modificado em</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Usuário</p>
            </div>
          </div>

          {/* Lista de Histórico */}
          {historicoFiltrado.map((item) => (
            <div
              className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
              key={item.id}
            >
              <div className="col-span-2 flex items-center">
                <p className="text-sm text-black dark:text-white">{item.alteracoes}</p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="text-sm text-black dark:text-white">{item.modificado_em}</p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="text-sm text-black dark:text-white">{item.usuario_id}</p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default TablePosition;

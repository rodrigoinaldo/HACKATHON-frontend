import React, { useState, ReactNode } from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';
import SignIn from '../pages/Authentication/SignIn'; // Importa o componente de login

interface DefaultLayoutProps {
  children: ReactNode;
  isAuthenticated: boolean; // Propriedade de autenticação
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  children,
  isAuthenticated,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    // Renderiza apenas o componente de login quando o usuário não está autenticado
    return <SignIn />;
  }

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* Page Wrapper Start */}
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar Start */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* Sidebar End */}

        {/* Content Area Start */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* Header Start */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* Header End */}

          {/* Main Content Start */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          {/* Main Content End */}
        </div>
        {/* Content Area End */}
      </div>
      {/* Page Wrapper End */}
    </div>
  );
};

export default DefaultLayout;
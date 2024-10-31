import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Verifica se o usuário está autenticado. Isso pode ser adaptado para verificar o estado global, localStorage, etc.
  const isAuthenticated = Boolean(localStorage.getItem('authToken'));

  if (!isAuthenticated) {
    // Redireciona para a página de login se o usuário não estiver autenticado
    return <Navigate to="/" replace />;
  }

  // Renderiza o conteúdo da rota protegida se o usuário estiver autenticado
  return <>{children}</>;
};

export default ProtectedRoute;

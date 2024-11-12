import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Verifica a presença do token no localStorage para determinar se o usuário está autenticado
  const isAuthenticated = Boolean(localStorage.getItem('authToken'));

  if (!isAuthenticated) {
    // Redireciona para a página de login se o usuário não estiver autenticado
    return <Navigate to="/" replace />;
  }

  // Renderiza o conteúdo da rota protegida se o usuário estiver autenticado
  return <>{children}</>;
};

export default ProtectedRoute;
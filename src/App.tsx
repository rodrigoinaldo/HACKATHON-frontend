import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Table/tablesUser';
import TablesImage from './pages/Table/tableImage';
import TablesBazzar from './pages/Table/tableBazzar';
import TablesTransparency from './pages/Table/tableTransparency';
import TablesValuable from './pages/Table/tableValuable';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Insurt from './pages/crud/InsurtBazzar';
// import { Table } from './components/TableSettings';
import TablePosition from './components/Tables/tables/TablePosition';
import InsurtImage from './pages/crud/InsurtImage';
import InsurtOwner from './pages/crud/insurtOwner';
import InsurtTransparency from './pages/crud/InsurtTransparency';
import InsurtValuable from './pages/crud/InsurtValuable';
import TableEvent from './components/Tables/tables/TableEvent';
import InsurtEvents from './pages/crud/InsurtEvents';
import TableAboutUs from './components/Tables/tables/TableAboutUs';
import UpdateAboutUs from './pages/crud/update/UpdateAboutUs';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Estado de autenticação
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    // Aqui você deve implementar a lógica de autenticação real.
    // Por exemplo, você pode verificar se há um token no localStorage.
    const token = localStorage.getItem('token'); // Exemplo de verificação
    setIsAuthenticated(!!token);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout isAuthenticated={isAuthenticated}>
      {' '}
      {/* Passa o estado de autenticação */}
      <Routes>
        <Route
          path="/ecommerce"
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
            }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <PageTitle title="Profyile" />
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <ProtectedRoute>
              <PageTitle title="Form Elements" />
              <FormElements />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <ProtectedRoute>
              <PageTitle title="Form Layout" />
              <FormLayout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tables/users"
          element={
            <>
            <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Tables />
          </>
          }
        />
        <Route
          path="/tables/image"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <TablesImage />
            </>
          }
        />
        <Route
          path="/tables/bazzar"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <TablesBazzar />
            </>
          }
        />
        <Route
          path="/tables/transparency"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <TablesTransparency/>
            </>
          }
        />
        <Route
          path="/tables/valuable"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <TablesValuable/>
            </>
          }
        />
        <Route
          path="/tables/position"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <TablePosition/>
            </>
          }
        />
        <Route
          path="/tables/event"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <TableEvent/>
            </>
          }
        />
        <Route
          path="/tables/AboutUs"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <TableAboutUs/>
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <PageTitle title="Settings" />
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chart"
          element={
            <ProtectedRoute>
              <PageTitle title="Basic Chart" />
              <Chart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <ProtectedRoute>
              <PageTitle title="Alerts" />
              <Alerts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <ProtectedRoute>
              <PageTitle title="Buttons" />
              <Buttons />
            </ProtectedRoute>
          }
        />
        <Route
          index
          element={
            <>
              <PageTitle title="Signin" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup" />
              <SignUp />
            </>
          }
        />
        <Route
          path="/insurt/bazzar"
          element={
            <>
              <PageTitle title="insurt" />
              <Insurt/>
            </>
          }
        />
        <Route
          path="/insurt/image"
          element={
            <>
              <PageTitle title="insurt" />
              <InsurtImage/>
            </>
          }
        />
        <Route
          path="/insurt/owner"
          element={
            <>
              <PageTitle title="insurt" />
              <InsurtOwner/>
            </>
          }
        />
        <Route
          path="/insurt/transparency"
          element={
            <>
              <PageTitle title="insurt" />
              <InsurtTransparency/>
            </>
          }
        />
        <Route
          path="/insurt/voluable"
          element={
            <>
              <PageTitle title="insurt" />
              <InsurtValuable/>
            </>
          }
        />
        <Route
          path="/insurt/event"
          element={
            <>
              <PageTitle title="insurt" />
              <InsurtEvents/>
            </>
          }
        />
        <Route
          path="/update/AboutUs/:id"
          element={
            <>
              <PageTitle title="insurt" />
              <UpdateAboutUs/>
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
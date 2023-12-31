import { Route, Routes } from 'react-router-dom';
import Dietas from "../pages/Dietas/Dietas.page.jsx";
import Login from '../pages/Login/Login.page.jsx';
import Exames from '../pages/Exames/Exames.page.jsx';
import Usuario from "../pages/Usuario/Usuario.page.jsx";
import DetalhaProntuario from "../pages/DetalhaProntuario/DetalhaProntuario.page.jsx";
import Prontuarios from '../pages/Prontuarios/Prontuarios.page.jsx';
import { ToastProvider } from '../contexts/ToastContext.jsx';
import Navbar from '../components/MenuLateral/Navbar/Navbar.jsx';
import Toolbar from '../components/Toolbar/Toolbar.page.jsx';
import { PacientesPage } from '../pages/Pacientes/Pacientes.page.jsx';
import { MedicamentosPage } from '../pages/Medicamentos/Medicamentos.page.jsx';
import { ConsultaPage } from '../pages/Consulta/Consulta.page.jsx';
import { HomePage } from '../pages/Home/Home.jsx';
import { PrivateRoutes } from './PrivateRoutes.jsx';
import Exercicios from '../pages/Exercicios/Exercicios.page.jsx';
import { Resetar } from '../pages/Resetar/Resetar.page.jsx';

export const AppRoutes = () => {

  return (
  <ToastProvider>
      <Routes>               
        <Route path="/usuarios/login" element={<Login />} />
        <Route path="/resetar-senha" element={<Resetar />} />
        <Route path="/">
            <Route index element={
              <PrivateRoutes>
                <HomePage />
              </PrivateRoutes>
            } />
          <Route path="/lateralmenu" element={
            <PrivateRoutes>
              <Navbar/>
            </PrivateRoutes>
          }/>
          <Route path="/toolbar" element={
            <PrivateRoutes>
              <Toolbar/>
            </PrivateRoutes>
          }/>
          <Route path="/dietas" element={
            <PrivateRoutes>
              <Dietas />
            </PrivateRoutes>
          } />
          <Route path="/pacientes/:idPaciente/dietas" element={
            <PrivateRoutes>
              <Dietas />
            </PrivateRoutes>
          } />
          <Route path="/pacientes/:idPaciente/dietas/:idDieta" element={
            <PrivateRoutes>
              <Dietas />
            </PrivateRoutes>} />
          <Route path="/exercicios" element={
            <PrivateRoutes>
              <Exercicios />
            </PrivateRoutes>
          } />
          <Route path="/pacientes/:idPaciente/exercicios" element={
            <PrivateRoutes>
              <Exercicios />
            </PrivateRoutes>
          } />
          <Route path="/pacientes/:idPaciente/exercicios/:idExercicio" element={
            <PrivateRoutes>
              <Exercicios />
            </PrivateRoutes>} />
          <Route path="/cadastrar-usuario" element={
            <PrivateRoutes>
              <Usuario />
            </PrivateRoutes>
          } />
          <Route path="/prontuarios" element={
            <PrivateRoutes>
              <Prontuarios />
            </PrivateRoutes>
          } />
          <Route path="/prontuarios/:idPaciente" element={
            <PrivateRoutes>
              <DetalhaProntuario />
            </PrivateRoutes>
          } />
          <Route path="/exames" element={
            <PrivateRoutes>
              <Exames />
            </PrivateRoutes>
          } />
          <Route path="/pacientes/:idPaciente/exames" element={
            <PrivateRoutes>
              <Exames />
            </PrivateRoutes>
          } />
          <Route path="/pacientes/:idPaciente/exames/:id" element={
            <PrivateRoutes>
              <Exames />
            </PrivateRoutes>} />
          <Route path="/pacientes" element={
            <PrivateRoutes>
              <PacientesPage />
            </PrivateRoutes>} />
          <Route path="/pacientes/:pacienteId" element={
            <PrivateRoutes>
              <PacientesPage />
            </PrivateRoutes>} />
          <Route path="/medicamentos" element={
            <PrivateRoutes>
              <MedicamentosPage />
            </PrivateRoutes>}/>
          <Route path="pacientes/:pacienteId/medicamentos" element={
            <PrivateRoutes>
              <MedicamentosPage />
            </PrivateRoutes>}/>
            <Route path="pacientes/:pacienteId/medicamentos/:id" element={
            <PrivateRoutes>
              <MedicamentosPage />
            </PrivateRoutes>}/>
          <Route path="/consultas" element={
            <PrivateRoutes>
              <ConsultaPage />
            </PrivateRoutes>} />
           <Route path="/pacientes/:idPaciente/consultas" element={
              <PrivateRoutes>
            <ConsultaPage />
            </PrivateRoutes>} />
          <Route path="/pacientes/:idPaciente/consultas/:id" element={
            <PrivateRoutes>
          <ConsultaPage />
          </PrivateRoutes>} />
        </Route>
        <Route path="*" element={<p>Página não existe</p>} />
      </Routes>
    </ToastProvider>
  );
};

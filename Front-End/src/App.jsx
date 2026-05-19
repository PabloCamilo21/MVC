import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Cadastro from './components/CadastroUsuario';
import ResetPassword from './components/ResetarSenha';
import ListarProdutos from './components/Produtos';
import CadastroProduto from './components/CadastroProduto';
import EditarProduto from './components/EditarProduto';
import CadastroColaborador from './components/CadastroColaborador';
import RotaProtegida from './components/Protegida';

function App() {

  const token = sessionStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Redirecionamento Inicial */}
        <Route
          path='/'
          element={
            token
              ? <Navigate to="/home" />
              : <Navigate to="/login" />
          }
        />

        {/* Públicas */}
        <Route path='/login' element={<Login />} />
        <Route path='/resetar-senha' element={<ResetPassword />} />

        {/* Admin e Usuário */}
        <Route
          path='/home'
          element={
            <RotaProtegida regrasPermitidas={["admin", "usuario"]}>
              <Home />
            </RotaProtegida>
          }
        />
        <Route
          path="/listar-produtos"
          element={
            <RotaProtegida regrasPermitidas={["admin", "usuario"]}>
              <ListarProdutos />
            </RotaProtegida>
          }
        />

        {/* SOMENTE ADMIN */}
        <Route
          path="/cadastro"
          element={
            <RotaProtegida regrasPermitidas={["admin"]}>
              <Cadastro />
            </RotaProtegida>
          }
        />

        <Route
          path="/cadastrar-produto"
          element={
            <RotaProtegida regrasPermitidas={["admin"]}>
              <CadastroProduto />
            </RotaProtegida>
          }
        />

        <Route
          path="/editarproduto/:id"
          element={
            <RotaProtegida regrasPermitidas={["admin"]}>
              <EditarProduto />
            </RotaProtegida>
          }
        />

        <Route
          path="/cadastrar-colaborador"
          element={
            <RotaProtegida regrasPermitidas={["admin"]}>
              <CadastroColaborador />
            </RotaProtegida>
          }
        />

        {/* Rota inválida */}
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;

// -------------
// Exemplo
//{/* <Route path='/home' element={<Home />} />
// <Route path="/login" element={<Login />} />
// <Route path="/cadastro" element={<Cadastro />} />
// <Route path="/cadastro-produtos" element={<CadastroProduto />} />
// <Route path='/editar-produto/:id' element={<EditarProduto/>}/>
// <Route path='/listar-produtos' element={<ListarProdutos />}/>
// <Route path="/resetepassword" element={<ResetPassword />} />
// <Route path="/cadastro-colaborador" element={<CadastroColaborador />} />
// <Route path="*" element={<Login />} /> */}

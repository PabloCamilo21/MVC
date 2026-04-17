import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Cadastro from './components/CadastroUsuario';
import ResetPassword from './components/ResetarSenha';
import ListarProdutos from './components/Produtos';
import CadastroProduto from './components/CadastroProduto';
import EditarProduto from './components/EditarProduto';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastro-produtos" element={<CadastroProduto />} />
        <Route path='/editar-produto/:id' element={<EditarProduto/>}/>
        <Route path='/listar-produtos' element={<ListarProdutos />}/>
        <Route path="/resetepassword" element={<ResetPassword />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

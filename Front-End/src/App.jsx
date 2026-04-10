import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Cadastro from './components/CadastroUsuario';
import ResetPassword from './components/ResetarSenha';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/resetepassword" element={<ResetPassword />} />

        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

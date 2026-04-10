import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../css/login.css';
import axios from 'axios';
import senai from '../images/senai.png';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

  }

  return (
    <div className="login-container">
      <img src= {senai} alt="Logo-Senai" className="login-logo" />
      <h2>Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div>
          <label>Senha:</label>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </div>

        <button type="submit">Entrar</button>
      </form>
      <div className="links-container">
        <a href="/cadastro">Não tem uma conta? Cadastre-se</a>
        <br />
        <button onClick={() => navigate('/resetepassword')} className="link-button">Esqueceu sua senha?</button>
      </div>
    </div>
  );
};

export default Login;

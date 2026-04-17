import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/cadastroUsuario.css';

function CadastroUsuario() {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [bairro, setBairro] = useState('');
  const [pais, setPais] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [regra, setRegra] = useState('');

  const navegar = useNavigate();

  const handleEnviarFormulario = async (e) => {
    e.preventDefault();

    const usuario = {
      nome,
      idade,
      cidade,
      estado,
      bairro,
      pais,
      email,
      senha,
      regra
    };

    try {
      const response = await axios.post('http://localhost:3001/cadastro', usuario);

      if (response.status === 201) {
        setNome('');
        setIdade('');
        setCidade('');
        setEstado('');
        setBairro('');
        setPais('');
        setEmail('');
        setSenha('');
        setRegra();
        alert('Cadastro realizado com sucesso');
        navegar('/login');
      }

    } catch (erro) {
      console.error(erro);
      alert('Usuário já existe');
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h2>CADASTRO DE USUÁRIO</h2>
        <form onSubmit={handleEnviarFormulario}>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Idade:</label>
            <input
              type="number"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
              required
              min="0"
            />
          </div>

          {/* <div>
            <label>Data de Nascimento:</label>
            <input
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              required
            />
          </div> */}

          <div>
            <label>Cidade:</label>
            <input
              type="text"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Estado:</label>
            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              required
            >
              <option value="">Selecione</option>
              <option value="AC">AC</option>
              <option value="AL">AL</option>
              <option value="AP">AP</option>
              <option value="AM">AM</option>
              <option value="BA">BA</option>
              <option value="CE">CE</option>
              <option value="DF">DF</option>
              <option value="ES">ES</option>
              <option value="GO">GO</option>
              <option value="MA">MA</option>
              <option value="MT">MT</option>
              <option value="MS">MS</option>
              <option value="MG">MG</option>
              <option value="PA">PA</option>
              <option value="PB">PB</option>
              <option value="PR">PR</option>
              <option value="PE">PE</option>
              <option value="PI">PI</option>
              <option value="RJ">RJ</option>
              <option value="RN">RN</option>
              <option value="RS">RS</option>
              <option value="RO">RO</option>
              <option value="RR">RR</option>
              <option value="SC">SC</option>
              <option value="SP">SP</option>
              <option value="SE">SE</option>
              <option value="TO">TO</option>
            </select>
          </div>

          <div>
            <label htmlFor="bairro">Bairro:</label>
            <input
              type="text"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              placeholder='Ex: Jd Brasil'
              required
            />
          </div>

          <div>
            <label htmlFor="pais">País:</label>

            <input type="text"
              placeholder='Ex: Brasil'
              value={pais}
              onChange={(e) => setPais(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Senha:</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="regra">Regra:</label>
            <select value={regra} onChange={(e) => setRegra(e.target.value)} required>
              <option value="Admin">ADMIN</option>
              <option value="Usuario">USUARIO</option>
            </select>
          </div>

          <button type="submit">Cadastrar</button>
        </form>

        <div>
          <button onClick={() => navegar('/login')}>Voltar</button>
        </div>
      </div>
    </div>
  );
}
export default CadastroUsuario;
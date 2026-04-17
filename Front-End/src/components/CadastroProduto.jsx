import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/cadastroUsuario.css';

function CadastroProduto() {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [valor, setValor] = useState('');
  const [codigo, setCodigo] = useState('');

  const navegar = useNavigate();

  const handleEnviarFormulario = async (e) => {
    e.preventDefault();

    if(!nome || !quantidade || !valor || !codigo){
        alert('Todos os campos devem ser preenchidos');
    }

    const produto = {
      nome,
      quantidade,
      valor,
      codigo
    };

    try {
      const response = await axios.post('http://localhost:3001/cadastro-produto', produto);

      if (response.status === 201) {
        setNome('');
        setQuantidade('');
        setValor('');
        setCodigo('');
        alert('Cadastro realizado com sucesso');
      }

    } catch (erro) {
      alert('Falha ao cadastrar produto'); 
      console.error(erro);
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h2>CADASTRO DE PRODUTO</h2>
        <form onSubmit={handleEnviarFormulario}>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder='Ex: Iphone'
              required
            />
          </div>

          <div>
            <label>Quantidade:</label>
            <input
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              placeholder='Ex: 75'
              required
              min="0"
            />
          </div>

          <div>
            <label>Valor em R$</label>
            <input
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value.replace(',','.'))}
              placeholder='Ex: R$200'
              required
            />
          </div>

          <div>
            <label>Código:</label>
            <input
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              placeholder='Ex: XXXXXXX'
              required
            />
          </div>


          <button type="submit">Cadastrar</button>
        </form>

        <div>
          <button onClick={() => navegar('/home')}>Voltar</button>
        </div>
      </div>
    </div>
  );
}
export default CadastroProduto;
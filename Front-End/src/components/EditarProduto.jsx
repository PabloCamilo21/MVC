import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import axios from 'axios';
import '../css/cadastroUsuario.css';

function EditarProduto() {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [valor, setValor] = useState('');
  const {id} = useParams();
  const [codigo, setCodigo] = useState('');

  const navegar = useNavigate();

  const handleEnviarFormulario = async (e) => {
    e.preventDefault();

    if(!nome || !quantidade || !valor || !codigo){
        alert('Todos os campos devem ser preenchidos');
    }

    const produto = {
      id,
      nome,
      quantidade,
      valor,
      codigo
    };

    try {
      const response = await axios.put(`http://localhost:3001/editar-produto/${id}`, produto);

      if (response.status === 200) {
        setNome('');
        setQuantidade('');
        setValor('');
        setCodigo('');
        navegar('/listar-produtos');
      }

    } catch (erro) {
      alert('Falha ao atualizar produto'); 
      console.error(erro);
    }

  };
  useEffect(()=>{
      async function getDadosProduto(){
        const response = await axios.get(`http://localhost:3001/listar-produtos/${id}`);
        console.log(response.data);
        setNome(response.data[0].nome); 
        setQuantidade(response.data[0].quantidade); 
        setValor(response.data[0].valor); 
        setCodigo(response.data[0].codigo); 

      }
      getDadosProduto();
  }, [id]);

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h2>ATUALIZAÇÃO DE PRODUTO</h2>
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


          <button type="submit">Atualizar</button>
        </form>

        <div>
          <button onClick={() => navegar('/listar-produtos')}>Voltar</button>
        </div>
      </div>
    </div>
  );
}
export default EditarProduto;
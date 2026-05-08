import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ListarProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const navegar = useNavigate();

    useEffect(() => {
      const carregarProdutos = async () => {
        try {
          const resposta = await axios.get("http://localhost:3001/listar-produtos");

          const produtosOrdenados = resposta.data.sort((a, b) =>
            a.nome.localeCompare(b.nome)
          );

          setProdutos(produtosOrdenados);
        } catch {
          setErro("Erro ao carregar os produtos.");
        } finally {
          setCarregando(false);
        }
      };

      carregarProdutos();
    }, []);

  const handleExcluir = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        const resposta = await axios.delete(`http://localhost:3001/deletar-produto/${id}`);

        console.log(resposta);

        setProdutos(produtos.filter(produto => produto.id !== id));
      } catch {
        alert("Erro ao excluir o produto.");
      }
    }
  };

  if (carregando) return <div style={estilos.mensagemStatus}>Carregando produtos...</div>;
  if (erro) return <div style={{ ...estilos.mensagemStatus, color: 'red' }}>{erro}</div>;

  return (
    <div style={estilos.container}>
      <h1 style={estilos.titulo}>LISTA DE PRODUTOS</h1>

      <table style={estilos.tabela}>
        <thead style={estilos.thead}>
          <tr>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Valor</th>
            <th>Código</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(produto => (
            <tr key={produto.id} style={estilos.linha}>
              <td>{produto.nome}</td>
              <td>{produto.quantidade}</td>
              <td>R$ {Number(produto.valor).toFixed(2)}</td>
              <td>{produto.codigo}</td>
              <td style={estilos.icones}>
                <FaEdit
                  onClick={() => navegar(`/editar-produto/${produto.id}`)}
                  style={estilos.iconeEditar}
                />
                {console.log(produto.id)}
                <FaTrash
                  onClick={() => handleExcluir(produto.id)}
                  style={estilos.iconeExcluir}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={estilos.containerBotao}>
        <button
          onClick={() => navegar('/home')}
          style={estilos.botaoVoltar}
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

const estilos = {
  container: {
    width: '100%',
    margin: '40px auto',
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  titulo: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333',
  },
  tabela: {
    width: '100%',
    borderCollapse: 'separate',   
    borderSpacing: '0 8px',        
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  thead: {
    backgroundColor: '#4CAF50',
    color: 'white',
  },
  linha: {
    textAlign: 'center',
    backgroundColor: '#fff',      
    borderRadius: '4px',          
  },
  icones: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
  },
  iconeEditar: {
    color: '#3498db',
    cursor: 'pointer',
    fontSize: '18px',
  },
  iconeExcluir: {
    color: '#e74c3c',
    cursor: 'pointer',
    fontSize: '18px',
  },
  containerBotao: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
  },
  botaoVoltar: {
    padding: '6px 14px',
    fontSize: '14px',
    width: '120px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  mensagemStatus: {
    textAlign: 'center',
    marginTop: '40px',
    fontSize: '18px',
  }
};

export default ListarProdutos;
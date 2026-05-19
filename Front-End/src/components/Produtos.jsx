import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const ListarProdutos = () => {

  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [pesquisa, setPesquisa] = useState('');

  const navegar = useNavigate();

  const regra = sessionStorage.getItem("regra");
  const isAdmin = regra === "admin";

  useEffect(() => {

    carregarProdutos();

  }, []);

  const carregarProdutos = async () => {

    try {

      setCarregando(true);

      const resposta = await axios.get(
        "http://localhost:3001/listar-produtos"
      );

      const produtosOrdenados = resposta.data.sort(
        (a, b) => a.nome.localeCompare(b.nome)
      );

      setProdutos(produtosOrdenados);

    } catch {

      setErro("Erro ao carregar os produtos.");

    } finally {

      setCarregando(false);

    }
  };

  const pesquisarProdutos = async (texto) => {

    setPesquisa(texto);

    try {

      if (texto.trim() === '') {

        carregarProdutos();
        return;

      }

      const resposta = await axios.get(
        `http://localhost:3001/listar-produtos/pesquisar?nome=${texto}`
      );

      setProdutos(resposta.data);

    } catch {

      alert("Erro ao pesquisar produtos.");

    }
  };

  const handleExcluir = async (id) => {

    if (!isAdmin) {

      alert(
        "Você não possui permissão para excluir produtos."
      );

      return;

    }

    if (
      window.confirm(
        "Tem certeza que deseja excluir este produto?"
      )
    ) {

      try {

        await axios.delete(
          `http://localhost:3001//deletar-produto/${id}`
        );

        setProdutos(
          produtos.filter(
            produto => produto.id !== id
          )
        );

      } catch {

        alert("Erro ao excluir o produto.");

      }
    }
  };

  if (carregando) {

    return (

      <div style={estilos.mensagemStatus}>
        Carregando produtos...
      </div>

    );
  }

  if (erro) {

    return (

      <div
        style={{
          ...estilos.mensagemStatus,
          color: 'red'
        }}
      >
        {erro}
      </div>

    );
  }

  return (

    <div style={estilos.container}>

      <h1 style={estilos.titulo}>
        LISTA DE PRODUTOS
      </h1>

      <div style={estilos.containerPesquisa}>

        <div style={estilos.boxPesquisa}>

          <FaSearch style={estilos.iconePesquisa} />

          <input
            type="text"
            placeholder="Pesquisar produto pelo nome..."
            value={pesquisa}
            onChange={(e) =>
              pesquisarProdutos(e.target.value)
            }
            style={estilos.inputPesquisa}
          />

        </div>

      </div>

      <table style={estilos.tabela}>

        <thead style={estilos.thead}>

          <tr>

            <th style={estilos.th}>Nome</th>

            <th style={estilos.th}>
              Quantidade
            </th>

            <th style={estilos.th}>Valor</th>

            <th style={estilos.th}>Código</th>

            {isAdmin && (
              <th style={estilos.th}>
                Ações
              </th>
            )}

          </tr>

        </thead>

        <tbody>

          {produtos.length > 0 ? (

            produtos.map(produto => (

              <tr
                key={produto.id}
                style={estilos.linha}
              >

                <td style={estilos.td}>
                  {produto.nome}
                </td>

                <td style={estilos.td}>
                  {produto.quantidade}
                </td>

                <td style={estilos.td}>

                  R$ {' '}

                  {Number(
                    produto.valor
                  ).toFixed(2)}

                </td>

                <td style={estilos.td}>
                  {produto.codigo}
                </td>

                {isAdmin && (

                  <td style={estilos.icones}>

                    <FaEdit
                      onClick={() =>
                        navegar(
                          `/editarproduto/${produto.id}`
                        )
                      }
                      style={estilos.iconeEditar}
                    />

                    <FaTrash
                      onClick={() =>
                        handleExcluir(produto.id)
                      }
                      style={estilos.iconeExcluir}
                    />

                  </td>

                )}

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan={isAdmin ? 5 : 4}
                style={estilos.semResultados}
              >
                Nenhum produto encontrado.
              </td>

            </tr>

          )}
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
    padding: '0 20px',
    boxSizing: 'border-box',
  },

  titulo: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333',
    fontSize: '28px',
  },

  containerPesquisa: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '25px',
  },

  boxPesquisa: {
    display: 'flex',
    alignItems: 'center',
    width: '350px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '0 12px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },

  iconePesquisa: {
    color: '#777',
    fontSize: '16px',
  },

  inputPesquisa: {
    width: '100%',
    padding: '12px',
    border: 'none',
    outline: 'none',
    fontSize: '14px',
  },

  tabela: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0 8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    borderRadius: '8px',
  },

  thead: {
    backgroundColor: '#4CAF50',
    color: 'white',
  },

  th: {
    padding: '14px',
    fontSize: '15px',
  },

  linha: {
    textAlign: 'center',
    backgroundColor: '#fff',
  },

  td: {
    padding: '14px',
    borderBottom: '1px solid #eee',
  },

  icones: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '18px',
  },

  iconeEditar: {
    color: '#3498db',
    cursor: 'pointer',
    fontSize: '18px',
    transition: '0.2s',
  },

  iconeExcluir: {
    color: '#e74c3c',
    cursor: 'pointer',
    fontSize: '18px',
    transition: '0.2s',
  },

  semResultados: {
    textAlign: 'center',
    padding: '20px',
    color: '#777',
    fontSize: '15px',
  },

  containerBotao: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
  },

  botaoVoltar: {
    padding: '10px 18px',
    fontSize: '14px',
    width: '140px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: '0.3s',
  },

  mensagemStatus: {
    textAlign: 'center',
    marginTop: '40px',
    fontSize: '18px',
  }

};

export default ListarProdutos;
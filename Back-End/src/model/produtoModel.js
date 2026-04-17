import conexao from "../../config/db.js";

const modelProduto = {
    cadastrar: async (nome, quantidade, valor, codigo) => {

        try {
            const resultado = await conexao.query("INSERT INTO produtos (nome, quantidade, valor, codigo) VALUES (?, ?, ?, ?)",
                [nome, quantidade, valor, codigo]
            );
            return resultado;
        } catch (erro) {
            throw erro;

        }
    },
    listar: async() => {
        try {
            const [resultado] = await conexao.query("SELECT id, nome, quantidade, valor, codigo FROM produtos");
            return resultado;
        } catch (erro) {
            throw erro;
        }
    },
    editar: async(nome, quantidade, valor, codigo, id) => {
        try {
            const [resultado] = await conexao.query("UPDATE produtos SET nome = ?, quantidade = ?, valor = ?, codigo = ? WHERE id = ?",
                [nome, quantidade, valor, codigo, id]
            );
            console.log(resultado);
            return resultado;
        } catch (erro) {
            throw erro;
        }
    },
    deletar: async(id) => {
        try {
            const [resultado] = await conexao.query("DELETE FROM produtos WHERE id = ?", [id]);
            return resultado
        } catch (erro) {
            throw erro;
        }
    },
    listarPorId: async(id) => {
        try {
            const [resultado] = await conexao.query("SELECT id, nome, quantidade, valor, codigo FROM produtos WHERE id = ?", [id]);
            return resultado;
        } catch (erro) {
            throw erro;
        }
    }
}
export default modelProduto;
import conexao from "../../config/db.js";

const modelColaborador = {
    cadastrar: async(id_usuario, nome, idade, cidade, estado, bairro, nf) => {
        try {
            const resultado = await conexao.query("INSERT INTO colaborador (id_usuario, nome, idade, cidade, estado, bairro, nf) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [id_usuario, nome, idade, cidade, estado, bairro, nf]
            );
            return resultado;
        } catch (erro) {
            throw erro
        }
    }
}
export default modelColaborador;
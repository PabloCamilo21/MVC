import modelColaborador from '../model/colaboradorModel.js';

const colaboradorController = {
    cadastrar: async (req, res) => {
        const { id_usuario, nome, idade, cidade, estado, bairro, nf } = req.body;

        try {
            const [cadastro] = await modelColaborador.cadastrar(id_usuario, nome, idade, cidade, estado, bairro, nf);

            if (cadastro.affectedRows > 0) {
                return res.status(201).json({ msg: "Cadastro realizado com sucesso" });
            }
            else {
                return res.status(400).json({ msg: "Falha ao realizar cadastro" });
            }
        } catch (erro) {
            console.log(erro);
            if (erro.errno === 1062) {
                return res.status(409).json({ msg: "Valores duplicados" });
            }
            return res.status(500).json({ msg: "Erro no servidor" });
        }
    }
}
export default colaboradorController;
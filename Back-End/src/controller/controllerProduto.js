import modelProduto from "../model/produtoModel.js";

const controllerProduto = {
    cadastrar: async (req, res) => {
        const { nome, quantidade, valor, codigo } = req.body;

        console.log(req.body);

        try {
            const [cadastro] = await modelProduto.cadastrar(nome, quantidade, valor, codigo);


            if (cadastro.affectedRows > 0) {
                return res.status(201).json({ msg: "Cadastro realizado com sucesso" });
            }
            else {
                return res.status(400).json({ msg: "Falha ao cadastrar" });
            }

        } catch (erro) {
            console.log(erro);
            if (erro.errno === 1062) {
                return res.status(409).json({ msg: "Valores duplicados" });
            }
            return res.status(500).json({ msg: "Erro no servidor" });
        }

    },
    listar: async (req, res) => {
        try {
            const objeto = await modelProduto.listar();
            res.status(200).json(objeto);
        } catch (erro) {
            return res.status(500).json({ msg: "Erro no servidor" });
        }
    },
    editar: async (req, res) => {
        const { nome, quantidade, valor, codigo } = req.body;
        const { id } = req.params;

        try {
            if (!nome || !quantidade || !valor || !codigo) {
                return res.status(400).json({ msg: "Todos os campos são obrigatórios" });
            }
            const editar = await modelProduto.editar(nome, quantidade, valor, codigo, id);

            if (editar.affectedRows > 0) {
                return res.status(200).json({ msg: "Atualização realizada com sucesso" });
            }
            else {
                return res.status(404).json({ msg: "Falha ao atualizar" });
            }
        } catch (erro) {
            console.log(erro);
            return res.status(500).json({ msg: "Erro no servidor" });
        }
    },
    deletar: async (req, res) => {
        const { id } = req.params;

        try {
            const deletar = await modelProduto.deletar(id);

            if (deletar.affectedRows > 0) {
                return res.status(204).send();
            }
            else {
                return res.status(404).json({ msg: "Falha ao deletar" });
            }
        } catch (erro) {
            console.log(erro);
            return res.status(500).json({ msg: "Erro no servidor" });
        }
    },
    listarPorId: async (req, res) => {
        const { id } = req.params;
        try {
            const objeto = await modelProduto.listarPorId(id);
            res.status(200).json(objeto);
        } catch (erro) {
            console.log(erro);
            return res.status(500).json({ msg: "Erro no servidor" });
        }
    },
    pesquisarProdutos: async (req, res) => {
        try {
            const {nome} = req.query;

            if(!nome){
                return res.status(400).json({
                    msg: "Informe um nome"
                });
            }
            const produtos = await modelProduto.pesquisarNome(nome);
            res.status(200).json(produtos);
            
        } catch (erro) {
            return res.status(500).json({ msg: "Erro no servidor" });
        }
    }
}
export default controllerProduto;
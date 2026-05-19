import modelUsuario from "../model/usuarioModel.js";


const usuarioController = {
    cadastrar: async (req, res) => {
        //desestruturar o objeto json
        const { nome, idade, cidade, estado, bairro, pais, email, senha, regra } = req.body;

        console.log(req.body);

        try {
            const [cadastro] = await modelUsuario.cadastrar(nome, idade, cidade, estado, bairro, pais, email, senha, regra);

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
    login: async (req, res) => {

        const {email, senha } = req.body;

        try {
            const validar = await modelUsuario.validarLogin(email, senha);
            console.log(validar)

            // const usuario = {
            //     nome: validar.nome,
            //     id_usuario: validar.id
            // }

            if(!validar){
                return res.status(401).json({msg: "Falha ao realizar login"});
            }
            else{
                return res.status(200).json(validar);
            }

        } catch (erro) {
            console.log(erro);
            return res.status(500).json({msg: "Erro no servidor"});
        }
    }
}
export default usuarioController;
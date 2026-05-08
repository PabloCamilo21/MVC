import conexao from "../../config/db.js";
import bcrypt from 'bcrypt'; //import da biblioteca bcrypt para senha
import jwt from 'jsonwebtoken';
import 'dotenv/config.js';

const modelUsuario = {
    listarUsuarios: async () => {
        try {
            const [resultado] = await conexao.query("SELECT nome, idade, cidade, estado, bairro, pais, email, senha, regra FROM usuarios");
            return resultado;

        } catch (erro) {
            throw erro;
        }
    },
    listarPorId: async (id) => {
        try {
            const [resultado] = await conexao.query("SELECT id, nome, idade, cidade, estado, bairro, pais, email, senha, regra FROM usuarios WHERE id = ?", [id]);
            return resultado;
        } catch (erro) {
            throw erro;
        }
    },
    cadastrar: async (nome, idade, cidade, estado, bairro, pais, email, senha, regra) => {
        
        const senhaHash = await bcrypt.hash(senha, 10);

        try {
            const resultado = await conexao.query("INSERT INTO usuarios (nome, idade, cidade, estado, bairro, pais, email, senha, regra) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [nome, idade, cidade, estado, bairro, pais, email, senhaHash, regra]
            );
            return resultado;
        } catch (erro) {
            throw erro;

        }
    },
    validarLogin: async(email, senha) => {
        try {
            const [consulta] = await modelUsuario.buscarEmail(email);      

            const combinacao = await bcrypt.compare(senha, consulta[0].senha);

            if(combinacao){
                const acessToken = jwt.sign(
                    {id: consulta[0].id, nome: consulta[0].nome, email: consulta[0].email},
                    process.env.JWT_SECRET,
                    { expiresIn: '25m' }
                );
                return {acessToken};
            }
            else{
                return null;
            }

        } catch (erro) {
            throw erro;
        }
    },
    buscarEmail: async(email) => {
        try {
            const resultado = await conexao.query("SELECT id, nome, idade, cidade, estado, bairro, pais, email, senha, regra FROM usuarios WHERE email = ?", [email]);
            return resultado;

        } catch (erro) {
            throw erro;
        }
    }
}
export default modelUsuario;
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import axios from 'axios';
import '../css/cadastroUsuario.css';

function CadastroColaborador() {
    const [nome, setNome] = useState('');
    const [id_usuario, setIdUsuario] = useState('');
    const [idade, setIdade] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [bairro, setBairro] = useState('');
    const [nf, setNf] = useState('');

    const navegar = useNavigate();

    const handleEnviarFormulario = async (e) => {
        e.preventDefault();

        if (!nome || !idade || !cidade || !estado || !bairro || !nf) {
            alert('Todos os campos devem ser preenchidos');
        }

        const colaborador = {
            id_usuario: localStorage.getItem('token'),
            nome,
            idade,
            cidade,
            estado,
            bairro,
            nf
        }

        try {
            const response = await axios.post('http://localhost:3001/cadastro-colaborador', colaborador);

            console.log(response);

            if (response.status === 201) { //comentario teste
                setNome('');
                setIdade('');
                setCidade('');
                setEstado('');
                setBairro('');
                setNf('');
                alert('Cadastro realizado com sucesso')
            }
        } catch (erro) {
            console.error(erro);
        }
    }

    return (
        <div className="form-container">
            <div className="form-wrapper">
                <h2>CADASTRO DE COLABORADORES</h2>
                <form onSubmit={handleEnviarFormulario}>
                    <div>
                        <label>Nome:</label>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder='Ex: Carlos'
                            required
                        />
                    </div>

                    <div>
                        <label>Idade:</label>
                        <input
                            type="number"
                            value={idade}
                            onChange={(e) => setIdade(e.target.value)}
                            placeholder='Ex: 75'
                            required
                            min="0"
                        />
                    </div>

                    <div>
                        <label>Cidade</label>
                        <input
                            type="text"
                            value={cidade}
                            onChange={(e) => setCidade(e.target.value)}
                            placeholder='Ex: Garça'
                            required
                        />
                    </div>

                    <div>
                        <label>Estado:</label>
                        <select
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                            required
                        >
                            <option value="">Selecione</option>
                            <option value="AC">AC</option>
                            <option value="AL">AL</option>
                            <option value="AP">AP</option>
                            <option value="AM">AM</option>
                            <option value="BA">BA</option>
                            <option value="CE">CE</option>
                            <option value="DF">DF</option>
                            <option value="ES">ES</option>
                            <option value="GO">GO</option>
                            <option value="MA">MA</option>
                            <option value="MT">MT</option>
                            <option value="MS">MS</option>
                            <option value="MG">MG</option>
                            <option value="PA">PA</option>
                            <option value="PB">PB</option>
                            <option value="PR">PR</option>
                            <option value="PE">PE</option>
                            <option value="PI">PI</option>
                            <option value="RJ">RJ</option>
                            <option value="RN">RN</option>
                            <option value="RS">RS</option>
                            <option value="RO">RO</option>
                            <option value="RR">RR</option>
                            <option value="SC">SC</option>
                            <option value="SP">SP</option>
                            <option value="SE">SE</option>
                            <option value="TO">TO</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="bairro">Bairro:</label>
                        <input type="text"
                            value={bairro}
                            onChange={(e) => setBairro(e.target.value)}
                            placeholder='Ex: Jardim Paulista'
                            required />
                    </div>

                    <div>
                        <label htmlFor="nf">Numero de Funcionario</label>
                        <input type="text"
                            value={nf}
                            onChange={(e) => setNf(e.target.value)}
                            placeholder='Ex: 125'
                            required />
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
export default CadastroColaborador;
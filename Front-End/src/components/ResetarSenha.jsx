import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RedefinirSenha = () => {
    const [email, setEmail] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const navegar = useNavigate();

    

    return (
        <div style={estilos.container}>
            <div style={estilos.card}>
                <h4 className="text-center mb-3">Redefinir Senha</h4>

                <input
                    type="email"
                    className="form-control mb-2"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {!mostrarFormulario && (
                    <button
                        className="btn btn-primary w-100 mb-2"
                        onClick={VerificarEmail}
                    >
                        Verificar Email
                    </button>
                )}

                {mostrarFormulario && (
                    <>
                        <input
                            type="password"
                            className="form-control mb-2"
                            placeholder="Nova Senha"
                            value={novaSenha}
                            onChange={(e) => setNovaSenha(e.target.value)}
                        />
                        <input
                            type="password"
                            className="form-control mb-2"
                            placeholder="Confirmar Senha"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                        />
                        <button
                            className="btn btn-danger w-100"
                            onClick={TrocarSenha}
                        >
                            Alterar Senha
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

const estilos = {
    container: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
    },
    card: {
        width: "320px",
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
    },
};

export default RedefinirSenha;
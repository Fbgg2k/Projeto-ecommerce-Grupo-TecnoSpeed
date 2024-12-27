import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ResetarSenha() {
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [message, setMessage] = useState("");
    const { state } = useLocation();
    const { email, codigo } = state || {};
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (senha !== confirmarSenha) {
            setMessage("As senhas não coincidem.");
            return;
        }
        try {
            const response = await fetch("http://localhost:3000/usuarios/resetar-senha", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha, codigo }),
            });
            const data = await response.json();
            if (response.ok) {
                navigate("/login");
            } else {
                setMessage(data.message || "Erro ao resetar senha.");
            }
        } catch (error) {
            setMessage("Erro no servidor.");
        }
    };

    return (
        <div>
            <h2>Resetar Senha</h2>
            <input
                type="password"
                placeholder="Nova senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
            />
            <input
                type="password"
                placeholder="Confirme a senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
            />
            <button onClick={handleSubmit}>Resetar</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ResetarSenha;

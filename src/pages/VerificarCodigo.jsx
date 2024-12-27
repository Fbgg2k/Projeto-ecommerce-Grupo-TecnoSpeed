import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function VerificarCodigo() {
    const [codigo, setCodigo] = useState("");
    const [message, setMessage] = useState("");
    const { state } = useLocation();
    const { email } = state || {};
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:3000/usuarios/verificar-codigo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, codigo }),
            });
            const data = await response.json();
            if (response.ok) {
                navigate("/resetar-senha", { state: { email, codigo } });
            } else {
                setMessage(data.message || "Código inválido.");
            }
        } catch (error) {
            setMessage("Erro no servidor.");
        }
    };

    return (
        <div>
            <h2>Verificar Código</h2>
            <input
                type="text"
                placeholder="Digite o código enviado"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
            />
            <button onClick={handleSubmit}>Verificar</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default VerificarCodigo;

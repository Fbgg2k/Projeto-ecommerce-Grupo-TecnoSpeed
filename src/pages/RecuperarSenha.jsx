import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RecuperarSenha() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:3000/usuarios/recuperar-senha", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                navigate("/verificar-codigo", { state: { email } });
            } else {
                setMessage(data.message || "Erro ao enviar código.");
            }
        } catch (error) {
            setMessage("Erro no servidor. Tente novamente.");
        }
    };

    return (
        <div>
            <h2>Recuperar Senha</h2>
            <input
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSubmit}>Enviar</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default RecuperarSenha;

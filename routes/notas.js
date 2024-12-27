const express = require("express");
const router = express.Router();
const apiNotas = require("../service/apinota");

// Rota GET para consultar o resumo da nota

router.get("/consulta/:idNotaOrChaveOrProtocol", async (req, res) => {
  const { idNotaOrChaveOrProtocol } = req.params;

  try {
    const response = await apiNotas.get(
      `nfe/${idNotaOrChaveOrProtocol}/resumo`
    );
    console.log("Resposta da API (GET):", response.data); // Log da resposta da API
    res.status(200).json(response.data);
  } catch (error) {
    const { response } = error;
    if (response) {
      console.log("Erro na requisição GET:", response.data); // Log do erro com status específico
      const { status, data } = response;
      res.status(status).json(data);
    } else {
      console.log("Erro interno ao consultar o resumo da nota:", error.message); // Log do erro interno
      res
        .status(500)
        .json({ error: "Erro interno ao consultar o resumo da nota" });
    }
  }
});

// Rota POST para gerar uma nova nota
router.post("/gerar", async (req, res) => {
  const notaData = req.body;

  console.log("POST /gerar - Enviando dados para gerar nova nota");
  console.log("Dados da nota (POST):", notaData); // Log dos dados enviados no POST

  try {
    const response = await apiNotas.post("/nfe", notaData);
    console.log("Resposta da API (POST):", response.data); // Log da resposta da API
    res.status(200).json(response.data);
  } catch (error) {
    const { response } = error;
    if (response) {
      console.error("Erro na requisição POST:", response.data); // Mantém o log original
      if (
        response.data &&
        response.data.error &&
        response.data.error.data &&
        response.data.error.data.fields
      ) {
        console.error(
          "Campos com erro:",
          JSON.stringify(response.data.error.data.fields, null, 2)
        ); // Log mais detalhado dos campos
      }
      const { status, data } = response;
      res.status(status).json(data);
    } else {
      console.error("Erro interno ao gerar a nota:", error); // Loga o erro completo
      res.status(500).json({ error: "Erro interno ao gerar a nota" });
    }
  }
});

// Rota GET para baixar o PDF da nota fiscal
router.get("/pdf/:idNota", async (req, res) => {
  const { idNota } = req.params;

  try {
    const response = await apiNotas.get(`nfe/${idNota}/pdf`, {
      responseType: "arraybuffer",
    });
    res.set("Content-Type", "application/pdf");
    res.set("Content-Disposition", `attachment; filename=nota-${idNota}.pdf`);
    res.send(response.data);
  } catch (error) {
    const { response } = error;
    if (response) {
      console.log("Erro na API GET PDF:", response.data);
      res.status(response.status).json(response.data);
    } else {
      console.error("Erro interno ao baixar o PDF:", error.message);
      res
        .status(500)
        .json({ error: "Erro interno ao baixar o PDF da nota fiscal" });
    }
  }
});


module.exports = router;

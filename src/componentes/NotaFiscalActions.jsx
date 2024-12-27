import React, { useState } from "react";
import axios from "axios";
import { faker } from "@faker-js/faker";

function NotaFiscalActions() {
  const [loading, setLoading] = useState(false); // Estado para controlar o loading
  const [error, setError] = useState(null); // Estado para controlar erros

  const generateNotaData = () => ({
    idIntegracao: `TESTE_${Date.now()}`,
    versaoManual: "4",
    codigo: faker.string.numeric(8),
    numero: faker.string.numeric(4),
    serie: 1,
    finalidade: "1",
    natureza: "VENDA DE PRODUTO",
    dataEmissao: new Date().toISOString(),
    dataSaidaEntrada: new Date(new Date().getTime() + 3600000).toISOString(),
    saida: true,
    presencial: "1",
    tipoImpressao: "1",
    tipoEmissao: "1",
    codigoIdentificacaoDestino: "1",
    codigoMunicipioFatoGerador: "3202405",
    consumidorFinal: true,
    emitente: {
      cpfCnpj: "12345678000199",
      nome: faker.company.name(),
      endereco: {
        tipoLogradouro: "Rua",
        logradouro: faker.location.street(),
        numero: faker.string.numeric(3),
        bairro: faker.location.city(),
        codigoCidade: "3202405",
        descricaoCidade: "GUAÇUÍ",
        estado: "ES",
        cep: faker.string.numeric(8),
      },
    },
    destinatario: {
      cpfCnpj: faker.string.numeric(11),
      razaoSocial: "NF-E EMITIDA EM AMBIENTE DE TESTE - SEM VALOR FISCAL",
      email: faker.internet.email(),
      endereco: {
        tipoLogradouro: "Rua",
        logradouro: faker.location.street(),
        numero: faker.string.numeric(3),
        bairro: faker.location.city(),
        codigoCidade: "3202405",
        descricaoCidade: "GUAÇUÍ",
        estado: "ES",
        cep: faker.string.numeric(8),
      },
    },
    itens: [
      {
        codigo: faker.string.numeric(3),
        descricao: faker.commerce.productName(),
        ncm: faker.string.numeric(8),
        cest: faker.string.numeric(7),
        cfop: "5102",
        valorUnitario: {
          comercial: faker.number.float({ min: 1, max: 1000, precision: 0.01 }),
          tributavel: faker.number.float({
            min: 1,
            max: 1000,
            precision: 0.01,
          }),
        },
        valor: 100.0,
        tributos: {
          icms: {
            origem: "0",
            cst: "00",
            baseCalculo: {
              modalidadeDeterminacao: 0,
              valor: 100.0,
            },
            aliquota: 18,
            valor: 18.0,
          },
          pis: {
            cst: "01",
            baseCalculo: {
              valor: 100.0,
              quantidade: 1,
            },
            aliquota: 1.65,
            valor: 1.65,
          },
          cofins: {
            cst: "01",
            baseCalculo: {
              valor: 100.0,
            },
            aliquota: 7.6,
            valor: 7.6,
          },
        },
      },
    ],
    total: {
      valorTotalTributos: 0,
      valorProdutos: 0,
      valorNota: 0,
    },
    pagamentos: [{ aVista: true, meio: "01", valor: 0, valorTroco: 0 }],
    responsavelTecnico: {
      cpfCnpj: "12345678000199",
      nome: "Responsável Técnico Teste",
      email: faker.internet.email(),
      telefone: {
        ddd: faker.string.numeric(2),
        numero: faker.string.numeric(8),
      },
    },
    informacoesComplementares:
      "NF-E emitida em ambiente de teste, sem valor fiscal.",
  });

  const handleGerarNota = async () => {
    setLoading(true);
    setError(null);

    try {
      const newNota = generateNotaData();
      const response = await axios.post("http://localhost:3000/notas/gerar", [
        newNota,
      ]);
      if (response.status === 200 || response.status === 201) {
        const notaId = response.data.documents[0].id; // Obtém o ID da nota
        const pdfResponse = await axios.get(
          `http://localhost:3000/notas/pdf/${notaId}`,
          { responseType: "blob" }
        );
        const url = window.URL.createObjectURL(
          new Blob([pdfResponse.data], { type: "application/pdf" })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `nota_${notaId}.pdf`); // Nomeia o arquivo com o ID
        document.body.appendChild(link);
        link.click();
        link.remove(); // Remove o link para evitar sujeira no DOM
        URL.revokeObjectURL(url);
      } else {
        setError(`Erro: ${response.statusText}`);
        alert(`Erro ao gerar nota fiscal: ${response.statusText}`);
      }
    } catch (error) {
      setError(error.message);
      console.error("Erro ao gerar ou baixar a nota:", error);
      alert(`Erro ao gerar nota fiscal: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleGerarNota}
        className="w-full border p-4 font-bold text-xl border-customBlueBorder rounded-md text-customBlueBorder hover:bg-customBlueRelease hover:text-white"
        disabled={loading}
      >
        {loading ? "Gerando..." : "Baixar Nota Fiscal"}
      </button>
    </div>
  );
}


export default NotaFiscalActions;


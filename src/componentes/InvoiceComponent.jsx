import React, { useContext, useEffect, useState } from "react";
import { Page, Text, View, Document, StyleSheet, PDFViewer, PDFDownloadLink, Image } from "@react-pdf/renderer";
import { ShopContext } from "../context/shop-context";
import logo2 from "../assets/logo2.png";
import JsBarcode from "jsbarcode";

// Função para gerar o código de barras em base64
const generateBarcodeBase64 = (data) => {
  const canvas = document.createElement("canvas");
  JsBarcode(canvas, data, {
    format: "CODE128",
    displayValue: true,
    width: 2,
    height: 40,
  });
  return canvas.toDataURL("image/png");
};

// Estilos para o PDF
const pdfStyles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 12,
    lineHeight: 1.6,
    backgroundColor: "#f9f9f9",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottom: "1px solid #ccc",
  },
  logo: {
    width: 80,
    height: 50,
    marginBottom: 5,
    alignSelf: "center",
  },
  companyInfo: {
    fontSize: 10,
    color: "#778899",
    marginTop: 5,
  },
  section: {
    marginTop: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailsTable: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #ccc",
  },
  tableCell: {
    flex: 1,
    padding: 6,
    fontSize: 14,
    textAlign: "center",
  },
  tableCell2: {
    flex: 1,
    padding: 6,
    fontSize: 10,
    textAlign: "start",

  },
  tableCell3: {
    flex: 1,
    padding: 6,
    fontSize: 10,
    textAlign: "center",
  },
  tableCell4: {
    flex: 1,
    padding: 6,
    fontSize: 10,
    textAlign: "start",
    flexDirection: "column",

  },
  tableCellHeader: {
    fontWeight: "bold",
    backgroundColor: "#87CEFA",
    textAlign: "center",
  },
  totalSection: {
    marginTop: 15,
    textAlign: "left",
    fontSize: 12,
  },
  boldText: {
    fontWeight: "bold",
  },
  customerInfo: {
    marginBottom: 10,
    fontSize: 12,
    lineHeight: 1.5,
  },
  customerInformations: {
    fontSize: 14,
    fontWeight: "extrabold",
    color: "#000000",
  },
  barcode: {
    height: '5rem',
    textAlign: "center",
    border:'1px',
  },
  thankYouMessage: {
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 5,
    fontStyle: 'italic',
    color: '#444',
  },

  text: {
    fontSize: 14, // Tamanho da fonte
    marginBottom: 8, // Espaçamento inferior entre o texto e a linha
    borderBottom: "2px dashed black", // Linha tracejada abaixo do texto
    paddingBottom: 4, // Espaçamento interno opcional entre o texto e a linha
    color: "#000", // Cor do texto
  },
});



// Documento PDF
const InvoicePDF = ({ cartItems, totalCart, subtotalCart, data, barcodeImage }) => (




  <Document>
    <Page size="A4" style={pdfStyles.page}>
      {/* Cabeçalho com logotipo */}
      <View style={pdfStyles.header}>
        <Image style={pdfStyles.logo} src={logo2} />
        <Text style={pdfStyles.title}>General Store</Text>
        <Text style={pdfStyles.companyInfo}>Endereço: Avenida Central, 1234 - Bloco A - CEP 12345-678 - São Paulo - SP</Text>
        <Text style={pdfStyles.companyInfo}>Telefone: 0800 555 4526 | Email: contato@generalstore.com.br</Text>
      </View>

      {/* Informações do cliente */}
      <View style={pdfStyles.customerInfo}>
        <Text>
          <Text style={pdfStyles.customerInformations}>Nome: </Text>
          <Text>{data.name}</Text> {/* Só o nome não será estilizado */}
        </Text>
        <Text>
          <Text style={pdfStyles.customerInformations}>Endereço: </Text>
          <Text>{data.address}</Text> {/* Só o nome não será estilizado */}
        </Text>
        <Text>
          <Text style={pdfStyles.customerInformations}>Data da Compra: </Text>
          <Text>{data.purchaseDate}</Text> {/* Só o nome não será estilizado */}
        </Text>
        
      </View>

      {/* Detalhes do pagamento */}
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.title}>Detalhes do Pagamento</Text>
        <View style={pdfStyles.detailsTable}>
          <View style={[pdfStyles.tableRow, pdfStyles.tableCellHeader]}>
            <Text style={pdfStyles.tableCell}>Número da Fatura</Text>
            <Text style={pdfStyles.tableCell}>Data de Vencimento</Text>
            <Text style={pdfStyles.tableCell}>Valor Total</Text>
          </View>
          <View style={pdfStyles.tableRow}>
            <Text style={pdfStyles.tableCell}>{data.invoiceNumber}</Text>
            <Text style={pdfStyles.tableCell}>{data.dueDate}</Text>
            <Text style={pdfStyles.tableCell}>R$ {data.total.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      <View style={pdfStyles.section}>
        <Text style={pdfStyles.title}>Informações Adicionais</Text>
        <Text>- Após a confirmação do pagamento o pedido será preparado para envio.</Text>
        <Text>- Pagamentos por boleto podem levar até 72 horas para baixa.</Text>
        <Text>- Prazo estimado de entrega: Até 5 dias úteis.</Text>
        <Text>- Garantia de 30 dias para devoluções ou trocas.</Text>
        <Text>- Pagável em qualquer agência bancaria ou loterica até o vencimento.</Text>
        <Text>- Após o vencimento, sera necessário emitir outro boleto.</Text>
      </View>

      {/* Frases de Agradecimento */}
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.thankYouMessage}>
          Obrigado por escolher a General Store! A sua satisfação é a nossa prioridade.
        </Text>
        <Text style={pdfStyles.thankYouMessage}>
          Caso tenha dúvidas ou problemas com o pedido, entre em contato conosco. Estamos aqui para ajudar!
        </Text>       
        <Text style={pdfStyles.thankYouMessage}> Abaixo o seu código de barras para pagamento</Text>
        <Text style={pdfStyles.text}></Text>
      </View>

      <View style={pdfStyles.detailsTable}>
          <View style={[pdfStyles.tableRow, pdfStyles.tableCellHeader]}>
            <Text style={pdfStyles.tableCell}>Número da Fatura</Text>
            <Text style={pdfStyles.tableCell}>Data de Vencimento</Text>
            <Text style={pdfStyles.tableCell}>Valor Total</Text>
          </View>
          <View style={pdfStyles.tableRow}>
            <Text style={pdfStyles.tableCell}>{data.invoiceNumber}</Text>
            <Text style={pdfStyles.tableCell}>{data.dueDate}</Text>
            <Text style={pdfStyles.tableCell}>R$ {data.total.toFixed(2)}</Text>
          </View>
        </View>


      {/* Código de barras */}
      {barcodeImage && (
        <View style={pdfStyles.barcode}>
          <Image src={barcodeImage} />
        </View>
      )}
    </Page>


    <Page size="A4" style={pdfStyles.page}>
      {/* Produtos comprados */}
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.title}>Produtos Comprados</Text>
        <View style={pdfStyles.detailsTable}>
          <View style={[pdfStyles.tableRow, pdfStyles.tableCellHeader]}>
            <Text style={pdfStyles.tableCell2}>Produto</Text>
            <Text style={pdfStyles.tableCell3}>Quantidade</Text>
            <Text style={pdfStyles.tableCell2}>Preço Unitário</Text>
            <Text style={pdfStyles.tableCell2}>Subtotal</Text>
          </View>
          {cartItems.map((item, index) => {
            const precoComDesconto = item.promocao
              ? item.preco * (1 - item.desconto / 100)
              : item.preco;

            return (
              <View key={index} style={pdfStyles.tableRow}>
                <Text style={pdfStyles.tableCell2}>{item.nome}</Text>
                <Text style={pdfStyles.tableCell3}>{item.quantity}</Text>

                <View style={pdfStyles.tableCell4}>
                  {item.promocao && (
                    <Text style={{ textDecoration: 'line-through', marginRight: 5 }}>
                      R$ {item.preco.toFixed(2)}
                    </Text>
                  )}
                  <Text>R$ {precoComDesconto.toFixed(2)}</Text>
                </View>

                <Text style={pdfStyles.tableCell2}>
                  R$ {(precoComDesconto * item.quantity).toFixed(2)}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Valor total */}
      <View style={pdfStyles.totalSection}>
        <Text>
          <Text style={pdfStyles.customerInformations}>Subtotal: </Text>
          <Text>R$ {subtotalCart.toFixed(2)}</Text> {/* Só o nome não será estilizado */}
        </Text>
        <Text>
          <Text style={pdfStyles.customerInformations}>Descontos: </Text>
          <Text>R$ {(subtotalCart - totalCart).toFixed(2)}</Text> {/* Só o nome não será estilizado */}
        </Text>
        <Text>
          <Text style={pdfStyles.customerInformations}>Total: </Text>
          <Text>R$ {totalCart.toFixed(2)}</Text> {/* Só o nome não será estilizado */}
        </Text>
      </View>
    </Page>
  </Document>
);

// Componente principal
const InvoiceComponent = () => {
  const { cartItems, totalCart, subtotalCart } = useContext(ShopContext);
  const purchaseDate = new Date();
  const dueDate = new Date();
  dueDate.setDate(purchaseDate.getDate() + 15);
  const [barcodeImage, setBarcodeImage] = useState("");

  const data = {
    name: "João Silva",
    address: "Rua das Flores, 123",
    purchaseDate: purchaseDate.toLocaleDateString('pt-BR'),
    dueDate: dueDate.toLocaleDateString('pt-BR'),
    subtotal: subtotalCart,
    total: totalCart,
    invoiceNumber: 1354657216476321,
  };

  useEffect(() => {
    // Gera o código de barras quando o componente é montado
    const barcode = generateBarcodeBase64(data.invoiceNumber);
    setBarcodeImage(barcode);
  }, [data.invoiceNumber]);

  return (
    <div className="invoice-container border border-gray-300 p-6 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Fatura</h2>
      <PDFDownloadLink
        document={<InvoicePDF cartItems={cartItems} totalCart={totalCart} subtotalCart={subtotalCart} data={data} barcodeImage={barcodeImage} />}
        fileName={`Fatura_GeneralStore.pdf`}
      >
        {({ loading }) =>
          loading ? (
            <button className="bg-gray-400 text-white px-4 py-2 rounded">Gerando PDF...</button>
          ) : (
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Baixar Fatura em PDF
            </button>
          )
        }
      </PDFDownloadLink>

      {/* Visualizador de PDF */}
      <div style={{ border: "1px solid #ccc", height: "500px" }}>
        <PDFViewer width="100%" height="100%">
          <InvoicePDF cartItems={cartItems} totalCart={totalCart} subtotalCart={subtotalCart} data={data} barcodeImage={barcodeImage} />
        </PDFViewer>
      </div>
    </div>
  );
};

export default InvoiceComponent;

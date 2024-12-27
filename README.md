
---

# Ecommerce - Projeto GrupoTecnoSpeed

Este é um projeto de ecommerce completo desenvolvido durante a **Residência de Software no GrupoTecnoSpeed**, em parceria com a **Softex**.

O sistema é um ecommerce completo, implementado com **React** + **Vite**, utilizando um banco de dados **MongoDB** e integrado com APIs para processamento de pagamentos e emissão de notas fiscais.

## Tecnologias Utilizadas

- **Frontend**:
  - **React**: Framework JavaScript utilizado para a construção da interface do usuário.
  - **Vite**: Build tool que acelera a construção e recarga do projeto.
  - **React Router**: Utilizado para navegação entre páginas no site.
  - **Tailwind CSS**: Framework CSS utilizado para estilização responsiva e rápida.
  
- **Backend**:
  - **API** com **Node.js** (ou outra tecnologia, dependendo da sua implementação backend).
  - **MongoDB**: Banco de dados NoSQL utilizado para armazenar dados do ecommerce.
  
- **Integração de Pagamentos**:
  - **Pix**: Integração com o sistema de pagamentos Pix, utilizado para pagamentos instantâneos.
    - [Documentação do Pix](https://docs.pix.tecnospeed.com.br/#tag/pix/operation/Consultar%20por%20ID%20Pix)
    
- **Emissão de Notas Fiscais**:
  - **PlugNotas API**: API utilizada para a emissão e gestão de notas fiscais eletrônicas.
    - [Documentação do PlugNotas](https://docs.plugnotas.com.br/#tag/NFe/operation/resumNFe)

## Funcionalidades do Ecommerce

1. **Cadastro de Produtos**: Gerenciamento de produtos disponíveis para venda.
2. **Carrinho de Compras**: Sistema para adicionar, remover e modificar a quantidade de produtos no carrinho.
3. **Finalização de Compra**: Integração com o sistema de pagamentos Pix para realizar transações.
4. **Emissão de Notas Fiscais**: Após a finalização da compra, a API da PlugNotas é usada para gerar a nota fiscal eletrônica.

## Como Rodar o Projeto Localmente

### Requisitos

- **Node.js** (versão 16.x ou superior)
- **MongoDB** (local ou utilizando um serviço de hospedagem, como o MongoDB Atlas)
  
### Passo a Passo

1. Clone este repositório:

   ```bash
   git clone https://github.com/Fbgg2k/ecommerce.git
   cd ecommerce
   ```

2. Instale as dependências do frontend:

   ```bash
   cd frontend
   npm install
   ```

3. Inicie o frontend com o Vite:

   ```bash
   npm run dev
   ```

4. Instale as dependências do backend (caso tenha um diretório separado para o backend):

   ```bash
   cd backend
   npm install
   ```

5. Inicie o backend:

   ```bash
   npm start
   ```

6. Acesse o aplicativo no seu navegador em `http://localhost:3000` (ou outra porta configurada).

## Contribuindo

Se você deseja contribuir para o projeto, siga estas etapas:

1. Faça um **fork** deste repositório.
2. Crie uma **branch** para suas alterações (`git checkout -b minha-nova-feature`).
3. Faça as alterações e envie-as (`git commit -am 'Adicionando nova feature'`).
4. Envie suas alterações para o seu repositório forkado (`git push origin minha-nova-feature`).
5. Abra um **pull request**.

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

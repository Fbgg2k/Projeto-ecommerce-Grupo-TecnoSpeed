import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FilterProvider } from "../contexts/FilterContext"; // Import FilterProvider
import ScrollToTop from "../componentes/ScrollToTop";
import { ShopContextProvider } from "../context/shop-context";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Categoria from "../pages/Categoria";
import Carrinho from "../pages/Carrinho";
import Pagamento from "../pages/Pagamento";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Logado from "../pages/Logado";
import { AuthProvider } from "../contexts/AuthProvider"; // Importando AuthProvider
import Busca from "../pages/Busca";



function Router() {
  return (
    <ShopContextProvider>
      <AuthProvider>
        <BrowserRouter>
          <FilterProvider>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Produto/:id" element={<Product />} />
              <Route path="/:categoria" element={<Categoria />} />
              <Route path="/carrinho" element={<Carrinho />} />
              <Route path="/pagamento" element={<Pagamento />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logado" element={<Logado />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/busca" element={<Busca />} />
            </Routes>
          </FilterProvider>
        </BrowserRouter>
      </AuthProvider>
    </ShopContextProvider>
  );
}

export default Router;

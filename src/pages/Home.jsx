import Grid from "../componentes/Grid";
import Ofertas from "../componentes/Ofertas";
import ListaProdutos from "../componentes/ListaProdutos";
import Header from "../componentes/Header";
import Carousel from "../componentes/Carousel";
import CarouselImages from "../componentes/CarouselImages";
import Footer from "../componentes/Footer";
import CadastroFooter from "../componentes/CadastroFooter";
import CopyRight from "../componentes/CopyRight";
import { FilterProvider } from "../contexts/FilterContext"; // Importe o contexto

function Home() {
  return (
    <div>
      <main>
        <Header />
        <Carousel />
        <CarouselImages />
        <div className="p-10">
          <Ofertas />
          <h2 className="text-center text-3xl font-bold mt-20">Lançamentos</h2>
          <FilterProvider>
            <ListaProdutos />
            <Grid />
          </FilterProvider>
        </div>
        <CadastroFooter />
        <Footer />
        <CopyRight />
      </main>
    </div>
  );
}

export default Home;

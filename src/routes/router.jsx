import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import RootLayout from "../pages/RootLayout";
import DetalhesProduto from "../pages/DetalhesProduto";
import RelatorioVendas from "../pages/RelatorioVendas";
import ProdutosVendidos from "../pages/ProdutosVendidos";
import Produtos from "../pages/Produtos";
import Login from "../pages/Login";
import Carrinho from "../pages/Carrinho";
import DadosPessoais from "../pages/DadosPessoais";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "produto/:id/:produto", element: <DetalhesProduto /> },
      { path: "relatorio-de-vendas", element: <RelatorioVendas /> },
      { path: "produtos-vendidos", element: <ProdutosVendidos /> },
      { path: "produtos", element: <Produtos /> },
      { path: "/dados-pessoais", element: <DadosPessoais /> },
      { path: "carrinho", element: <Carrinho /> }
    ],
  },
  { path: "/login", element: <Login /> },
]);

export default router;

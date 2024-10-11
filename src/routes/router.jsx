import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import RootLayout from "../pages/RootLayout";
import DetalhesProduto from "../pages/DetalhesProduto";
import Produtos from "../pages/Produtos";
import Login from "../pages/Login";
import Carrinho from "../pages/Carrinho";
import DadosPessoais from "../pages/DadosPessoais";
import CreateAccount from "../pages/CreateAccount";
import StaticLayout from "../pages/StaticLayout";
import Validation from "../pages/Validation";
import Endereco from "../pages/Endereco";
import Pedidos from "../pages/Pedidos";
import FormasPagamento from "../pages/FormasPagamento";
import Avaliacao from "../pages/Avaliacao";
import Favoritos from "../pages/Favoritos";
import ProdutosOpiniaoPendentes from "../pages/ProdutosOpiniaoPendentes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Validation /> },
      { path: "home", element: <Home /> },
      { path: "produto/:id/:nomeProduto", element: <DetalhesProduto /> },
      { path: "produtos/:produto", element: <Produtos /> },
      { path: "c/:categoria", element: <Produtos /> },
      { path: "minha-conta", element: <DadosPessoais /> },
      { path: "minha-conta/pedidos", element: <Pedidos /> },
      { path: "minha-conta/pedidos/avaliar", element: <ProdutosOpiniaoPendentes /> },
      { path: "carrinho", element: <Carrinho /> },
      { path: "signup", element: <CreateAccount /> },
      { path: "carrinho/endereco", element: <Endereco /> },
      { path: "carrinho/endereco/pagamentos", element: <FormasPagamento /> },
      { path: "favoritos", element: <Favoritos /> },
      { path: "minha-conta/pedidos/avaliacao/:idVendaItem", element: <Avaliacao /> },
    ],
  },
  {
    path: "/static/",
    element: <StaticLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "produto/:vendedor/:id/:nomeProduto/:idVendedor/:idLojista", element: <DetalhesProduto /> },
      { path: "minha-conta", element: <DadosPessoais /> },
      { path: "minha-conta/pedidos", element: <Pedidos /> },
      { path: "carrinho", element: <Carrinho /> },
      { path: "signup", element: <CreateAccount /> },
      { path: "carrinho/endereco", element: <Endereco /> },
      { path: "carrinho/endereco/pagamentos", element: <FormasPagamento /> },
      { path: "favoritos", element: <Favoritos /> },
      { path: "minha-conta/pedidos/avaliacao/:idVendaItem", element: <Avaliacao /> },
    ],
  },
  { path: "/login", element: <Login /> },
]);

export default router;

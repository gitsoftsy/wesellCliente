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

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Validation /> },
      { path: "home", element: <Home /> },
      { path: "produto/:id/:nomeProduto", element: <DetalhesProduto /> },
      { path: "produtos", element: <Produtos /> },
      { path: "minha-conta", element: <DadosPessoais /> },
      { path: "carrinho", element: <Carrinho /> },
      { path: "registro", element: <CreateAccount /> }
    ],
  },
  {
    path: "/static/",
    element: <StaticLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "produto/:vendedor/:id/:nomeProduto/:idVendedor", element: <DetalhesProduto /> },
      { path: "minha-conta", element: <DadosPessoais /> },
      { path: "carrinho", element: <Carrinho /> },
      { path: "registro", element: <CreateAccount /> }
    ],
  },
  { path: "/login", element: <Login /> },
]);

export default router;

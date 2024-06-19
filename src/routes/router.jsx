import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import RootLayout from "../pages/RootLayout";
import DetalhesProduto from "../pages/DetalhesProduto";
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
      { path: "produto/:id", element: <DetalhesProduto /> },
      { path: "produtos", element: <Produtos /> },
      { path: "/minha-conta", element: <DadosPessoais /> },
      { path: "carrinho", element: <Carrinho /> }
    ],
  },
  { path: "/login", element: <Login /> },
]);

export default router;

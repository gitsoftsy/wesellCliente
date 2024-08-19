import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeaderMobile from "../components/HeaderMobile";
import useContexts from "../hooks/useContext";

export default function RootLayout() {

  const {isMobile} = useContexts();

  return (
    <>
      {isMobile ? <HeaderMobile /> : <Header />}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
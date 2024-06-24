import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import StaticHeader from "../components/StaticHeader";

export default function StaticLayout() {
    return (
        <>
            <StaticHeader />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

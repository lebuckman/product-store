import { Outlet } from "react-router";
import Navbar from "./Navbar";

const Layout = () => {
    return (
        <>
            <Navbar />
            <main className="max-w-5xl mx-auto px-4 py-8">
                <Outlet />
            </main>
        </>
    );
};

export default Layout;

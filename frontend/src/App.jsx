import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import CreatePage from "./pages/CreatePage";
import EditProductPage from "./pages/EditProductPage";
import useAuthReq from "./hooks/useAuthReq";
import useUserSync from "./hooks/useUserSync";
import Layout from "./components/Layout";
import ProtectedLayout from "./components/ProtectedLayout";

function App() {
    const { isClerkLoaded } = useAuthReq();
    useUserSync();

    if (!isClerkLoaded) return null;

    return (
        <div className="min-h-screen bg-base-100">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="products/:id" element={<ProductPage />} />

                    <Route element={<ProtectedLayout />}>
                        <Route path="profile" element={<ProfilePage />} />
                        <Route path="create" element={<CreatePage />} />
                        <Route path="edit/:id" element={<EditProductPage />} />
                    </Route>

                </Route>
            </Routes>
        </div>
    );
}

export default App;

import { Link, useNavigate, useParams } from "react-router";
import { useAuth } from "@clerk/clerk-react";
import useProduct from "../hooks/useProduct";
import useUpdateProduct from "../hooks/useUpdateProduct";
import LoadingSpinner from "../components/LoadingSpinner";
import EditProductForm from "../components/EditProductForm";
import ErrorCard from "../components/ErrorCard";

const EditProductPage = () => {
    const { id } = useParams();
    const { userId } = useAuth();
    const navigate = useNavigate();

    const { data: product, isLoading, error } = useProduct(id);
    const updateProduct = useUpdateProduct();

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorCard title={"Failed to load product"} />;
    }

    if (!product || product.userId !== userId) {
        return <ErrorCard title={!product ? "Not found" : "Access denied"} />;
    }

    return (
        <EditProductForm
            product={product}
            isPending={updateProduct.isPending}
            isError={updateProduct.isError}
            onSubmit={(formData) => {
                updateProduct.mutate(
                    { id, ...formData },
                    {
                        onSuccess: () => navigate(`/products/${id}`),
                    }
                );
            }}
        />
    );
};

export default EditProductPage;

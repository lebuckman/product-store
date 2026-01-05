import { useAuth } from "@clerk/clerk-react";
import { useParams, Link, useNavigate } from "react-router";
import useProduct from "../hooks/useProduct";
import useDeleteProduct from "../hooks/useDeleteProduct";
import LoadingSpinner from "../components/LoadingSpinner";
import CommentsSection from "../components/CommentsSection";
import ErrorCard from "../components/ErrorCard";
import {
    ArrowLeftIcon,
    EditIcon,
    Trash2Icon,
    CalendarIcon,
    UserIcon,
} from "lucide-react";

function ProductPage() {
    const { id } = useParams();
    const { userId } = useAuth();
    const navigate = useNavigate();

    const { data: product, isLoading, error } = useProduct(id);
    const deleteProduct = useDeleteProduct();

    const handleDelete = () => {
        if (
            confirm("Are you sure you want to delete this product permanently?")
        ) {
            deleteProduct.mutate(id, { onSuccess: () => navigate("/") });
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error || !product) {
        return <ErrorCard title={"Product not found"} />;
    }

    const isOwner = userId === product.userId;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Back, Edit, Delete Buttons */}
            <div className="flex items-center justify-between">
                <Link to={-1} className="btn btn-ghost btn-sm gap-1">
                    <ArrowLeftIcon className="size-4" /> Back
                </Link>

                {isOwner && (
                    <div className="flex gap-2">
                        <Link
                            to={`/edit/${product.id}`}
                            className="btn btn-ghost btn-sm gap-1"
                        >
                            <EditIcon className="size-4" /> Edit
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="btn btn-error btn-sm gap-1"
                            disabled={deleteProduct.isPending}
                        >
                            {deleteProduct.isPending ? (
                                <span className="loading loading-spinner loading-xs" />
                            ) : (
                                <Trash2Icon className="size-4" />
                            )}
                            Delete
                        </button>
                    </div>
                )}
            </div>

            {/* Product Details */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Image */}
                <div className="card bg-base-300">
                    <figure className="p-4">
                        <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="rounded-xl w-full h-80 object-cover"
                        />
                    </figure>
                </div>

                <div className="card bg-base-300">
                    <div className="card-body">
                        {/* Product Title */}
                        <h1 className="card-title text-2xl">{product.title}</h1>

                        {/* Product Creation Date + Owner Name */}
                        <div className="flex flex-wrap gap-4 text-sm text-base-content/60 my-2">
                            <div className="flex items-center gap-1">
                                <CalendarIcon className="size-4" />
                                {new Date(
                                    product.createdAt
                                ).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                                <UserIcon className="size-4" />
                                {product.user?.name}
                            </div>
                        </div>

                        <div className="divider my-2"></div>

                        {/* Product Description */}
                        <p className="text-base-content/80 leading-relaxed">
                            {product.description}
                        </p>

                        {/* Product Owner Details */}
                        {product.user && (
                            <>
                                <div className="divider my-2"></div>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img
                                                src={product.user.imageUrl}
                                                alt={product.user.name}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-semibold">
                                            {product.user.name}
                                        </p>
                                        <p className="text-xs text-base-content/50">
                                            Creator
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            <div className="card bg-base-300">
                <div className="card-body">
                    <CommentsSection
                        productId={id}
                        comments={product.comments}
                        currentUserId={userId}
                    />
                </div>
            </div>
        </div>
    );
}

export default ProductPage;

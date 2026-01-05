import { useState } from "react";
import { Link, useNavigate } from "react-router";
import useCreateProduct from "../hooks/useCreateProduct";
import {
    ArrowLeftIcon,
    FileTextIcon,
    ImageIcon,
    SparklesIcon,
    TypeIcon,
} from "lucide-react";

const CreatePage = () => {
    const navigate = useNavigate();
    const createProduct = useCreateProduct();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        imageUrl: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct.mutate(formData, {
            onSuccess: () => navigate("/"),
        });
    };

    return (
        <div className="max-w-lg mx-auto">
            <Link to={-1} className="btn btn-ghost btn-sm gap-1 mb-4">
                <ArrowLeftIcon className="size-4" /> Back
            </Link>

            <div className="card bg-base-300">
                <div className="card-body">
                    <h1 className="card-title">
                        <SparklesIcon className="size-5 text-primary" />
                        New Product
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        {/* Title Input */}
                        <label className="input input-bordered flex items-center gap-2 bg-base-200 w-full">
                            <TypeIcon className="size-4 text-base-content/50" />
                            <input
                                type="text"
                                placeholder="Product title"
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        title: e.target.value,
                                    })
                                }
                                required
                            />
                        </label>

                        {/* ImageUrl Input */}
                        <label className="input input-bordered flex items-center gap-2 bg-base-200 w-full">
                            <ImageIcon className="size-4 text-base-content/50" />
                            <input
                                type="url"
                                placeholder="Image URL"
                                value={formData.imageUrl}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        imageUrl: e.target.value,
                                    })
                                }
                                required
                            />
                        </label>

                        {formData.imageUrl && (
                            <div className="rounded-box overflow-hidden">
                                <img
                                    src={formData.imageUrl}
                                    alt="Preview"
                                    className="w-full h-60 object-cover"
                                    onError={(e) =>
                                        (e.target.style.display = "none")
                                    }
                                />
                            </div>
                        )}

                        {/* Description Input */}
                        <div className="form-control">
                            <div className="textarea input-bordered flex items-start gap-2 p-3 rounded-box bg-base-200 w-full">
                                <FileTextIcon className="size-4 text-base-content/50 mt-0.5" />
                                <textarea
                                    placeholder="Description"
                                    className="grow bg-transparent resize-none focus:outline-none min-h-24"
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            description: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                        </div>

                        {createProduct.isError && (
                            <div
                                role="alert"
                                className="alert alert-error alert-sm"
                            >
                                <span>Failed to create. Try again.</span>
                            </div>
                        )}

                        {/* Form Submit */}
                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={createProduct.isPending}
                        >
                            {createProduct.isPending ? (
                                <span className="loading loading-spinner" />
                            ) : (
                                "Create Product"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;

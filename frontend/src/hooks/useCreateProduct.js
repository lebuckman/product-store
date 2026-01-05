import { useMutation } from "@tanstack/react-query";
import { createProduct } from "../lib/api";

function useCreateProduct() {
    const result = useMutation({ mutationFn: createProduct });
    return result;
}

export default useCreateProduct;

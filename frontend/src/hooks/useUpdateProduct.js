import { useMutation } from "@tanstack/react-query";
import { updateProduct } from "../lib/api";

function useUpdateProduct() {
    return useMutation({
        mutationFn: updateProduct,
    });
}

export default useUpdateProduct;

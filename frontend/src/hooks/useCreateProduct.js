import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../lib/api";

function useCreateProduct() {
    const queryClient = useQueryClient();
    const result = useMutation({
        mutationFn: createProduct,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["products"] }),
    });
    return result;
}

export default useCreateProduct;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../lib/api";

function useDeleteProduct() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myProducts"] });
        },
    });
}

export default useDeleteProduct;

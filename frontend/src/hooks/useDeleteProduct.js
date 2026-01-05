import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../lib/api";

function useDeleteProduct() {
    const queryClient = useQueryClient();
    const result = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myProducts"] });
        },
    });
    return result;
}

export default useDeleteProduct;

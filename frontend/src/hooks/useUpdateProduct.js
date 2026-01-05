import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../lib/api";

function useUpdateProduct() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateProduct,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({
                queryKey: ["product", variables.id],
            });
            queryClient.invalidateQueries({ queryKey: ["myProducts"] });
        },
    });
}

export default useUpdateProduct;

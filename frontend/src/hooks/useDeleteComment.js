import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../lib/api";

const useDeleteComment = (productId) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteComment,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["product", productId],
            });
        },
    });
};

export default useDeleteComment;

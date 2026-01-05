import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../lib/api";

const useDeleteComment = (productId) => {
    const queryClient = useQueryClient();
    const result = useMutation({
        mutationFn: deleteComment,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["product", productId],
            });
        },
    });
    return result;
};

export default useDeleteComment;

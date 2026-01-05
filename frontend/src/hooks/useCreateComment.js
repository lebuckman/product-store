import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../lib/api";

const useCreateComment = () => {
    const queryClient = useQueryClient();
    const result = useMutation({
        mutationFn: createComment,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["product", variables.productId],
            });
        },
    });
    return result;
};

export default useCreateComment;

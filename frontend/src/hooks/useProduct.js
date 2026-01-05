import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../lib/api";

function useProduct(id) {
    return useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductById(id),
        enabled: !!id,
    });
}

export default useProduct;

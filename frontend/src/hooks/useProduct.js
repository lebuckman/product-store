import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../lib/api";

function useProduct(id) {
    const result = useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductById(id),
        enabled: !!id,
    });
    return result;
}

export default useProduct;

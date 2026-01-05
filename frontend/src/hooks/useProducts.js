import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../lib/api";

function useProducts() {
    return useQuery({
        queryKey: ["products"],
        queryFn: getAllProducts,
    });
}

export default useProducts;

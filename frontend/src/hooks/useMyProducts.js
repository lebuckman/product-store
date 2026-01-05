import { useQuery } from "@tanstack/react-query";
import { getMyProducts } from "../lib/api";

function useMyProducts() {
    return useQuery({
        queryKey: ["myProducts"],
        queryFn: getMyProducts,
    });
}

export default useMyProducts;

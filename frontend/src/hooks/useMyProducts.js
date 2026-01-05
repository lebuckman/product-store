import { useQuery } from "@tanstack/react-query";
import { getMyProducts } from "../lib/api";

function useMyProducts() {
    const result = useQuery({
        queryKey: ["myProducts"],
        queryFn: getMyProducts,
    });
    return result;
}

export default useMyProducts;

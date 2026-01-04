import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { syncUser } from "../lib/api";

// video note: a better but more advanced implementation uses webhooks

function useUserSync() {
    const { isSignedIn } = useAuth();
    const { user } = useUser();

    const {
        mutate: syncUserMutation,
        isPending,
        isSuccess,
        isError,
    } = useMutation({
        mutationFn: syncUser,
        onError: (error) => {
            console.error("Failed to sync user:", error);
        },
    });

    useEffect(() => {
        if (isSignedIn && user && !isPending && !isSuccess && !isError) {
            syncUserMutation({
                email: user.primaryEmailAddress?.emailAddress,
                name: user.fullName || user.firstName,
                imageUrl: user.imageUrl,
            });
        }
    }, [isSignedIn, user, isPending, isSuccess, isError]);

    return { isSynced: isSuccess };
}

export default useUserSync;

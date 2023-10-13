import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useGetTodos = () => {
    const { data: session } = useSession();
    const userData: any = session?.user;
    const userID = userData.id;
    const queryProps = useQuery({
        queryKey: [userID],
        queryFn: async () => {
            const res = await api.get(`/user/get_todos/${userID}`);
            return res.data;
        },
        onError(err: string) {
          throw new Error(err);
        },
        refetchOnWindowFocus: false
    });

    return { ...queryProps };
}
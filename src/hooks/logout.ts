import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { logoutUserFn } from "../data/api/authApi";
import { authStore } from "../data/store";

export default function useLogout() {
  const { logout } = authStore();
  const router = useRouter();
  const { mutate: logOut } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutUserFn,
    onSuccess: async (data) => {
      logout();
      await router.push("/");
      toast.success(data.message);
    },
    onError: async () => {
      logout();
      await router.push("/");
    },
  });
  return logOut;
}

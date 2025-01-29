import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../../API/User";
import { Loader } from "../Loader";
import { AuthForm } from "../AuthForm";
import { NoteForm } from "../NoteForm";
import { queryClient } from "../../API/QueryClient";

export const Account = () => {
  const meQuery = useQuery({
    queryFn: () => fetchMe(),
    queryKey: ["users", "me"],
  },queryClient);

  switch (meQuery.status) {
    case "pending":
      return <Loader />;
    case "error":
      return <AuthForm />;
    case "success":
      return <NoteForm />;
  }
};

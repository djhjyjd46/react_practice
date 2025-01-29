import "./LoginForm.css";
import { FormField } from "../FormField";
import { Button } from "../Button";
import { login } from "../../API/User";
import { FormEventHandler, useState } from "react";
import { queryClient } from "../../API/QueryClient";
import { useMutation } from "@tanstack/react-query";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation(
    {
      mutationFn: () => login(email, password),
      onSuccess() {
        queryClient.invalidateQueries({queryKey:['users','me']})
      },
    },
    queryClient
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    loginMutation.mutate();
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <FormField label="Email">
        <input
          type="email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
      </FormField>
      <FormField label="Пароль">
        <input
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
      </FormField>
      <Button type="submit" isLoading={loginMutation.isPending}>
        Войти
      </Button>
    </form>
  );
};

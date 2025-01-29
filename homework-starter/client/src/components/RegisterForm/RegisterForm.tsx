import { FormField } from "../FormField";
import { Button } from "../Button";
import { FormEventHandler, useState } from "react";
import "./RegisterForm.css";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../API/User";
import { queryClient } from "../../API/QueryClient";

export const RegisterForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
 
  const registerMutation = useMutation(
    {
      mutationFn:()=>registerUser(username,email,password)
    },queryClient
  )

   const handleSubmit:FormEventHandler<HTMLFormElement> = (event)=>{
    event.preventDefault()

    registerMutation.mutate()
  }
  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <FormField label="Имя">
        <input
        onChange={(event)=>setUsername(event.target.value)}
        value={username}
        />
      </FormField>
      <FormField label="Email">
        <input
        onChange={(event)=>setEmail(event.target.value)}
        value={email} />
      </FormField>
      <FormField label="Пароль">
        <input
        onChange={(event)=>setPassword(event.target.value)} 
        value={password}
        type="password" />
      </FormField>
      <Button type="submit" isLoading={registerMutation.isPending}>Зарегистрироваться</Button>
    </form>
  );
};

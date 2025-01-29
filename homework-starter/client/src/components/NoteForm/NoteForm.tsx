import { FormField } from "../FormField";
import { Button } from "../Button";
import "./NoteForm.css";
import { createNote } from "../../API/Post";
import { queryClient } from "../../API/QueryClient";
import { useMutation } from "@tanstack/react-query";
import { FC, FormEventHandler, useState } from "react";

export interface IPostFromPops{}

export const NoteForm: FC<IPostFromPops> = () => {
  const [title,setTitle]=useState('')
  const [text,setText]=useState('')
  
  const handleSubmit:FormEventHandler<HTMLFormElement> = (e)=>{
    e.preventDefault()
    createNoteMutation.mutate()
  }

  const createNoteMutation = useMutation({
    mutationFn: () => createNote(title,text)
  },queryClient)

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <FormField label="Заголовок">
        <input type="text"
        onChange={(event)=>setTitle(event.target.value)}
        value={title}
        />
      </FormField>
      <FormField label="Текст">
        <textarea
        onChange={(event)=>setText(event.target.value)}
        value={text} />
      </FormField>
      <Button isLoading={createNoteMutation.isPending}>Сохранить</Button>
    </form>
  );
};

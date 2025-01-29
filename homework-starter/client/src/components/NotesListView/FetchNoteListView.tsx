import { usePostList } from "../../API/Post";
import { Loader } from "../Loader";
import { NoteListView } from "./NotesListView";


export const FetchNoteList = () => {
  const { state, reFetch } = usePostList();

  switch (state.status) {
    case "idle":
    case "pending":
      return <Loader />;
    case "success":
      return <NoteListView postList={state.data} />;
    case "error":
      return (
        <div>
          <span>произошла ошибка</span>
          <button onClick={reFetch}></button>
        </div>
      );
  }
};

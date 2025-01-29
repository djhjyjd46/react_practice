import { QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { Account } from "./components/Account/account";
import { AuthForm } from "./components/AuthForm";
import { queryClient } from "./API/QueryClient";
import { FetchNoteList } from "./components/NotesListView/FetchNoteListView";

function App() {
  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <FetchNoteList/>
        <Account />
        <AuthForm />
              </QueryClientProvider>
    </div>
  );
}

export default App;

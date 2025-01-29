import { FC } from "react";
import "./NotesListView.css";
import { PostList } from "../../API/Post";
import { NoteView } from "../NoteView";


export interface PostListVievProps {
  postList: PostList;
}

export const NoteListView: FC<PostListVievProps> = ({ postList }) => {
  return (
    <ul className="note-list-view">
      {postList.map((post) => (
        <li key={post.id}>
          <NoteView post={post} />
        </li>
      ))}
    </ul>
  );
};



// import "./NotesListView.css";
// import { NoteView } from "../NoteView";

// export const NotesListView = () => {
//   return (
//     <ul className="note-list-view">
//       <li>
//         <NoteView />
//       </li>
//       <li>
//         <NoteView />
//       </li>
//       <li>
//         <NoteView />
//       </li>
//       <li>
//         <NoteView />
//       </li>
//       <li>
//         <NoteView />
//       </li>
//       <li>
//         <NoteView />
//       </li>
//     </ul>
//   );
// };

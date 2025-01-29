import { FC } from "react";
import { Post } from "../../API/Post.ts";
import "./NoteView.css";


export interface NoteViewProps {
  post: Post;
}
export const NoteView: FC<NoteViewProps> = ({ post }) => {
  return (
    <div className="note-view">
    <div className="note-view__head">
       <p className="note-view__datetime">{formatDate(Date.now())}</p>
        <p className="note-view__title" >{post.title}</p>
      </div>

      <p className="note-view__text">
        {post.text.repeat(10)}
      </p>
    </div>
  );
};


const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};


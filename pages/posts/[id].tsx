import { Post } from "@/lib/types";
import { useRouter } from "next/router";
import { FormEventHandler, useRef, useState } from "react";

interface ShowProps {
  post: Post;
  url: string;
}

function Show(props: ShowProps) {
  const router = useRouter();

  const [title, setTitle] = useState(props.post.title);
  const [content, setContent] = useState(props.post.content);

  let changeTitle = (event: any) => setTitle(event.target.value);
  let changeContent = (event: any) => setContent(event.target.value);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const post: Omit<Post, "_id"> = {
        title,
        content
    }
    await fetch(props.url + "/post/" + props.post._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }); 

    router.push("/");
  };

  const handleDelete = async () => {
    await fetch(props.url + "/post/" + props.post._id, {
      method: "delete",
    });
    //push user back to main page after deleting
    router.push("/");
  };

  return (
    <div className="container">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
        crossOrigin="anonymous"
      ></link>

      <form onSubmit={handleSubmit} className="form-group">
        <label>Title</label>
        <input
          type="text"
          className="form-control"
          onChange={changeTitle}
          value={title}
        ></input>
        <label>Content</label>
        <input
          type="text"
          className="form-control"
          onChange={changeContent}
          value={content}
        ></input>
        <input
          onChange={changeContent}
          type="submit"
          className="btn btn-primary"
          value="save post"
        ></input>
      </form>
      <button onClick={handleDelete} className="btn btn-light">
        Delete
      </button>
    </div>
  );
}

// Define Server Side Props
export async function getServerSideProps(context: any) {
  const res = await fetch(process.env.API_URL + "/post/" + context.query.id);
  const post = await res.json();

  return { props: { post, url: process.env.API_URL } };
}

export default Show;

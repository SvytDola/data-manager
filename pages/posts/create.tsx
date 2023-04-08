import { useRouter } from "next/router";
import { FormEvent, FormEventHandler, useRef } from "react";
import absoluteUrl from "next-absolute-url";
import { Post } from "@/lib/types";
import { NextPageContext } from "next";

// Define props
interface CreateProps {
  url: string;
}

// Define Component
function Create(props: CreateProps) {
  const router = useRouter();

  const title = useRef<HTMLInputElement>(null);
  const content = useRef<HTMLInputElement>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    let post: Omit<Post, "_id"> = {
      content: "",
      title: "",
    };
    if (title.current !== null && content.current !== null) {
      post = { content: content.current.value, title: title.current.value };
    }

    await fetch(props.url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

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
        <input type="text" className="form-control" ref={title}></input>
        <label>Content</label>
        <input type="text" className="form-control" ref={content}></input>
        <input type="submit"  className="btn btn-primary" value="create post"></input>
      </form>
      
    </div>
  );
}

export async function getStaticProps(context: NextPageContext) {
  return {
    props: {
      url: process.env.API_URL + "/post",
    },
  };
}

// export component
export default Create;

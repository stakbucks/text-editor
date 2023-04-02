import { baseApi } from "./instance";

export interface IPost {
  _id?: String;
  title: String;
  content: String;
  date: Date;
}

export const getAllPosts = () =>
  baseApi.get("all-posts").then((res) => res.data);
export const createPost = ({ title, content, date }: IPost) =>
  baseApi.post("create-post", {
    title,
    content,
    date,
  });
export const getPost = (_id: String) => baseApi.get(`post/${_id}`);
export const deleteAllPosts = () => baseApi.delete("delete-all");

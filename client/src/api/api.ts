import { baseApi } from "./instance";
export const getAllPosts = () => baseApi.get("/all-posts");

// export const signupPost = (signupForm: ISignupForm) =>
//   baseApi.post(SIGNUP_URI, {
//     userName: signupForm.name,
//     userId: signupForm.id,
//     password: signupForm.password,
//     userEmail: signupForm.email,
//   });

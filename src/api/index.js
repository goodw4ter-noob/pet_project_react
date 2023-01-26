import { createNewPostAJAX, deletePostAJAX, getPostsAJAX, mutatePostAJAX } from "./posts"
import { getAuthorizedUserAJAX, getUserDataAJAX, getUsersAJAX, mutateUserAJAX } from "./users"

export const api = {
    users: { getUsersAJAX, getUserDataAJAX, getAuthorizedUserAJAX, mutateUserAJAX },
    posts: { getPostsAJAX, deletePostAJAX, mutatePostAJAX, createNewPostAJAX},
}
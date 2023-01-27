import { getMessagesAJAX } from "./messages"
import { createNewPostAJAX, deletePostAJAX, getPostsAJAX, mutatePostAJAX } from "./posts"
import { getAuthorizedUserAJAX, getFriendAJAX, getUserDataAJAX, getUsersAJAX, mutateUserAJAX } from "./users"

export const api = {
    users: { getUsersAJAX, getUserDataAJAX, getAuthorizedUserAJAX, mutateUserAJAX, getFriendAJAX },
    posts: { getPostsAJAX, deletePostAJAX, mutatePostAJAX, createNewPostAJAX},
    messages: { getMessagesAJAX },
}
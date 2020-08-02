// export const URL = "http://127.0.0.1:8000";
// export const URL = "http://192.168.43.201:8000";
export const URL = "https://harsh9671.pythonanywhere.com";

const apiURL ='/api';

export const endpoint =`${URL}${apiURL}`;

export const postListURL =  `${endpoint}/post-list`;
export const postLostURL =  `${endpoint}/post-create`;
export const userProfileURL =  `${endpoint}/userprofile`;
export const userPostsURL =  `${endpoint}/userposts`;
export const postDetailURL = (id) =>  `${endpoint}/post/${id}`;
export const postContactURL =   `${endpoint}/post-contact`;

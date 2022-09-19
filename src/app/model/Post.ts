import { Comment } from "./Comment";

export interface Post{
    uuid?: string;
    text?: string;
    likesCount?: number;
    dislikesCount?: number;
    showComments: boolean ;
    comments?: Comment[];
}
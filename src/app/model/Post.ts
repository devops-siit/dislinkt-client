import { Comment } from "./Comment";

export class Post{
    uuid?: string;
    text?: string;
    likesCount?: number;
    dislikesCount?: number;
    comments?: Comment[];
}
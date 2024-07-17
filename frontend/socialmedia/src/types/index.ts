export interface Post {
    _id: string;
    title: string;
    content: string;
    author: string;
    titleColor: string;
    createdAt: string;
    commentCount?: number;
  }
  
  export interface Comment {
    _id: string;
    content: string;
    author: string;
    createdAt: string;
  }
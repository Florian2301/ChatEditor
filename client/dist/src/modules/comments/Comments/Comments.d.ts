/// <reference types="react" />
import './Comments.css';
declare const CommentsComponent: (props: {
    author: boolean;
    commentRef: any;
    name: string;
    date: string;
    text: string;
    id: string;
}) => JSX.Element;
export default CommentsComponent;

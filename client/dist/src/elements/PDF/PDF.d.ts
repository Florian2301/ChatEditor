/// <reference types="react" />
import { Messages } from '../../redux/interfaces/interfaces';
declare const PDF: (props: {
    title: string;
    data: Messages[];
    author: string;
    date: string;
}) => JSX.Element;
export default PDF;

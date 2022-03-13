import {Response} from 'express';
import { ObjectId } from 'mongoose';

//---------------- General -------------------------------------------
export interface Philosopher {
  name: string,
  color: string
}

export interface Messages {
  _id?: string
  messagenumber: number,
          name: string,
          text: string,
          time?: string,
          color: string,
          position: number,
          tags?: string[],
          repliedmessage?: string[]
}

interface Comments {
    name: string,
    date: string,
    text: string,
    author: boolean,
} 


// --------------- Draft -------------------------------------------

interface Draft {
  _id: ObjectId, 
  userId: string,
  user: string;
  admin: boolean,
  title: string,
  author: string,
  published: boolean,
  date: string,
  language: string,
  tags: string[],
  description: string,
  philosopher: Philosopher[],
  colors: string[],
  messages: Messages[],
}

// ---------------- Title --------------------------------------------------

interface Title {
  _id: ObjectId,
  chatId: string,
  admin: boolean,
  userId: string,
  user: string,
  chatnumber: number,
  title: string,
  author: string,
  date: string,
  language: string,
  tags: string[],
  description: string
}

//------------- Chats ---------------------------------------------

interface Chat {
  _id: ObjectId;
  admin: boolean;
  userId: string;
  user: string;
  chatnumber: number;
  title: string;
  titleId: string;
  author: string;
  date: string;
  language: string;
  tags: string[];
  description: string;
  philosopher: Philosopher[];
  messages: Messages[];
  comments: Comments[]
}

// ----------------- User ----------------------------

interface User {
  _id: string,
  username: string,
  email: string,
  admin: boolean,
  date: string,
}

// ------------- Response ---------------------------

export interface TitleResponse extends Response {
  title?: Title;
}

export interface ChatResponse extends Response {
  chat?: Chat
}

export interface DraftResponse extends Response {
  draft?: Draft
}

export interface UserResponse extends Response {
  user?: User
}

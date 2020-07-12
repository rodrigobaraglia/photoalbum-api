import { Document } from "mongoose";
import {Request } from "express";


export type Entity = IPhoto | IUser | IAlbum | IComment

export type Factory = ((data:Request) => Entity) | Model<IPhoto, {}>

interface IFactory {
  (data:Request):Entity
}
export interface IPhoto extends Document {
  title: string;
  description: string;
  path: string;
}

export interface IUser extends Document {
  name: string;
  album: IAlbum;
  posts: Array<IComment>
}


export interface IAlbum extends Document {
  user: IUser;
  [key: string]: IPhoto;
}

export interface IComment extends Document {
  authot: string;
  text: string;
  date: date;
  likes: number;
  comments: Array<IComment>
}
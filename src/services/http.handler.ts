import {db} from "../database"
import { handleRequest } from "./request.handler";
import {IResponseHandler} from "./declarations";

const post: IResponseHandler = handleRequest(db.insertDocument);
const get: IResponseHandler = handleRequest(db.getDocuments);

export const HTTPHandler = {post, get}
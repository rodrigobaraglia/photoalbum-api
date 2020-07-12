import { createDocument, getDocuments } from "../../services";
import { handleService } from "./genericHandler";
import {IResponseHandler} from "./declarations";

export const postHandler: IResponseHandler = handleService(createDocument);
export const getHandler: IResponseHandler = handleService(getDocuments);

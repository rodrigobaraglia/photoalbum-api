import { createDocument, getDocuments } from "../../services";
import { handleRequest } from "./genericHandler";

export const postHandler = handleRequest(createDocument);
export const getHandler = handleRequest(getDocuments);

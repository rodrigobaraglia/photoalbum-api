import { createDocument, getDocuments } from "../../services";
import { handleService } from "./genericHandler";

export const postHandler = handleService(createDocument);
export const getHandler = handleService(getDocuments);

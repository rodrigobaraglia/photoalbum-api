import { postHandler, getHandler, IRequestHandler } from "../generic";
import { message } from "../../services";
import {user}  from "../../models";

export const createUserHandler: IRequestHandler = postHandler(
    user.createUser,
    message.confirmPhotoSaved
  );
  
  export const getUsersHandler: IRequestHandler = getHandler(
    user.User,
    message.confirmShowingPhotos
  );
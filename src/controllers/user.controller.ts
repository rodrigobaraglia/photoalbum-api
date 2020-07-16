import { HTTPHandler as http, IRequestHandler } from "../services";
import { confirmUserSaved, confirmShowingUser } from "../messages";
import {user}  from "../models";

export const createUserHandler: IRequestHandler = http.post(
    user.factory,
    confirmUserSaved
  );
  
  export const getUsersHandler: IRequestHandler = http.get(
    user.Model,
    confirmShowingUser
  );
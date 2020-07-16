import {Request} from "express";
import {IValidationResults} from "../validation";
import {IAlbum, IComment, IPhoto, IUser} from "../models";

export function bodyPropsError(props: string[], body: Request) {
    return console.log(
      "ERROR: body of request doesn't match requiered properties:\n",
      {
        body: { ...body },
        required_props: props,
      }
    );
  }
  
// export function photoPropsError(photo: IValidationResults<IPhoto>) {
//     return console.log("Error: Photo has missing props \n", {
//       photo: photo.item,
//       required_props: photo.props,
//     });
//   }
// export function userPropsError(user: IValidationResults<IUser>) {
//   return console.log("Error: Photo has missing props \n", {
//     photo: user.item,
//     required_props: user.props,
//   });
// }
export function documentPropsError<T>(doc: IValidationResults<T>) {
  return console.log("Error: Photo has missing props \n", {
    photo: doc.item,
    required_props: doc.props,
  });
}
  
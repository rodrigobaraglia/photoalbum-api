import { Request, Response } from "express";
import { postHandler, getHandler } from "./generics";
import { confirmPhotoSaved, confirmShowingPhotos } from "./res.messages";
import { Photo, createPhoto } from "../models/Photo";

// export async function createPhoto(
//   req: Request,
//   res: Response
// ): Promise<Response> {
//   const { title, description } = req.body;
//   const photo = {
//     title,
//     description,
//     imagePath: req.file.path,
//   };
//   const photoDocument = new Photo(photo);
//   await photoDocument.save();
//   return res.json(confirmPhotoSaved({ photo: photo }));
// }

// export const createPhotoHandler = (req: Request, res: Response) => {
//   const doc = createPhoto(req);
//   save(doc);
//   respond(res, confirmPhotoSaved({ photo: doc }));
// }

// function handlePost(req: Request, res: Response, factory: any, message: any) {
//     const doc = factory(req)
//     save(doc)
//     respond(res, message({ data: doc }));
// }

// const postHandler = (factory: any, message: any) => (
//   req: Request,
//   res: Response
// ) => respond(res, message({ data: createDocument(factory, req) }));

// const createDocument = (factory: any, req: Request) => {
//   const doc = factory(req);
//   save(doc);
//   return doc;
// };
// const handleRequest = (handler: any) => (req: Request, res: Response) => handler(req, res)

export const createPhotoHandler = postHandler(createPhoto, confirmPhotoSaved);

export const getPhotosHandler = getHandler(Photo, confirmShowingPhotos);

// export const getPhotosHandler = async (req: Request, res: Response) =>
//  respond(res, confirmShowingPhotos({data: await getPhoto()}));
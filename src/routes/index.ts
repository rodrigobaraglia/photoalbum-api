import { Router } from "express";
import * as path from "./constants";
import { handleTestRoute } from "../controllers";
import multer from "../libs/multer";
import * as controller from "../controllers";

const router = Router();

router.route(path.TEST).get(handleTestRoute);
router
  .route(path.PHOTOS)
  .get(controller.getPhotosHandler)
  .post(multer.single("image"), controller.createPhotoHandler);
router.route(path.PHOTO_BY_ID).get(controller.getPhotosHandler);
router
  .route(path.USERS)
  .get(controller.getUsersHandler)
  .post(multer.single("avatar"),controller.createUserHandler);
router.route(path.USER_PHOTOS);
router.route(path.USER_PHOTO_BY_ID);
router.route(path.USER_POSTS);
router.route(path.USER_POST_BY_ID);

export default router;

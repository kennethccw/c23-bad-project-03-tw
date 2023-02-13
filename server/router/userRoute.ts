// handle routes
import express from "express";
// import { UserController } from "../controllers/UserController";
// import { UserService } from "../services/UserService";
// import { knex } from "../main";
import { userController } from "../routes";
import { uploadMiddleware } from "../utils/formidable";

export const userRoutes = express.Router();

console.log("hi2");
userRoutes.post("/register", uploadMiddleware, userController.register);
userRoutes.get("/register", userController.inputEmailAfterGoogle);
userRoutes.post("/login", userController.login);
userRoutes.get("/login/google", userController.loginGoogle);
userRoutes.get("/logout", userController.logout);
userRoutes.get("/profile", userController.getProfile);
userRoutes.put("/updateProfile", uploadMiddleware, userController.putUpdateProfile);
// userRoutes.post(postLogin);


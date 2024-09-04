import { Router } from "express";
const route = Router();
import { deletePassword, editPassword, getPassword, loginUser, registerUser, savePassword } from "../controllers/userController";

  route.post("/register",registerUser);
  route.post("/login",loginUser);
  route.post("/save-password",savePassword);
  route.get("/get-passwords",getPassword);
  route.put("/edit-password",editPassword);
  route.delete("/delete-password/:id",deletePassword);

export default route;
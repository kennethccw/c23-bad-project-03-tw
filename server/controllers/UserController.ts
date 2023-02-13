// routes' fuction

import type { Request, Response } from "express";
import type { User } from "../utils/model";
import { UserService } from "../services/UserService";
import { checkPassword, hashPassword } from "../utils/hash";
import formidable from "formidable";
import fetch from 'cross-fetch'; 

export class UserController {
  constructor(private userService: UserService) { }
  //@ts-ignore

  inputEmailAfterGoogle = async (req: Request, res: Response) => {
    if (req.session.user) {
      const email = req.session.user.email
      res.status(200).json(email)
      return
    } 
    // console.log(email)
    res.status(200).json(null)
  }

  loginGoogle = async (req: Request, res: Response) => {
    const accessToken = req.session?.['grant'].response.access_token;
    const fetchRes = await fetch(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        method:"get",
        headers:{ Authorization:`Bearer ${accessToken}` },
      }
    );
    const data = await fetchRes.json();
    console.log(data);
    console.log(data.email)
    const user = await this.userService.loginWithGoogle(data.email)
    console.log(user)
    if (!user) {
      console.log(data.email)
      req.session.user = {id: null, username: null , email: data.email}
      res.redirect('/register.html')
      return
    } else {
      const {id, username} = await this.userService.loginWithGoogle(data.email)
      req.session.user = {id, username, email: data.email}
      console.log(req.session.user)
      res.status(200).redirect('/intro.html');
    }
  }

  login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ message: "invalid username or password" });
      return;
    }

    const user = await this.userService.checkLogin(username);
    // console.log("hi");
    if (!user) {
      res.status(400).json({ message: "invalid username" });
      return;
    }
    // console.log(user.password, "check hashed pw");

    const isPWCorrect = await checkPassword(password, user.password);
    // console.log("checkPW", isPWCorrect);
    if (!isPWCorrect) {
      res.status(400).json({ message: "invalid password" });
      return;
    }
    req.session.user = { id: user.id, username: user.username };
    
    console.log(req.session["user"]);
    res.status(200).json({ message: "success" });
  };

  //   function postLogin(req: Request, res: Response) {
  //   const { username, password } = req.body;
  // }
  register = async (req: Request, res: Response) => {
    // console.log(req.form.fields);
    // console.log(req.form.files);
    const username = req.form.fields.username as string;
    const email = req.form.fields.email as string;
    const password = req.form.fields.password as string;
    const age = parseInt(req.form.fields.age as string) as number;
    const medical_record = req.form.fields.medical_record as string;
    const file = req.form.files;
    const imageFile = (file["image"] as formidable.File)?.newFilename;
    let image = undefined;
    if (imageFile) {
      image = `/uploads/${imageFile}`;
    }
    const user: User = { username, email, password, age, medical_record, image };

    if (!user) {
      res.status(400).json({ message: "cannot identify user" });
      return;
    }
    user.password = await hashPassword(user.password);
    const err = await this.userService.register(user);

    if (err) {
      res.status(400).json({ message: "user exist" });
      return;
    }

    res.status(201).json({ message: "successful" });
  };

  getProfile = async (req: Request, res: Response) => {
    const uid = req.session.user.id as number ;
    const userProfile = await this.userService.getProfile(uid);
    res.status(200).json(userProfile);
  };

  putUpdateProfile = async (req: Request, res: Response) => {
    const username = req.form.fields.username as string;
    const email = req.form.fields.email as string;
    const password = req.form.fields.password as string;
    const age = parseInt(req.form.fields.age as string) as number;
    const medical_record = req.form.fields.medical_record as string;
    const file = req.form.files;
    const imageFile = (file["image"] as formidable.File)?.newFilename;
    let image = undefined;
    if (imageFile) {
      image = `/uploads/${imageFile}`;
    }
    const user: User = { username, email, password, age, medical_record, image };
    const uid = req.session.user.id as number;
    const updatedprofile = await this.userService.putUpdateProfile(uid, user);
    if (!user) {
      res.status(400).json({ message: "cannot identify user" });
      return;
    } else
    res.status(200).json(updatedprofile);
  }
  logout = async (req: Request, res: Response) => {
    req.session.user = {id : null, username : null, email: null}
    console.log(req.session.user)
    res.status(200).json("you have logged out")
  }
}
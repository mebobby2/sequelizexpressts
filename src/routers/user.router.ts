import { Router } from "express";
import { matchedData } from "express-validator/filter";
import { validationResult } from "express-validator/check";
import { userRules } from "../rules/user.rules";
import { UserService } from "../services/user.service";
import { UserAttributes } from "../models/user";

export const userRouter = Router();
const userService = new UserService();

userRouter.post("/register", userRules["forRegister"], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(422).json(errors.array());

  const payload = matchedData(req) as UserAttributes;
  const user = userService.register(payload);

  return user.then(u => res.json(u));
});

userRouter.post("/login", userRules["forLogin"], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(422).json(errors.array());

  const payload = matchedData(req) as UserAttributes;
  const token = userService.login(payload);

  return token.then(t => res.json(t));
});

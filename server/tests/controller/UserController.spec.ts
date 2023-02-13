import { UserController } from "../../controllers/UserController";
import { UserService } from "../../services/UserService";
import type { Request, Response } from "express";
import { InvalidLoginError } from "./../../utils/error";
import { getMockRequest, getMockResponse } from "./utils";
import { hashPassword } from "../../utils/hash";

jest.mock("../../services/UserService");

describe("UserController Test Case", () => {
  let controller: UserController;
  let service: UserService;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    service = new UserService({} as any);
    service.checkLogin = jest.fn(async () =>
      Promise.resolve({ id: 1, username: "jason", password: await hashPassword("1234") })
    );
    req = getMockRequest();
    res = getMockResponse();

    controller = new UserController(service);
  });

  it("Login should be success", async () => {
    // Stage 1 - Prepare TestCase
    const inputUsername = "jason";
    const inputPassword = "1234";
    req.body = { username: inputUsername, password: inputPassword };

    // Stage 2 - Execute Test Subject
    await controller.login(req, res);

    // Stage 3 - Verification
    expect(service.checkLogin).toBeCalledWith(inputUsername);
    expect(req.session['user']).toEqual({ id: 1, username: 'jason'});
    expect(res.json).lastCalledWith({ message: "success" });
    expect(res.json).toBeCalledTimes(1);
  });

  it("Login should be fail - Missing username / password", async () => {
    const inputPassword = "1234";
    req.body = { password: inputPassword };

    try {
      await controller.login(req, res);
    } catch (err) {}

    expect(service.checkLogin).not.toBeCalled();
    expect(res.json).lastCalledWith({"message": "invalid username or password"});
    expect(res.json).toBeCalledTimes(1)
  });

  it("Login should be fail - Cannot found User in DB", async () => {
    const inputUsername = "peter";
    const inputPassword = "1234";
    req.body = { username: inputUsername, password: inputPassword };
    service.checkLogin = jest.fn(() => Promise.reject(new InvalidLoginError()));

    try {
      await controller.login(req, res);
    } catch (err) {}

    expect(service.checkLogin).toBeCalled();
    expect(res.json).not.toBeCalled();
  });
});
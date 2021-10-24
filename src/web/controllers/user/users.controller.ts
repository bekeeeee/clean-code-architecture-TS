import { CreateUserDto, Jwt, SigninDto } from "../../../logic/dtos/users";
import { UsersService } from "../../../logic/services/users.service";
import { BaseHttpResponse } from "../../lib/base-http-response";
import { AuthorizedToAdmin } from "../../middlewares/Authorized-to-admin";
import { CurrentUserMiddleware } from "../../middlewares/current-user.middleware";
import { ValidateRequestMiddleware } from "../../middlewares/validate-request.middleware";
import { Request, Response } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";

@controller("/api/v1/user")
export class UsersController {
  constructor(private readonly _service: UsersService) {}

  //Signup route
  @httpPost("/", ValidateRequestMiddleware.with(CreateUserDto))
  async signup(req: Request, res: Response) {
    await this._service.findOneByEmailSignUp({ email: req.body.email });
    await this._service.findOneByUsernameSignup({
      username: req.body.username,
    });

    await this._service.findOneByPhoneNumberSignup({
      phoneNumber: req.body.phoneNumber,
    });
    const user = await this._service.create(req.body);
    const jwt = await Jwt.signToken(Jwt.from(req.body));
    req.session! = { jwt };
    user.password = "";
    const response = BaseHttpResponse.success(user);
    res.json(response);
  }

  //Login route
  @httpPost("/login", ValidateRequestMiddleware.with(SigninDto))
  async lgoin(req: Request, res: Response) {
    const user = await this._service.findOne(req.body);

    const jwt = await Jwt.signToken(Jwt.from(user));
    req.session! = { jwt };
    user.password = "";
    const response = BaseHttpResponse.success(user);
    res.json(response);
  }

  @httpGet("/", CurrentUserMiddleware, AuthorizedToAdmin)
  async getAllUsers(req: any, res: Response) {
    const users = await this._service.all();

    const response = BaseHttpResponse.success(users);
    res.json(response);
  }
}

import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";

import cookieSession from "cookie-session";

import { InversifyExpressServer } from "inversify-express-utils";

import { Container } from "inversify";

import "./controllers/user/users.controller";
import "./controllers/art/arts.controller";
import "./controllers/hello.controller";

import { BaseHttpResponse } from "./lib/base-http-response";

import { NotAuthorized } from "./exceptions/Not-authorized";
import { NotAuthenticated } from "./exceptions/Not-authenticated";
import {
  Application,
  IAbstractApplicationOptions,
  MorganMode,
} from "./lib/abstract-application";
import { DBContext } from "../data/db.context";
import { UsersRepository } from "../data/user/users.repository";
import { UsersService } from "../logic/services/users.service";
import { ArtsRepository } from "../data/art/arts.repository";
import { ArtsService } from "../logic/services/arts.service";
import { BadRequestError, ValidationException } from "../logic/exceptions";



export class App extends Application {
  constructor() {
    super({
      containerOpts: {
        defaultScope: 'Singleton',
      },
      morgan: {
        mode: MorganMode.DEV,
      },
    })
  }
  private server: any
  configureServices(container: Container): void {
    container.bind(DBContext).toSelf()
    container.bind(ArtsRepository).toSelf()
    container.bind(ArtsService).toSelf()
    container.bind(UsersRepository).toSelf()
    container.bind(UsersService).toSelf()
  }

  async setup(options: IAbstractApplicationOptions) {
    const _db = this.container.get(DBContext)

    await _db.connect()

    this.server = new InversifyExpressServer(this.container)

    this.server.setErrorConfig((app: any) => {
      app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof ValidationException) {
          const response = BaseHttpResponse.failed(err.message, 422)
          return res.status(response.statusCode).json(response)
        }


        if (err instanceof NotAuthenticated) {
          const response = BaseHttpResponse.failed(err.message, 401)
          return res.status(response.statusCode).json(response)
        }

        if (err instanceof NotAuthorized) {
          const response = BaseHttpResponse.failed(err.message, 401)
          return res.status(response.statusCode).json(response)
        }

        if (err instanceof BadRequestError) {
          const response = BaseHttpResponse.failed(err.message, 400)
          return res.status(response.statusCode).json(response)
        }



        if (err instanceof Error) {
          const response = BaseHttpResponse.failed(err.message, 500)
          return res.status(response.statusCode).json(response)
        }

        next()
      })
    })

    this.server.setConfig((app: any) => {
      app.use(express.json())
      app.use(morgan(options.morgan.mode))
      // cookieSession cookie-session stores the session data on the client within a cookie
      // express-session stores only a session identifier on the client within a cookie and stores the session data on the server, typically in a database.
      app.use(
        cookieSession({
          name: 'jwt',
          signed: false,
          secure: false,
        })
      )
    })

    const app = this.server.build()

    app.listen(process.env.PORT, () => {
      console.log(`server is running on http://localhost:${process.env.PORT}`)
    })
  }

  get getserver() {
    return this.server
  }
}

new App()

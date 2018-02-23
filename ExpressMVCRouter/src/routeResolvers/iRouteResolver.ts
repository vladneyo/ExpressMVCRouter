import { Request, Response } from "../../node_modules/@types/express-serve-static-core/index";

import { IRequestHandler } from "../requestHandlers/iRequestHandler"

export interface IRouteResolver {
    resolve(req: Request, res: Response): IRequestHandler
}
import { Request, Response } from "../../node_modules/@types/express-serve-static-core/index";

import { IRouteResolver } from "./iRouteResolver";
import { IRequestHandler } from "../requestHandlers/iRequestHandler";

export class DefaultResolver implements IRouteResolver {
    resolve(req: Request, res: Response): IRequestHandler {
        return () => { };
    }
}
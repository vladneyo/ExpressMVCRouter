import { Request, Response } from "../../node_modules/@types/express-serve-static-core/index";

import { IRouteResolver } from "./iRouteResolver";
import { IRequestHandler } from "../requestHandlers/iRequestHandler";

export class DefaultResolver implements IRouteResolver {
    resolve(req: Request, res: Response): IRequestHandler {
        // parse request
        // find first node in url and find such controller
        // find second node in url and find such method in controller
        // retrieve this function and return it

        // stub for handler
        return async () => new Promise<any>((resolve, reject) => {});
    }
}
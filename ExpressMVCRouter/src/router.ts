import { Request, Response, RequestHandler, NextFunction } from "../node_modules/@types/express-serve-static-core/index";

import { DefaultResolver } from "./routeResolvers/defaultResolver";
import { IRouteResolver } from "./routeResolvers/iRouteResolver";
import { IRequestHandler } from "./requestHandlers/iRequestHandler";

export function Router(): RequestHandler {
    function processRequest(req: Request, res: Response, next: NextFunction): any {
        let routeResolvers: IRouteResolver[] = [new DefaultResolver()];
        let handler: IRequestHandler = null as any;
        for (const resolver of routeResolvers) {
            handler = resolver.resolve(req, res);
            if (handler != null) break;
        }

        if (handler == null) {
            throw new Error("No handler found");
        }

        return handler().then(result => res.send(result));
    }

    return processRequest;
}
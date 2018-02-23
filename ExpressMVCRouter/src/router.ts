import { Request, Response, RequestHandler, NextFunction } from "../node_modules/@types/express-serve-static-core/index";

import { DefaultResolver } from "./routeResolvers/defaultResolver";
import { IRouteResolver } from "./routeResolvers/iRouteResolver";

export function Router(): RequestHandler {
    function processRequest(req: Request, res: Response, next: NextFunction): any {
        let routeResolvers: IRouteResolver[] = [new DefaultResolver()];

        let handler = null;
        for (const resolver of routeResolvers) {
            handler = resolver.resolve(req, res);
            if (handler != null) break;
        }

        if (handler == null) {
            throw new Error("No handler found");
        }
        const result = handler();
        res.send(result);
        return;
    }

    return processRequest;
}
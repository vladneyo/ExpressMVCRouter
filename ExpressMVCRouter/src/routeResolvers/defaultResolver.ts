import { Request, Response } from '../../node_modules/@types/express-serve-static-core/index';
import { existsSync } from 'fs';
import { join } from 'path';
import { _ } from '../../node_modules/lodash';

const getParamsNames = require('get-parameter-names')

import { IRouteResolver } from './iRouteResolver';
import { IRequestHandler } from '../requestHandlers/iRequestHandler';
import { PathConstants } from '../constants/pathConstants';
import { RouterConfig } from '../config/routerConfig';

export class DefaultResolver implements IRouteResolver {
    private _routerConfig: RouterConfig;

    constructor(routerConfig?: RouterConfig) {
        this._routerConfig = !!routerConfig ? routerConfig : RouterConfig.create() ;
    }

    resolve(req: Request, res: Response): IRequestHandler {
        // find first node in url and find such controller
        const urlParts = req.originalUrl.split('?')[0].split('/').slice(1).filter(x => x != '');
        if (urlParts.length == 0) {
            const controllerModule = join(process.cwd(), PathConstants.defaultControllerPath, this._routerConfig.defaultController);
            const controllerPath = controllerModule + '.js';
            if (!existsSync(controllerPath)) {
                throw new Error('No such controller found');
            }

            const controller = new (require(controllerModule))();
            const actionName = req.method.toLowerCase() + _.capitalize(this._routerConfig.defaultAction as string);

            if (!controller[actionName] || !_.isFunction(controller[actionName])) {
                throw new Error('No such method found');
            }

            const paramsNames = getParamsNames(controller[actionName]);
            const bindedParams = {};

            for (const param of paramsNames) {
                if (req.query[param]) {
                    bindedParams[param] = req.query[param];
                    break;
                }
                if (req.params[param]) {
                    bindedParams[param] = req.params[param];
                    break;
                }
                if (req.body && req.body[param]) {
                    bindedParams[param] = req.body[param];
                    break;
                }
                if (req.cookies && req.cookies[param]) {
                    bindedParams[param] = req.cookies[param];
                    break;
                }
            }

            if (_.keys(bindedParams).length < paramsNames.length) {
                throw new Error('Missed request parameters');
            }

            return controller[actionName].bind(controller, [..._.values(bindedParams)]);
        }
        // find second node in url and find such method in controller
        // retrieve this function and return it

        // stub for handler
        return async () => new Promise<any>((resolve, reject) => resolve(req.originalUrl));
    }
}
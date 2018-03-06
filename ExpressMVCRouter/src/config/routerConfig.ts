export class RouterConfig {
    public readonly defaultController: string;
    public readonly defaultAction: string;

    constructor(controller: string, action: string) {
        this.defaultController = controller;
        this.defaultAction = action;
    }

    public static create(): RouterConfig {
        return new RouterConfig('homecontroller', 'index');
    }
}
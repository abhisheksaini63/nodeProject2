import { BaseRoutes } from "../baseroutes";
import { masterRouteV1 } from ".";

class ApiVersionRoutes extends BaseRoutes {

    public path = '/tracking';

    constructor() {
        super();
        this.init();
    }

    private init() {
        this.router.use(masterRouteV1.path, masterRouteV1.routerinstance);
    }
}

export const appRoutesV1 = new ApiVersionRoutes();

import { NextFunction, Response } from 'express';
import { BaseController } from "../basecontroller";
import { IFilteredRequest } from "../../interfaces";
import { trackingService } from "../../services/trackingServices/trackingservices";
import { UserLogin } from "../../models/users/login.model";
import { ApiPath, SwaggerDefinitionConstant, ApiOperationPost, ApiOperationGet } from "swagger-express-ts"
// import { IGeoPoint } from "../../../dist/tracking/geo_point";

@ApiPath({
    path: "/api/v1",
    name: "User API Calls",
    security: { apiKeyHeader: [] },
})

class TrackingControler extends BaseController {

    @ApiOperationPost({
        description: "Api to register a user",
        path: '/insertTracking',
        summary: "Api to register a user",
        parameters: {
            body: {
                description: "Enter body",
                required: true,
            }
        },
        responses: {
            200: {
                description: "Success",
                type: SwaggerDefinitionConstant.Response.Type.OBJECT,
            },
            404: {
                description: "Fail",
                type: SwaggerDefinitionConstant.Response.Type.OBJECT,
            }
        },
    })

    public async insertTrack(req, res: Response, next: NextFunction) {
        try {
            const requestResult = await trackingService.InsertTracing(req.body);
            return res.send(requestResult);
        } catch (error) {
            return null;
        }
    }

    @ApiOperationGet({
        description: "Api to getall track",
        path: '/getTracking',
        summary: "Api to run process",
        responses: {
            200: {
                description: "Success",
                type: SwaggerDefinitionConstant.Response.Type.OBJECT,
            },
            404: {
                description: "Fail",
                type: SwaggerDefinitionConstant.Response.Type.OBJECT,
            }
        },
    })

    public async getAll(req: IFilteredRequest<UserLogin>, res: Response, next: NextFunction) {
        try {
            const requestResult = await trackingService.getAll(req.body);
            return res.send(requestResult);
        } catch (error) {
            return null;
        }
    }

}

export const trackingControler = new TrackingControler();

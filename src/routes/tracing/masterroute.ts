import express, { NextFunction, Request, Response } from 'express';
import { trackingControler } from '../../controllers/trackingControler/trackingController';
import { BaseRoutes } from "../baseroutes";
import cores from 'cors';
const bodyParser = require('body-parser')
class MasterRouteV1 extends BaseRoutes {
    public path = '/';
    constructor() {
        super();
        this._configure();
    }
    /**
     * @description Connect routes to their matching controller endpoints.
     */
    private _configure() {
        this.router.use(bodyParser.json())
        this.router.use(bodyParser.urlencoded({ extended: false }))
        this.router.use(cores())

        this.router.get('/',
            (req: Request, res: Response, next: NextFunction) => {
                res.send("server running");
            });

        this.router.post('/insertTracking',
            (req: Request, res: Response, next: NextFunction) => {
                trackingControler.insertTrack(req, res, next);
            })
        this.router.get('/getTracking',
            (req: Request, res: Response, next: NextFunction) => {
                trackingControler.getAll(req, res, next);
            })

    }
}

export const masterRouteV1 = new MasterRouteV1();
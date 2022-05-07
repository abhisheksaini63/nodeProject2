import {UserLogin , userLoginModel} from "../../models/users/login.model";
const bcrypt = require("bcrypt");
// import { GeoPointModel } from "../../../../sbq-typescript-models/tracking/geo_point";


class TrackingService {
    // insert all tracking here
    public  InsertTracing= async (req?:any) => {
        
    try{
        // let model = new GeoPointModel();
        // model.latitude_deg = req?.latitude_deg;
        // model.longitute_deg = req?.longitute_deg;
        // model.altitude_deg = req?.altitude_deg;
        // model.save();
        
    }catch(err){
        console.log(err);
    }
    // return resObj;   
    };

    // insert all tracking here
    public getAll = async (req?: UserLogin) => {
        var email = req?.Email;
        var password = req?.Password;
        //var msg = "";
        var resObj = {};
        try{
            var userLogin = await userLoginModel.findOne({ Email:email });
            const  isMatch = await bcrypt.compare(password, userLogin?.Password);
            if(isMatch){
                resObj["ack"] = "1";
                resObj["msg"] = "Login success.";
            }else{
                resObj["ack"] = "0";
                resObj["msg"] = "Credentials Wrong !!!";
            }

        }catch(err){
            resObj["ack"] = "0";
            resObj["msg"] = "Credentials Wrong !!!";
        }
        return resObj;
    }
}

export const trackingService = new TrackingService();
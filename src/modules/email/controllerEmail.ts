import { Request, Response } from "express";
import { logger } from "../../config/winstonConfig/winstonConfig";
import { ServiceEmail } from "./serviceEmail";

export class ControllerEmail {

    public serviceEmail: ServiceEmail;

    constructor() {
        this.serviceEmail = new ServiceEmail()
    }

    async sendEmail(req: Request, res: Response) {
        try {
            const { data } = req.body;
            await new ServiceEmail().sendEmailService(data);
            res.json({
                status: true,
                message: 'Message successfully sent'
            })
        } catch (error) {
            logger.error(`Error at controller sendEmail: ${String(error)}`);
            throw new Error();
        }
    }

}
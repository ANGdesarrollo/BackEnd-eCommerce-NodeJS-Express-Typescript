import { Request, Response } from "express";
import { logger } from "../../config/winstonConfig/winstonConfig";
import { ServiceContact } from "./serviceContact";

export class ControllerContact {

    public serviceContact: ServiceContact;

    constructor() {
        this.serviceContact = new ServiceContact()
    }

    async sendEmail(req: Request, res: Response) {
        try {
            const { data } = req.body;
            await new ServiceContact().sendEmailService(data);
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
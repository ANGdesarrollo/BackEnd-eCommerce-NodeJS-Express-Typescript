import { IEmail } from "../../interfaces/interfaceEmail";
import { email, emailOwner } from "../../utils/nodemailer/nodemailer";
import { useValidators } from "../../utils/validators/useValidators";

export class ServiceEmail {
    constructor() {}

    async sendEmailService(data: IEmail): Promise<void> {
        try {
            const { nodemailerValidator } = useValidators();
            await nodemailerValidator(data);
            const body = `
            <h1>Hola ${emailOwner}</h1>
            <p>Has recibido un mensaje de ${data.name} con el siguiente contenido:</p>
            <p>Email: ${data.email}</p>
            <p>Teléfono: ${data.phone}</p>
            <p>Mensaje: ${data.message}</p>
            `

            email(body, 'Nuevo mensaje', emailOwner, '')
        
        } catch(error) {
            throw new Error();
        }
    }
}
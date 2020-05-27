import IMailProvider from '../models/IMailProvider';
import nodemailer, { Transporter } from 'nodemailer';

class EtherealMailProvider implements IMailProvider {
  private client: Transporter;


  constructor(){
   nodemailer.createTestAccount().then(account => {
     const transporter = nodemailer.createTransport({
       host: account.smtp.host,
       port: account.smtp.port,
       secure: account.smtp.secure,
       auth:{
         user: account.user,
         pass:account.pass,
       },
     });

     this.client = transporter;

   });

  }
  public async sendMail(to: string, body: string): Promise<void> {

    const message = await this.client.sendMail({
      from:'Equipe Gobarber <equipe@gobarber.com.br>',
      to,
      subject: 'REcuperação de Senha',
      text: body,
    });

    console.log('Message send :',message.messageId);
    console.log('Preview url :',nodemailer.getTestMessageUrl(message));
  }
}

export default EtherealMailProvider;

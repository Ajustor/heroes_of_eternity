import { NotificationService } from '@/core/base/notificationService'
import { ReactNode } from 'react'
import { Resend } from 'resend'

export class EmailSender implements NotificationService {
  private client: Resend

  constructor() {
    const { RESEND_API_KEY } = Bun.env
    if (!RESEND_API_KEY) {
      throw new Error("No api key is presend for resend")
    }
    this.client = new Resend(RESEND_API_KEY)
  }

  public async sendEmail(to: string, subject: string, template: ReactNode) {
    const { data, error } = await this.client.emails.send({
      from: 'Heroes of Eternity <no-reply@hoe.darthoit.eu>',
      to,
      subject,
      react: template,
    })

    if (error) {

      console.error(error)
      return false
    }

    console.log(data)

    return true
  }

  public async sendBatchEmail(bcc: string[], subject: string, template: ReactNode) {
    const { data, error } = await this.client.batch.send(bcc.map((to) => ({
      from: 'Heroes of Eternity <no-reply@hoe.darthoit.eu>',
      to,
      subject,
      react: template,
    })))

    if (error) {

      console.error(error)
      return false
    }

    console.log(data)

    return true
  }
}
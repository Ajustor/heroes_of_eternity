import { ReactNode } from 'react'

export abstract class NotificationService {
  abstract sendEmail(to: string, subject: string, template: ReactNode): Promise<boolean>
  abstract sendBatchEmail(bbc: string[], subject: string, template: ReactNode): Promise<boolean>
}
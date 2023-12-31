import { toast } from 'sonner'
import { Card, CardBody } from '@nextui-org/react'
import StopIcon from '@/icons/StopIcon'
import {
  Color,
  getBackgroundColor,
  getBorderColor,
  getTextColor,
} from '../Color'
import { ReactNode } from 'react'
import LinkIcon from '@/icons/LinkIcon'

export function toastMessage(
  title: string,
  message: string,
  color: Color,
  icon: ReactNode
) {
  toast.custom(() => (
    <Card
      className={`${getBackgroundColor(color)} ${getTextColor(
        color
      )} ${getBorderColor(color)} border-1`}
    >
      <CardBody>
        <div className="flex items-center gap-3">
          {icon}
          <div className="flex flex-col">
            <p className="text-lg">{title}</p>
            <p className="text-xs">{message}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  ))
}

export function toastError(title: string, message: string) {
  toastMessage(title, message, 'red', <StopIcon />)
}

export function toastLink(title: string, message: string) {
  toastMessage(title, message, 'green', <LinkIcon />)
}

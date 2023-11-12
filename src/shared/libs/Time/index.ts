import { formatDistanceToNowStrict } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

export function getRelativeTimeText(date: string | number | Date) {
  const formattedTime = utcToZonedTime(
    date + 'Z',
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )

  return formatDistanceToNowStrict(new Date(formattedTime.toISOString()), {
    addSuffix: true,
  })
}

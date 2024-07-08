import moment from 'moment-timezone'

export const convertToUTC = (dateStr: any, timezone: string) => {
    const localDate = moment.tz(dateStr, 'MM/DD/YYYY, hh:mm:ss A', timezone)
    const utcDate = localDate?.clone().tz('UTC')
    const utcDateStr = utcDate?.format('YYYY-MM-DD')
    return utcDateStr
  }
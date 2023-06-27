import React from 'react'
import moment from 'moment-timezone'

export function getCSRFToken() {
    return document.getElementsByName('csrfmiddlewaretoken')[0].value
}

export function getFormattedTime(time) {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    return moment(time).tz(userTimezone).format('HH:mm')
}

export function getFormattedDate(time) {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    return moment(time).tz(userTimezone).format('DD.MM.YY')
}

import '/vendor/jq.js'
import { convertDate } from '../../util/util.js'

const notifWrapper = $('.notification-chips-wrapper')

$(function (e) 
{  
    $.getJSON('/data/notifs.json', function (notifications) {  

        notifWrapper.empty()
        notifications.forEach(notif => {

            let card = $('<div>', {class: 'notification-chips border border-secondary-subtle rounded d-flex'})
            let imgWrapper = $('<span>', {class: 'notification-img-wrapper'})
            let cardBody = $('<div>', {class: 'notification-body w-100'})
    
            let image = $('<img>', {src: notif.img})
            let header = $('<div>', {class: 'd-flex justify-content-between'})
            let title = $('<p>', {class: 'notification-body-title fw-bold'})
            let date = $('<p>', {class: 'notification-body-date'})
            let message = $('<p>', {class: 'notification-body-description'})
    
            title.html(notif.name)
            message.html(notif.message)
            date.html(convertDate(notif.date))
    
            imgWrapper.append(image)
            header.append(title)
            header.append(date)
            cardBody.append(header)
            cardBody.append(message)
    
            card.append(imgWrapper)
            card.append(cardBody)
    
            notifWrapper.append(card)
        })
        
    })
})
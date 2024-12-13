import '/vendor/jq.js'

import { studentGrade } from '../../util/util.js'

$(function (e) 
{  
    $('.gwa-holder').html(`GWA: ${parseFloat(studentGrade).toFixed(2)}`)

    $.getJSON('/data/scholarships.json', function (scholarships) {

        let wrapper = $('.scholarship-card-wrapper')

        scholarships.forEach(scholarship => {

            if (scholarship.status !== 'Available') return

            let reqGWA = parseFloat(scholarship.required_grade).toFixed(2)
            let applyDisabled = reqGWA < studentGrade

            let $card = $('<div>', {class: 'card scholarship-card'})
            let $cardBody = $('<div>', {class: 'card-body d-flex flex-column justify-content-start align-items-center text-center'})
            let $imgHolder = $('<span>', {class: 'scholarship-card-image-holder mb-3'})
            let $img = $('<img>', {src: scholarship.image})
            let $title = $('<h5>', {class: 'card-title fw-semibold'})
            let $subTitle = $('<h6>', {class: `card-subtitle req-gwa mb-2 text-body-secondary ${ applyDisabled ? 'gwa-invalid' : 'gwa-valid' } fw-semibold fst-italic`})
            let $desc = $('<p>', {class: 'card-text scholarship-desc mt-2'})
            let $link = $('<button>', {type: 'button', class: 'btn btn-outline-success w-100 mt-auto', disabled: applyDisabled})

            $link.on('click', function (e) 
            {  
                parent.postMessage({
                    header: 'apply modal',
                    data: scholarship
                }, window.location.origin);
            })

            $imgHolder.append($img)

            $title.html(scholarship.title)
            $subTitle.html(`Required GWA of ${reqGWA}`)
            $desc.html(scholarship.description)
            $link.html('Apply')
            
            $cardBody.append($imgHolder)
            $cardBody.append($title)
            $cardBody.append($subTitle)
            $cardBody.append($desc)
            $cardBody.append($link)

            $card.append($cardBody)

            wrapper.append($card)
        })
    })
})
import '/vendor/jq.js';

const scholarshipChipsWrapper = $('.scholarship-chips-wrapper')

var filter_scholars = 'Available'
var globScholarships = []
var scholarshipsData 

function renderWrapper() 
{
    scholarshipChipsWrapper.empty()

    globScholarships.forEach(row => {
        let card = $('<div>', {class: 'scholarship-chips border border-secondary-subtle rounded'})
        let imgWrapper = $('<span>', {class: 'scholarship-img-wrapper'})
        let cardBody = $('<div>', {class: 'scholarship-body'})
        let actionWrapper = $('<span>', {class: 'scholarship-action d-flex align-items-end'})

        let title = $('<p>', {class: 'scholarship-body-title fw-bold'})
        let description = $('<p>', {class: 'scholarship-body-description'})
        let applicants = $('<p>', {class: 'scholarship-body-applicants fw-bold mt-2'})
        let badge = $('<span>', {class: 'badge text-bg-success me-2'})

        let url =  `/scholarship_module/views/frames/scholarship_info.html?scholar_id=${row.id}`
        let link = $('<a>', {class: 'btn btn-link text-success', type: 'button', href: url})
        let image = $('<img>', {src: row.image})

        badge.html(row.scholars.length)
        title.html(row.title)
        description.html(row.description)
        link.html('View')
        applicants.append(badge)
        applicants.append('Scholars')

        imgWrapper.append(image)
        cardBody.append(title)
        cardBody.append(description)
        cardBody.append(applicants)
        actionWrapper.append(link)

        card.append(imgWrapper)
        card.append(cardBody)
        card.append(actionWrapper)

        scholarshipChipsWrapper.append(card)
    })    
}

function filter() 
{
    globScholarships = []

    scholarshipsData.forEach(scholarship => {
        if (filter_scholars !== scholarship.status) return
        
        globScholarships.push(scholarship)
    })

    $('.scholarship-no').html(globScholarships.length)
    renderWrapper()
}

// Populate Scholarships
$(function () 
{   
    $.getJSON('/data/scholarships.json', function (scholarships) {  

        scholarshipsData = scholarships
        filter()
        
    })
})

$('.scholarship-filter-dd').on('click', function() 
{
    $('.scholarship-filter-parent').html($(this).html())
    filter_scholars = $(this).html()
    
    filter()
})
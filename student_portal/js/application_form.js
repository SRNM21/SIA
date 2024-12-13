import '/vendor/jq.js'
import { getQuery } from '../../util/util.js'

var isko

$(function (e) 
{  
    var scholarshipID = Number(getQuery("id"))

    $.getJSON('/data/scholarships.json', function (scholarships) {

        isko = scholarships[scholarshipID - 1]
        $('.app-form-title').html(isko.title)
    })
})

$('.personal-info-next-btn').on('click', function (e) 
{  
    $('.section-list').scrollLeft($('.section-list').scrollLeft() + $('.section-list').outerWidth()) 
})

$('.family-info-next-btn').on('click', function (e) 
{  
    $('.section-list').scrollLeft($('.section-list').scrollLeft() + $('.section-list').outerWidth()) 
})

$('.educational-bg-next-btn').on('click', function (e) 
{  
    $('.section-list').scrollLeft($('.section-list').scrollLeft() + $('.section-list').outerWidth()) 
})

$('.submit-btn').on('click', function (e) 
{  
    parent.postMessage({
        header: 'apply success modal',
        data: isko
    }, window.location.origin);
})
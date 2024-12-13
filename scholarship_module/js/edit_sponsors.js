import '/vendor/jq.js';
import { getQuery } from '../js/util.js'

var isko

$(function () 
{  
    var scholarshipID = Number(getQuery("id"))

    $.getJSON('/data/scholarships.json', function (scholarships) {
        isko = scholarships[scholarshipID - 1]

        $('#photo').attr('src', isko.image)
        $('#sponsor-name').val(isko.title)
        $('#sponsor-desc').val(isko.description)

        isko.requirements.new.forEach(e => {
            addReqList(e)
        })
    })

    $('.edit-cancel-btn').on('click', function (e) 
    { 
        window.location.replace(`../scholarship_info.html?scholar_id=${scholarshipID}`)
    })
})

function addReqList(req) 
{  
    let reqList = $('.req-list-wrapper')

    $('.req-item').val('')

    let reqItem = $('<span>', {class: 'req-list'})
    let reqRem = $('<span>', {class: 'req-remove-btn'})
    reqRem.on('click', function (e) { reqItem.remove() })
    reqRem.html('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#adb5bd"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>')
    
    reqItem.html(req)
    reqItem.prepend(reqRem)

    reqList.append(reqItem)
}

$('#add-req-btn').on('click', function (e) 
{  
    let reqList = $('.req-list-wrapper')
    let requirement = $('.req-item').val()

    if (!requirement) return

    $('.req-item').val('')

    let reqItem = $('<span>', {class: 'req-list'})
    let reqRem = $('<span>', {class: 'req-remove-btn'})
    reqRem.on('click', function (e) { reqItem.remove() })
    reqRem.html('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#adb5bd"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>')
    
    reqItem.html(requirement)
    reqItem.prepend(reqRem)

    reqList.append(reqItem)
})

$('.edit-sponsors-btn').on('click', function() {

    parent.postMessage({
        header: 'edit sponsor',
        data: isko
    }, '*')
})
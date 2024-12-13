import '/vendor/jq.js';

$(function() 
{
    $('#sponsor-logo').change(function (e) {
        let imgURL = URL.createObjectURL(e.target.files[0]);
        $("#photo").attr("src", imgURL);
    });

})

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

$('.add-sponsors-btn').on('click', function() {

    parent.postMessage({
        header: 'add sponsor',
        data: null
    }, '*')
})
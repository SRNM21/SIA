import '/vendor/jq.js';
import { studentApplication, studentGrade } from '../../util/util.js';

$(function (e) 
{  
    $('.scholar-img').attr('src', studentApplication.image)
    $('.scholar-title').html(studentApplication.title)
    $('.gwa').val(studentGrade)
})

$('.withdraw-btn').on('click', function (e) 
{  
    parent.postMessage({
        header: 'withdraw modal',
        data: studentApplication
    }, window.location.origin);
})

$('.open-btn').on('click', function (e) 
{  
    parent.postMessage({
        header: 'open modal',
        data: studentApplication
    }, window.location.origin);
})
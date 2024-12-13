import '/vendor/jq.js';
import { convertDate } from '../../util/util.js';

const frame = $('.frame-holder')
const scholarshipBtn = $('#nav-scholarships')
const gradeReportBtn = $('#nav-grade-report')
const statusBtn = $('#nav-status')
const notifBtn = $('#nav-notifications-report')

$('.hamburger').on('click', function () 
{   
    $('.side-bar').toggleClass('collapse')
})

$(window).on('message', function (e) 
{  
    let message = e.originalEvent.data
    let header = message.header
    let data = message.data

    if (header === 'apply modal')
    {
        $('#apply-modal').modal('show')
        $('.apply-title').html(data.title)

        $('.apply-modal-new').on('click', function (e) 
        {
            $('#req-modal').modal('show')
            $('.apply-title').html(data.title)
            $('.apply-type').html('New Applicant')
            $('.req-list').empty()

            let reqList = $('.req-list')

            data.requirements.new.forEach(e => {
                let list = $('<li>').html(e)
                reqList.append(list)
            })

            $('.apply-now-modal-btn').on('click', function (e) 
            {  
                toggle('application form', data.id)
            })
        })

        $('.apply-modal-renew').on('click', function (e) 
        {
            $('#req-modal').modal('show')
            $('.apply-title').html(data.title)
            $('.apply-type').html('New Applicant')
            $('.req-list').empty()

            let reqList = $('.req-list')

            data.requirements.renewal.forEach(e => {
                let list = $('<li>').html(e)
                reqList.append(list)
            })

            $('.apply-now-modal-btn').on('click', function (e) 
            {  
                toggle('application form', data.id)
            })
        })
    }

    if (header === 'apply success modal')
    {
        $('#apply-success-modal').modal('show')
        $('.apply-title').html(data.title)

        $('.apply-ok-btn').on('click', function(e) 
        {   
            frame.attr('src', '/student_portal/views/frames/scholarship_app.html')
        })
    }

    if (header === 'withdraw modal')
    {
        $('#withdraw-modal').modal('show')
        $('.applicant-applied').html(data.title)
        $('.withdraw-confirm-btn').on('click', function (e) 
        {  
            $('#withdraw-success-modal').modal('show')
            $('.apply-title').html(data.title)

        })
    }

    if (header === 'open modal')
    {
        $('#applicant-details-modal').modal('show')
        $('.applicant-modal-no').html(`Applicant`)
        $('.applicant-modal-id').html('22-00123')
        $('.applicant-modal-name').html('Magtanggol, Viktor V.')
        $('.applicant-modal-course').html('Bachelor of Science in Information Technology')
        $('.applicant-modal-app').html(convertDate('2023-12-12'))
        $('.applicant-modal-year').html('3rd year')
    }
})

function toggle(button, data) 
{
    [scholarshipBtn, gradeReportBtn, notifBtn, statusBtn].forEach(e => {
        e.removeClass('active')
    });

    switch (button)
    {
        case 'application form':
            scholarshipBtn.addClass('active') 
            frame.attr('src', `/student_portal/views/frames/application_form.html?id=${data}`)
            break
        case 'scholarships':
            scholarshipBtn.addClass('active') 
            frame.attr('src', '/student_portal/views/frames/scholarship_app.html')
            break
        case 'grade':
            gradeReportBtn.addClass('active')
            frame.attr('src', '/student_portal/views/frames/grade_report.html')
            break
        case 'status':
            statusBtn.addClass('active')
            frame.attr('src', '/student_portal/views/frames/status.html')
            break
        case 'notifications':
            notifBtn.addClass('active')
            frame.attr('src', '/student_portal/views/frames/notifications.html')
            break
    }
}

scholarshipBtn.on('click', function() 
{
    toggle('scholarships')
})

gradeReportBtn.on('click', function() 
{
    toggle('grade')
})

statusBtn.on('click', function() 
{
    toggle('status')
})


notifBtn.on('click', function() 
{
    toggle('notifications')
})
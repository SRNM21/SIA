import '/vendor/jq.js';
import { convertDate } from '../../util/util.js'

const frame = $('.frame-holder')
const dashboardBtn = $('#nav-dashboard')
const scholarshipsBtn = $('#nav-scholarships')
const scholarsBtn = $('#nav-scholars')
const applicantsBtn = $('#nav-applicants')

$('.hamburger').on('click', function () 
{   
    $('.side-bar').toggleClass('collapse')
})

function toggle(button) 
{
    [dashboardBtn, scholarshipsBtn, scholarsBtn, applicantsBtn].forEach(e => {
        e.removeClass('active')
    });

    switch (button)
    {
        case 'dashboard':
            dashboardBtn.addClass('active') 
            frame.attr('src', '/scholarship_module/views/frames/dashboard.html')
            break
        case 'scholarships':
            scholarshipsBtn.addClass('active')
            frame.attr('src', '/scholarship_module/views/frames/scholarships.html')
            break
        case 'scholars':
            scholarsBtn.addClass('active')
            frame.attr('src', '/scholarship_module/views/frames/scholars.html')
            break
        case 'applicants':
            applicantsBtn.addClass('active')
            frame.attr('src', '/scholarship_module/views/frames/applicants.html')
            break
    }
}

dashboardBtn.on('click', function() 
{
    toggle('dashboard')
})

scholarshipsBtn.on('click', function() 
{
    toggle('scholarships')
})

scholarsBtn.on('click', function() 
{
    toggle('scholars')
})

applicantsBtn.on('click', function() 
{
    toggle('applicants')
})

function setScholars(student)
{
    $('.scholars-modal-no').html(`Scholar #${student.index}`)
    $('.scholars-modal-id').html(student.student_id)
    $('.scholars-modal-name').html(student.name)
    $('.scholars-modal-course').html(student.course)
    $('.scholars-modal-app').html(convertDate(student.date_applied))
}

function setApplicant(student)
{
    $('.applicant-modal-no').html(`Applicant #${student.index}`)
    $('.applicant-modal-id').html(student.student_id)
    $('.applicant-modal-name').html(student.name)
    $('.applicant-modal-course').html(student.course)
    $('.applicant-modal-app').html(convertDate(student.date_applied))
    $('.applicant-modal-year').html(student.year_level)
}

function goBack() 
{  
    history.back()
}

$(function () 
{  
    $('#modal-confirm-inp').val('')
    $('#modal-delete-inp').val('')
    $('#modal-restore-inp').val('')
    $('#perma-rem-inp').val('')
    $('.archive-confirm-sponsor-btn').prop('disabled', true)
    $('.restore-confirm-sponsor-btn').prop('disabled', true)
    $('.delete-proceed-confirm-sponsor-btn').prop('disabled', true)
    $('.perma-rem-sponsor-btn').prop('disabled', true)
})

$(window).on('message', function(event) 
{
    let message = event.originalEvent.data
    let header = message.header
    let data = message.data

    if (header === 'scholar modal') 
    {   
        $('#scholars-details-modal').modal('show');
        setScholars(data)
    }

    if (header === 'applicant modal') 
    {   
        $('#applicant-details-modal').modal('show')
        setApplicant(data)

        $('.applicant-accept-btn').on('click', function(e) 
        {
            $('#applicant-accept-modal').modal('show') 
            $('.applicant-name').html(data.name)      
            $('.applicant-applied').html(data.applied_scholar) 
            $('.applicant-accept-confirm-btn').on('click', function(e) 
            {
                $('#approved-applicant-sponsor-modal').modal('show') 
                $('.applicant-name').html(data.name)      
                $('.applicant-applied').html(data.applied_scholar) 
            })
        })

        $('.applicant-decline-btn').on('click', function(e) 
        {
            $('#applicant-decline-modal').modal('show') 
            $('.applicant-name').html(data.name)      
            $('.applicant-applied').html(data.applied_scholar) 
            $('.applicant-decline-confirm-btn').on('click', function(e) 
            {
                $('#declined-applicant-sponsor-modal').modal('show') 
                $('.applicant-name').html(data.name)      
                $('.applicant-applied').html(data.applied_scholar) 
            })
        })
    }

    if (header === 'add sponsor')
    {
        $('#add-sponsor-modal').modal('show');
        
        $('.add-sponsor-ok-btn').on('click', function (e) 
        {  
            goBack()
        })
    }

    if (header === 'edit sponsor')
    {
        $('#edit-sponsor-modal').modal('show');
        $('.edit-modal-p').html(`${data.title} has been edited successfully`)

        $('.edit-sponsor-ok-btn').on('click', function (e) 
        {  
            goBack()
        })
    }

    if (header === 'restore sponsor')
    {
        $('#restore-sponsor-modal').modal('show');
        $('.restore-name').html(data.title)
        $('.modal-sponsor-name').html(`Scholarships/${data.title}`)
        $('#modal-restore-inp').on('input', function () 
        {  
            if ($(this).val() === `Scholarships/${data.title}`)
            {
                $('.restore-confirm-sponsor-btn').prop('disabled', false)
            }
            else 
            {
                $('.restore-confirm-sponsor-btn').prop('disabled', true)
            }
        })

        $('.restore-confirm-sponsor-btn').on('click', function (e) 
        {   
            $('#restore-sponsor-success-modal').modal('show')
            $('.restore-modal-p').html(`${data.title} has been restored successfully`)
        })

        $('.restore-sponsor-ok-btn').on('click', function (e) 
        {  
            toggle('scholarships')
        })

        $('.restore-sponsor-ok-btn').on('click', function (e) 
        {  
            goBack()
        })
    }

    if (header === 'archive sponsor')
    {
        $('#archive-sponsor-modal').modal('show');
        $('.modal-sponsor-name').html(`Scholarships/${data.title}`)
        $('#modal-confirm-inp').on('input', function () 
        {  
            if ($(this).val() === `Scholarships/${data.title}`)
            {
                $('.archive-confirm-sponsor-btn').prop('disabled', false)
            }
            else 
            {
                $('.archive-confirm-sponsor-btn').prop('disabled', true)
            }
        })

        $('.archive-confirm-sponsor-btn').on('click', function (e) 
        {  
            $('#archive-sponsor-success-modal').modal('show');
            $('.archive-modal-p').html(`${data.title} has been archived successfully`)
        })

        $('.archive-sponsor-ok-btn').on('click', function (e) 
        {  
            toggle('scholarships')
        })
        
        $('.archive-confirm-sponsor-btn').on('click', function (e) 
        {  
            goBack()
        })
    }

    if (header === 'delete sponsor') 
    {
        $('#delete-sponsor-modal').modal('show');
        $('.sponsor-name-holder').html(data.title)
        $('.delete-sponsor-scholars-holder').html(data.scholars.length)

        $('.delete-sponsor-ok-btn').on('click', function (e) 
        {  
            $('#delete-proceed-sponsor-modal').modal('show')
            $('.modal-sponsor-name').html(`Scholarships/${data.title}`)
        })

        $('#modal-delete-inp').on('input', function () 
        {  
            if ($(this).val() === `Scholarships/${data.title}`)
            {
                $('.delete-proceed-confirm-sponsor-btn').prop('disabled', false)
            }
            else 
            {
                $('.delete-proceed-confirm-sponsor-btn').prop('disabled', true)
            }
        })

        $('.delete-proceed-confirm-sponsor-btn').on('click', function (e) 
        {  
            goBack()
        })
    }

    if (header === 'delete permanent sponsor')
    {
        $('#perma-rem-sponsor-modal').modal('show')
        $('.sponsor-name-holder').html(data.title)
        $('.modal-sponsor-name').html(`Scholarships/${data.title}`)

        $('#perma-rem-inp').on('input', function () 
        {  
            if ($(this).val() === `Scholarships/${data.title}`)
            {
                $('.perma-rem-sponsor-btn').prop('disabled', false)
            }
            else 
            {
                $('.perma-rem-sponsor-btn').prop('disabled', true)
            }
        })

        $('.perma-rem-sponsor-btn').on('click', function (e) 
        {  
            goBack()
        })
    }

    if (header === 'switch') processSwitch(data)
})

function processSwitch(data) 
{  
    switch (data)
    {
        case 'scholarships': 
            toggle('scholarships') 
            break
        case 'scholars': 
            toggle('scholars') 
            break
        case 'applicants': 
            toggle('applicants') 
            break
        default:
            break
    }
}

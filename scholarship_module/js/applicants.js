import '/vendor/jq.js';
import { convertDate } from '../../util/util.js'

let currentPage = 1;
const entriesPerPage = 10;
var globApplicants = []

// Filters
var filter_course = 'All Course'
var filter_year = 'All Year Level'
var filter_scholarship = 'All Scholarships'
var filter_search = ''

// Render table
function renderTablePage() {
    let tableBody = $('.applicants-table-body');
    tableBody.empty();
    
    let startIdx = (currentPage - 1) * entriesPerPage
    let endIdx = startIdx + entriesPerPage
    let paginatedApplicant = globApplicants.slice(startIdx, endIdx)
    
    if (paginatedApplicant <= 0)
    {
        let emptyCell = $('<td>', {class: 'w-100 p-3 text-center border border-light-subtle', colspan: 7})
        tableBody.append(emptyCell.html('No data available'))
        return
    }

    let idx = startIdx + 1
    paginatedApplicant.forEach(applicant => {
        applicant.index = idx

        let $tr = $('<tr>')
        let $tdRowN = $('<th>', {scope: 'row'}).html(idx++)
        let $tdID = $('<td>').html(applicant.student_id)
        let $tdName = $('<td>').html(applicant.name)
        let $tdCourse = $('<td>').html(applicant.course)
        let $tdYear = $('<td>').html(applicant.year_level)
        let $tdGrade = $('<td>').html(parseFloat(applicant.grade).toFixed(2))
        let $tdScholar = $('<td>').html(applicant.applied_scholar)
        let $tdApplied = $('<td>').html(convertDate(applicant.date_applied))
        let $tdButton = $('<button>', {class: 'btn btn-success btn-sm'}).html('View')
        let $tdAction = $('<td>').html($tdButton)

        $tdButton.on('click', function (e) 
        {  
            parent.postMessage({
                header: 'applicant modal',
                data: applicant
            }, window.location.origin)
        })

        $tr.append($tdRowN)
        $tr.append($tdID)
        $tr.append($tdName)
        $tr.append($tdCourse)
        $tr.append($tdYear)
        $tr.append($tdGrade)
        $tr.append($tdScholar)
        $tr.append($tdApplied)
        $tr.append($tdAction)

        tableBody.append($tr)
    })

    $('#showing-text').text(`Showing ${startIdx + 1} to ${Math.min(endIdx, globApplicants.length)} of ${globApplicants.length} entries`)
    $('#current-page').text(currentPage)

    $('#prev-btn').prop('disabled', currentPage === 1)
    $('#next-btn').prop('disabled', currentPage * entriesPerPage >= globApplicants.length)
}

$('#prev-btn').click(function() {
    if (currentPage > 1)
    {
        currentPage--
        renderTablePage()
    }
})

$('#next-btn').click(function() {
    if (currentPage * entriesPerPage < globApplicants.length) 
    {
        currentPage++;
        renderTablePage()
    }
})

function filter()
{
    globApplicants = []
    $.getJSON('/data/applicants.json', function (applicants) {

        applicants.forEach(applicant => {
            
            if (filter_course !== 'All Course' && filter_course !== applicant.course) return
            if (filter_year !== 'All Year Level' && filter_year !== applicant.year_level) return
            if (filter_scholarship !== 'All Scholarships' && filter_scholarship !== applicant.applied_scholar) return
            if (filter_search !== '' && !applicant.name.includes(filter_search)) return

            globApplicants.push(applicant)
        })

        renderTablePage(); 
    })
}

$(function ()
{ 
    // Fetch application data
    filter()

    let ddSponsors = $('.scholarship-sponsors')

    $.getJSON('/data/scholarships.json', function (scholarships) {  
        scholarships.forEach(row => { 

            let $li = $('<li>')
            let $a = $('<a>', {class: 'scholarship-dd dropdown-item', href: '#'}).html(row.title)
            
            $a.on('click', function() 
            {
                $('.scholarship-dd-parent').html($(this).html())
                filter_scholarship = $(this).html()

                currentPage = 1;
                filter()
            })

            $li.append($a)
            ddSponsors.append($li)
        })
    })
})

$('.course-dd').on('click', function() 
{
    $('.course-dd-parent').html($(this).html())
    filter_course = $(this).html()
    currentPage = 1;
    filter()
})

$('.year-dd').on('click', function() 
{
    $('.year-dd-parent').html($(this).html())
    filter_year = $(this).html()
    currentPage = 1;
    filter()
})

$('.scholarship-dd').on('click', function() 
{
    $('.scholarship-dd-parent').html($(this).html())
    filter_scholarship = $(this).html()
    currentPage = 1;
    filter()
})

$('.search-bar').on('input', function() {
    filter_search = $(this).val()
    currentPage = 1
    filter()
})
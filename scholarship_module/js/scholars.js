import '/vendor/jq.js';import '/vendor/jq.js';
import { convertDate } from '../../util/util.js'

let currentPage = 1;
const entriesPerPage = 10;
var globScholars = []

// Filters
var filter_course = 'All Course'
var filter_year = 'All Year Level'
var filter_scholarship = 'All Scholarships'
var filter_search = ''

// Render table
function renderTablePage() {
    let tableBody = $('.students-table-body');
    tableBody.empty();
    
    let startIdx = (currentPage - 1) * entriesPerPage
    let endIdx = startIdx + entriesPerPage
    let paginatedScholars = globScholars.slice(startIdx, endIdx)

    if (paginatedScholars <= 0)
    {
        let emptyCell = $('<td>', {class: 'w-100 p-3 text-center border border-light-subtle', colspan: 7})
        tableBody.append(emptyCell.html('No data available'))
        return
    }
    
    let idx = startIdx + 1
    paginatedScholars.forEach(student => {
        student.index = idx

        let $tr = $('<tr>')
        let $tdRowN = $('<th>', {scope: 'row'}).html(idx++)
        let $tdID = $('<td>').html(student.student_id)
        let $tdName = $('<td>').html(student.name)
        let $tdCourse = $('<td>').html(student.course)
        let $tdYear = $('<td>').html(student.year_level)
        let $tdGrade = $('<td>').html(parseFloat(student.grade).toFixed(2))
        let $tdScholar = $('<td>').html(student.applied_scholar)
        let $tdAccepted = $('<td>').html(convertDate(student.date_accepted))
        let $tdButton = $('<button>', {class: 'btn btn-success btn-sm'}).html('View')
        let $tdAction = $('<td>').html($tdButton)

        $tdButton.on('click', function (e) 
        {  
            parent.postMessage({
                header: 'scholar modal',
                data: student
            }, window.location.origin)
        })

        $tr.append($tdRowN)
        $tr.append($tdID)
        $tr.append($tdName)
        $tr.append($tdCourse)
        $tr.append($tdYear)
        $tr.append($tdGrade)
        $tr.append($tdScholar)
        $tr.append($tdAccepted)
        $tr.append($tdAction)

        tableBody.append($tr)
    })

    $('#showing-text').text(`Showing ${startIdx + 1} to ${Math.min(endIdx, globScholars.length)} of ${globScholars.length} entries`)
    $('#current-page').text(currentPage)

    $('#prev-btn').prop('disabled', currentPage === 1)
    $('#next-btn').prop('disabled', currentPage * entriesPerPage >= globScholars.length)
}

$('#prev-btn').click(function() {
    if (currentPage > 1)
    {
        currentPage--
        renderTablePage()
    }
})

$('#next-btn').click(function() {
    if (currentPage * entriesPerPage < globScholars.length) 
    {
        currentPage++;
        renderTablePage()
    }
})

function filter()
{
    globScholars = []
    $.getJSON('/data/scholarships.json', function (scholarships) {

        scholarships.forEach(scholarship => {

            scholarship.scholars.forEach(scholars => {
                if (filter_course !== 'All Course' && filter_course !== scholars.course) return
                if (filter_year !== 'All Year Level' && filter_year !== scholars.year_level) return
                if (filter_scholarship !== 'All Scholarships' && filter_scholarship !== scholarship.title) return
                if (filter_search !== '' && !scholars.name.includes(filter_search)) return
                
                scholars.applied_scholar = scholarship.title
                globScholars.push(scholars)
            })
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
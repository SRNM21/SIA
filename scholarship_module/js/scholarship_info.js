import '/vendor/jq.js';
import { getQuery } from '../../util/util.js'

let currentPage = 1;
const entriesPerPage = 10;
let globScholars = []

var isko

// Filters
var filter_course = 'All Course'
var filter_year = 'All Year Level'
var filter_search = ''

// Render table
function renderTablePage() {
    let tableBody = $('.scholars-table-body')
    tableBody.empty()
    
    let startIdx = (currentPage - 1) * entriesPerPage
    let endIdx = startIdx + entriesPerPage
    let paginatedStudents = globScholars.slice(startIdx, endIdx)

    if (paginatedStudents <= 0)
    {
        let emptyCell = $('<td>', {class: 'w-100 p-3 text-center border border-light-subtle', colspan: 7})
        tableBody.append(emptyCell.html('No data available'))
        return
    }

    let idx = startIdx + 1
    paginatedStudents.forEach(student => {
        student.index = idx

        let $tr = $('<tr>')
        let $tdRowN = $('<th>', {scope: 'row'}).html(idx++)
        let $tdID = $('<td>').html(student.student_id)
        let $tdName = $('<td>').html(student.name)
        let $tdCourse = $('<td>').html(student.course)
        let $tdYear = $('<td>').html(student.year_level)
        let $tdGrade = $('<td>').html(parseFloat(student.grade).toFixed(2))
        let $tdButton = $('<button>', {class: 'btn btn-success btn-sm'}).html('View')
        let $tdAction = $('<td>').html($tdButton)

        $tdButton.on('click', function (e) 
        {  
            parent.postMessage({
                header: 'scholar modal',
                data: student
            }, window.location.origin);
        })

        $tr.append($tdRowN)
        $tr.append($tdID)
        $tr.append($tdName)
        $tr.append($tdCourse)
        $tr.append($tdYear)
        $tr.append($tdGrade)
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

    isko.scholars.forEach(student => {

        if (filter_course !== 'All Course' && filter_course !== student.course) return
        if (filter_year !== 'All Year Level' && filter_year !== student.year_level) return
        if (filter_search.trim().toLowerCase() !== '' && !student.name.toLowerCase().includes(filter_search)) return

        globScholars.push(student)
    })

    renderTablePage(); 
}

$(function ()
{ 
    // Fetch scholarship info
    var scholarshipID = Number(getQuery("scholar_id"))

    $.getJSON('/data/scholarships.json', function (scholarships) {
        isko = scholarships[scholarshipID - 1]

        $('.scholarship-name').html(isko.title)
        $('.scholarship-name-info').html(isko.title)
        $('.scholarship-scholars').html(`${isko.scholars.length} Scholars`)

        filter()
        let badge

        switch (isko.status)
        {
            case 'Available': 
                badge = $('<span>', {class: 'scholarship-badge ms-2 badge rounded-pill text-bg-success'})
                break
            case 'Archive': 
                badge = $('<span>', {class: 'scholarship-badge ms-2 badge rounded-pill text-bg-warning'})
                break
            case 'Trash': 
                badge = $('<span>', {class: 'scholarship-badge ms-2 badge rounded-pill text-bg-danger'})
                break
        }

        $('.scholarship-name-info').append(badge.html(isko.status))

        let actions = $('.actions-dd')
        let actionList = []

        let editAction = $('<button>', {class: 'edit-sponsor-btn dropdown-item'}).html('Edit')
        editAction.on('click', function (e) 
        {  
            window.location.replace(`../../views/frames/mod/edit_sponsor.html?id=${scholarshipID}`)
        })

        let archiveAction = $('<button>', {class: 'archive-sponsor-btn dropdown-item'}).html('Archive')
        archiveAction.on('click', function (e) 
        {  
            parent.postMessage({
                header: 'archive sponsor',
                data: isko
            }, '*')
        })
        
        let restoreAction = $('<button>', {class: 'restore-sponsor-btn dropdown-item'}).html('Restore')
        restoreAction.on('click', function (e) 
        {  
            parent.postMessage({
                header: 'restore sponsor',
                data: isko
            }, '*')
        })

        let deleteAction = $('<button>', {class: 'delete-sponsor-btn dropdown-item'}).html('Delete')
        deleteAction.on('click', function (e) 
        {  
            parent.postMessage({
                header: 'delete sponsor',
                data: isko
            }, '*')
        })

        let RemPermAction = $('<button>', {class: 'perm-sponsor-btn dropdown-item'}).html('Remove Permanently')
        RemPermAction.on('click', function (e) 
        {  
            parent.postMessage({
                header: 'delete permanent sponsor',
                data: isko
            }, '*')
        })

        if (isko.status === 'Available')
        {
            actionList.push(editAction)
            actionList.push(archiveAction)
            actionList.push(deleteAction)
        }
        else if (isko.status === 'Archive')
        {
            actionList.push(restoreAction)
            actionList.push(deleteAction)
        }
        else if (isko.status === 'Trash')
        {
            actionList.push(restoreAction)
            actionList.push(RemPermAction)
        }

        actionList.forEach(e => actions.append(e))
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

$('.search-bar').on('input', function() {
    filter_search = $(this).val()
    currentPage = 1
    filter()
})
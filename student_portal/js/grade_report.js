import '/vendor/jq.js'

const accord = $('#all-grades')
const program = new Map()
const tableHeader = ['COURSE NAME', 'COURSE DESCRIPTION', 'PREREQ', 'LEC.', 'LAB.', 'UNITS', 'HRS', 'GRADE', 'REMARKS']

program.set('FIRST YEAR', [
    ['FIRST SEMESTER, AY 2022-2023', [
        ['GE 003', 'The Contemporary World with Peace Education', 'None', 3, 0, 3, 3, null, null],
        ['GE 006', 'Art Appreciation', 'None', 3, 0, 3, 3, null, null],
        ['GE 004', 'Mathematics in the Modern World', 'None', 3, 0, 3, 3, null, null],
        ['COMP 101', 'Introduction to Computing', 'None', 2, 1, 3, 5, null, null],
        ['COMP 102', 'Fundamentals of Programming (C++)', 'None', 2, 1, 3, 5, null, null],
        ['PE 101', 'Wellness and Fitness', 'None', 2, 0, 2, 2, null, null],
        ['NSTP 101', 'National Service Training Program (CWTS/ROTC)', 'None', 3, 0, 3, 3, null, null]
    ]],
    ['SECOND SEMESTER, AY 2022-2023', [
        ['GE 001', 'Understanding the Self', 'None', 3, 0, 3, 3, null, null],
        ['GE 005', 'Purposive Communication', 'None', 3, 0, 3, 3, null, null],
        ['GE 007', 'Science, Technology and Society', 'None', 3, 0, 3, 3, null, null],
        ['GEE 001', 'GE Elective 1', 'None', 3, 0, 3, 3, null, null],
        ['COMP 103', 'Intermediate Programming (Java)', 'COMP 102', 2, 1, 3, 5, null, null],
        ['IT 101', 'Discrete Mathematics', 'COMP 101', 3, 0, 3, 3, null, null],
        ['PE 102', 'Self-Defense', 'None', 2, 0, 2, 2, null, null],
        ['NSTP 102', 'National Service Training Program (CWTS/ROTC)', 'None', 3, 0, 3, 3, null, null]
    ]],
])

program.set('SECOND YEAR', [
    ['FIRST SEMESTER, AY 2023-2024', [
        ['GE 008', 'Ethics', 'None', 3, 0, 3, 3, null, null],
        ['GEE 002', 'GE Elective 2', 'None', 3, 0, 3, 3, null, null],
        ['COMP 104', 'Data Structures and Algorithms', 'COMP 103', 2, 1, 3, 5, null, null],
        ['COMP 105', 'Information Management', 'COMP 103', 2, 1, 3, 5, null, null],
        ['IT 102', 'Quantitative Methods', 'IT 101', 3, 0, 3, 3, null, null],
        ['IT 201', 'IT Elective: Platform Technologies', 'COMP 103', 2, 1, 3, 5, null, null],
        ['IT 202', 'IT Elective: Object-Oriented Programming (VB.Net)', 'COMP 103', 2, 1, 3, 5, null, null],
        ['PE 103', 'Individual/Dual Games and Sports', 'None', 2, 0, 2, 2, null, null]
    ]],
    ['SECOND SEMESTER, AY 2023-2024', [
        ['GE 002', 'Readings in Philippine History with Indigenous Peoples\' Education', 'None', 3, 0, 3, 3, null, null],
        ['GEE 003', 'GE Elective 3', 'None', 3, 0, 3, 3, null, null],
        ['IT 103', 'Advanced Database Systems', 'COMP 105', 2, 1, 3, 5, null, null],
        ['IT 104', 'Integrative Programming and Technologies I', 'IT 201, IT 202', 2, 1, 3, 5, null, null],
        ['IT 105', 'Networking I', 'IT 201', 2, 1, 3, 5, null, null],
        ['IT 301', 'Web Programming', 'COMP 103', 2, 1, 3, 5, null, null],
        ['COMP 106', 'Applications Development and Emerging Technologies', 'COMP 105', 2, 1, 3, 5, null, null],
        ['PE 104', 'Team Games and Sports', 'None', 2, 0, 2, 2, null, null]
    ]],
])

program.set('THIRD YEAR', [
    ['FIRST SEMESTER, AY 2024-2025', [
        ['GE 009', 'Rizal\'s Life and Works', 'None', 3, 0, 3, 3, null, null],
        ['IT 106', 'Systems Integration and Architecture 1', 'IT 104', 2, 1, 3, 5, null, null],
        ['IT 107', 'Networking II', 'COMP 103', 2, 1, 3, 5, null, null],
        ['IT 302', 'Software Engineering', 'COMP 103', 2, 1, 3, 5, null, null],
        ['IT 303', 'Technopreneurship', 'IT 101', 3, 0, 3, 3, null, null],
        ['IT 304', 'IT Professional Ethics', 'COMP 103', 2, 1, 3, 5, null, null],
        ['IT 305', 'Web Development', 'COMP 103', 2, 1, 3, 5, null, null],
    ]],
])

// populate grades table
program.forEach((semesters, year) => {

    // create accordion item
    let classRdy = year.toLowerCase().replace(/\s+/g, '-')

    let accordItem = $('<div>', {class: 'accordion-item'})
    let accordHeader = $('<h2>', {class: 'accordion-header'})
    let accordBtn = $('<button>', {class: 'accordion-button', type: 'button'})   
    
    let accordCollapse = $('<div>', {id: classRdy, class: 'accordion-collapse collapse'})
    let accordBody = $('<div>', {class: 'accordion-body d-flex flex-column gap-4'})

    accordBtn.attr('data-bs-toggle', 'collapse')
    accordBtn.attr('data-bs-target', `#${classRdy}`)
    accordBtn.attr('aria-expanded', 'true')
    accordBtn.attr('aria-controls', classRdy)
    accordBtn.html(year) 

    // decorate accordion body with data

    semesters.forEach((year) => {
        let sem = year[0]
        let courses = year[1]

        let wrapper = $('<div>', {class: 'd-flex flex-column p-2 gap-2'})

        wrapper.append(`<p>${sem}</p>`)

        let $table = $('<table>', {class: 'w-100'})
        let $thead = $('<thead>')
        let $tbody = $('<tbody>')

        // add header data 
        tableHeader.forEach(data => {
            let $th = $('<th>', {class: 'border border-black p-2 text-center'})
            $thead.append($th.html(data))
        })

        courses.forEach(course => {
            let $tr = $('<tr>')

            course.forEach(data => {
                let $td = $('<td>', {class: 'border border-black p-2 text-center'})
                $tr.append($td.html(data))
            
            })

            $tbody.append($tr)
        })
        
        $table.append($thead)
        $table.append($tbody)
        wrapper.append($table)
        accordBody.append(wrapper)
    })

    accordCollapse.append(accordBody)
    accordHeader.append(accordBtn)
    accordItem.append(accordHeader)
    accordItem.append(accordCollapse)

    accord.append(accordItem)
})
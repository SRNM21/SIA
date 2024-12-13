export const studentGrade = 1.25
export const studentApplication = {
    id: 1,
    image: "/assets/images/PASIG.png",
    title: "Academic",
    description: "Academic scholarships are merit-based awards granted to students with outstanding academic achievements. These scholarships aim to support high-performing individuals in pursuing their educational goals by covering tuition fees, books, or other expenses. Recipients are selected based on grades, standardized test scores, and exceptional intellectual potential.",
    status: 'Available',
    required_grade: 1.25,
}

// * FUNCTIONS

export function getQuery(variable)
{
    var query = window.location.search.substring(1)
    var vars = query.split('&')

    for (var i = 0; i < vars.length; i++) 
    {
        var pair = vars[i].split('=')
        if (pair[0] == variable) { return pair[1] }
    }

    return(false);
}

export function convertDate(date) 
{
    let parts = date.split('-')
    let year = parts[0]
    let month = parseInt(parts[1])
    let day = parts[2]

    let months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    return `${months[month - 1]} ${day}, ${year}`
}
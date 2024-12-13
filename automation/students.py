import random
import json

def generate_students():
    courses = [
        'Bachelor in Elementary Education',
        'Bachelor in Secondary Education',
        'Bachelor of Science in Nursing',
        'Bachelor of Science in Electronics Engineering',
        'Bachelor of Science in Information Technology',
        'Bachelor of Science in Computer Science',
        'Bachelor of Science in Hospitality Management',
    ]
    
    scholarships = [
        'ACADEMIC',
        'ARTS AND DESIGN SCHOLAR',
        'BOARD AND BAR EXAMINATION REVIEW ASSISTANCE',
        'CASH INCENTIVES (LATIN HONORS AND RECOGNITIONS)',
        'CHIP IN',
        'PAGASA',
        'HYUNDAI',
        'MERALCO',
        'OUT OF SCHOOL LEARNER (OSL)',
        'PAGASA',
        'PRIVATE SCHOOL- ENDORSED (PSE)',
        'SK OFFICIAL',
        'SPORTS SCHOLAR',
    ]

    grades = [1.0, 1.25, 1.50]

    year_levels = ['1st Year', '2nd Year', '3rd Year', '4th Year']
    
    genders = ['Male', 'Female']

    surnames = [
        'Santos',
        'Reyes',
        'Cruz',
        'Mendoza',
        'Garcia',
        'Dela',
        'Ramos',
        'Lopez',
        'Fernandez',
        'Morales',
        'Villanueva',
        'Bautista',
        'Castillo',
        'Jimenez',
        'Gonzales',
        'Alvarado',
        'Aquino',
        'Salazar',
        'Navarro',
        'Castillo',
        'Calderon',
        'Flores',
        'Dominguez',
        'Delos',
        'Gutierrez',
        'Hidalgo',
        'Herrera',
        'Castro',
        'Vargas',
        'Panganiban',
        'Silvestre',
        'Vergara',
        'Tolentino',
        'Tan',
        'Ong',
        'Lim',
        'Uy',
        'Chua',
        'Co',
        'Sy',
        'Yu',
        'Go',
        'Sison',
        'Quintana',
        'Abad',
        'Luna',
        'Rosales',
        'Espinosa',
        'Cardenas',
        'Francisco',
        'Velasquez',
        'Aguilar',
        'Arceo',
        'De',
        'Alvarez',
        'Cabrera',
        'Estrada',
        'Francisco',
        'Valdez',
        'Ricafort',
        'Soriano',
        'Villamor',
        'Sandoval',
        'Jacinto',
        'Javier',
        'Santiago',
        'Olivares',
        'Escobar',
        'Carpio',
        'Peralta',
        'Amador',
        'Basilio',
        'Clemente',
        'Evangelista',
        'Fabros',
        'Ignacio',
        'Labrador',
        'Magno',
        'Nepomuceno',
        'Ocampo',
        'Panlilio',
        'Quinto',
        'Remulla',
        'Sarmiento',
        'Tabora',
        'Umali',
        'Valencia',
        'Yuzon',
        'Zabala',
        'Balagtas',
        'Camacho',
        'Dizon',
        'Elizalde',
        'Feliciano',
        'Gonzaga',
        'Hermosa',
        'Ilagan',
        'Jovellanos',
        'Katigbak',
        'Legaspi'
    ]

    first_names_female = [
        'Althea',
        'Katrina',
        'Alyanna',
        'Janna',
        'Angelica',
        'Bianca',
        'Charlene',
        'Patricia',
        'Sophia',
        'Camille',
        'Lyka',
        'Janine',
        'Hannah',
        'Celine',
        'Trisha',
        'Daphne',
        'Regina',
        'Vanessa',
        'Arlene',
        'Ashley',
        'Beatriz',
        'Carmela',
        'Daniela',
        'Eliza',
        'Faith',
        'Grace',
        'Helena',
        'Irene',
        'Jasmine',
        'Karen',
        'Lara',
        'Melissa',
        'Nicole',
        'Olivia',
        'Paula',
        'Queenie',
        'Rachel',
        'Sabrina',
        'Therese',
        'Ursula',
        'Valerie',
        'Winnie',
        'Xandra',
        'Ysabel',
        'Zoe',
        'Danica',
        'Liana',
        'Rachelle',
        'Sylvia',
        'Annika',
        'Bernadette',
        'Clarisse',
        'Desiree',
        'Eloisa',
        'Florianne',
        'Gwyneth',
        'Hyacinth',
        'Isabela',
        'Jemima',
        'Kristine',
        'Leanne',
        'Monique',
        'Nadine',
        'Odessa',
        'Pearl',
        'Quenby',
        'Roselle',
        'Samara',
        'Tanya',
        'Unity',
        'Verona',
        'Wilhelmina',
        'Xyla',
        'Yvette',
        'Zelda',
        'Amara',
        'Brigitte',
        'Cheska',
        'Doreen',
        'Erielle',
        'Felicia',
        'Gianna',
        'Hilda',
        'Isla',
        'Jacinta',
        'Kaila',
        'Lorelei',
        'Mylene',
        'Nerissa',
        'Odetta',
        'Pia',
        'Quinn',
        'Rina',
        'Selene',
        'Trixie',
        'Una',
        'Vanessa',
        'Winter',
        'Zinnia'
    ]
    
    first_names_male = [
        'Juan',
        'Miguel',
        'Jose',
        'Carlo',
        'Mark',
        'Alonzo',
        'Andre',
        'Rafael',
        'Daniel',
        'Gabriel',
        'Angelo',
        'Marco',
        'Elijah',
        'Vincent',
        'Nathan',
        'Dominic',
        'Benedict',
        'Samuel',
        'Adrian',
        'Christian',
        'Julius',
        'Lorenzo',
        'Kevin',
        'Patrick',
        'Ryan',
        'Bryan',
        'Cedric',
        'Leo',
        'Albert',
        'Emmanuel',
        'Francis',
        'Jeremiah',
        'Oscar',
        'Anthony',
        'Victor',
        'Xavier',
        'Zachary',
        'Felix',
        'Ronan',
        'Tristan',
        'Damian',
        'Cyrus',
        'Quentin',
        'Sebastian',
        'Tobias',
        'Eugene',
        'Noel',
        'Felix',
        'Isidro',
        'Joaquin',
        'Alfonso',
        'Dennis',
        'Enrique',
        'Ferdinand',
        'Gregorio',
        'Harvey',
        'Ignacio',
        'Jasper',
        'Kenneth',
        'Leon',
        'Maximo',
        'Nathaniel',
        'Oliver',
        'Paolo',
        'Quentin',
        'Rodolfo',
        'Salvador',
        'Tomas',
        'Urbano',
        'Vito',
        'William',
        'Xander',
        'Yuri',
        'Zandro',
        'Armando',
        'Bonifacio',
        'Celestino',
        'Darius',
        'Eduardo',
        'Federico',
        'Guillermo',
        'Homer',
        'Isagani',
        'Jonas',
        'Kelvin',
        'Lucas',
        'Manuel',
        'Nico',
        'Orlando',
        'Pedro',
        'Ricardo',
        'Silas',
        'Teodoro',
        'Ulises',
        'Valentino',
        'Wenceslao',
        'Zoren',
        'Emil',
        'Alex',
        'Julius'
    ]

    middle_initials = [chr(i) for i in range(65, 91)]  # A-Z

    scholars = []
    
    for k,v in enumerate(scholarships):
        students = []
    
        for i in range(1, random.randint(200, 500)):
            surname = random.choice(surnames)
            gender = random.choice(genders)
            first_name = random.choice(first_names_male if gender == 'Male' else first_names_female)
            middle_initial = random.choice(middle_initials)

            course = random.choice(courses)
            grade = random.choice(grades)
            year_level = random.choice(year_levels)
            
            applied_month = random.randint(9,12)
            applied_days = random.randint(1, 28)
            accepted_month = random.randint(1,7)
            accepted_days = random.randint(1, 28)
            
            applied_scholar = random.choice(scholarships) # For applicants

            students.append({
                'name': f'{surname}, {first_name} {middle_initial}.',
                'gender': gender,
                'student_id': f'22-{str(random.randint(1, 999)).zfill(5)}',
                'course': course,
                'year_level': year_level,
                'grade': grade,
                # 'applied_scholar': applied_scholar, # Add for applicants
                'date_applied': f'2023-{applied_month}-{applied_days}',
                'date_accepted': f'2024-{accepted_month}-{accepted_days}' # Remove for applicants
            })
        
        scholars.append({
            'id': k + 1,
            'image': '/assets/images/PLP_Logo.png',
            'title': v,
            'description': 'Lorem ipsum odor amet, consectetuer adipiscing elit. Malesuada sapien lorem praesent vehicula purus penatibus. Morbi consectetur vehicula augue aliquet id aenean nam diam cubilia. Tincidunt vehicula condimentum sollicitudin a fusce. Convallis in neque habitasse efficitur quisque hendrerit curabitur enim.',
            'status': 'Available',
            'required_grade': 1.25,
            'requirements': {
                "new": [
                    "Proof of Enrollment with the current school",
                    "Latest Report Card",
                    "Proof of Income / ITR / Affidavit of Non-Filing of ITR",
                    "Latest Barangay Certificate of Residency",
                    "Proof of Identity / Valid ID",
                    "1 x 1 Picture (to be attached in the Application Form)",
                    "300-word essay"
                ],
                "renewal": [
                    "Proof of Enrollment with the current school",
                    "Latest Report Card",
                    "Proof of Income / ITR / Affidavit of Non-Filing of ITR",
                    "Latest Barangay Certificate of Residency",
                    "Proof of Identity / Valid ID",
                    "1 x 1 Picture (to be attached in the Application Form)"
                ]
            },
            "scholars": students
        })

    return scholars

students = generate_students()
output_file = 'C:/Users/acer/VSCode/Collab/automation/data.json'

with open(output_file, 'w') as file:
    json.dump(students, file, indent=4)

output_file
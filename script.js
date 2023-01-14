
let form = document.getElementById("form")
let name_field = document.getElementById("name")
let age_field = document.getElementById("age")
let profession_field = document.getElementById("profession")
let error_field = document.getElementById("error")
let success_field = document.getElementById("success")
let emp_count = document.getElementById("emp_count")
let employee_table_body = document.getElementById("employee_table_body")

const SUCCESS = "success"
const FAIL = "fail"

let employees = []
let table_data = ""

form.addEventListener('submit', submit_form)

function submit_form(event) {
    event.preventDefault()
    let all_fields_entered = validate_details()
    if(all_fields_entered) {
        let new_employee = get_employee_details()
        store_data(new_employee)
        check_emp_count()
        update_table(new_employee)
        add_event_listners()
        display_status(SUCCESS)
        form.reset()
    }
    else {
        display_status(FAIL)
    }
}

function check_emp_count() {
    if(employees.length == 0)
        emp_count.style.display = 'block'
    else
        emp_count.style.display = 'none'        
}

function add_event_listners() {
    let btns = document.querySelectorAll("button")
    btns.forEach((btn, index) => btn.addEventListener('click', () => delete_employee(index)));
}

function delete_employee(index) {
    employees.splice(index, 1)
    check_emp_count()
    display_table()
    add_event_listners()
}

function display_table() {
    table_data = ""
    employees.map(employee => {
        let new_row = build_new_row(employee)
        table_data += new_row
    })
    employee_table_body.innerHTML = table_data
}

function update_table(new_employee) {
    let new_row = build_new_row(new_employee)
    table_data += new_row
    employee_table_body.innerHTML = table_data
}

function build_new_row(new_employee) {
    let {id, name, profession, age} = new_employee
    let new_row = ""
    new_row += `<tr>
    <td>${id}</td>
    <td>${name}</td>
    <td>${profession}</td>
    <td>${age}</td>
    <td><button>Delete</button></td>
    </tr>
    `
    return new_row
}

function store_data(employee) {
    employees.push(employee)
}

function get_employee_details() {
    let employee = {}
    let last_index = employees.length - 1
    let last_employee = employees[last_index]
    employee.id = (last_index < 0) ? 1 :  last_employee.id + 1
    employee.name = name_field.value
    employee.profession = profession_field.value
    employee.age = age_field.value
    return employee
}

function display_status(status) {
    let field = (status == SUCCESS) ? success_field : error_field;
    field.style.display = 'block' 
    setTimeout(() => {
        field.style.display = 'none'            
    }, 2000);
}

function validate_details() {
    let name = name_field.value
    let age = age_field.value
    let profession = profession_field.value

    if(name == "" || age == "" || profession == "")
        return false
    return true
}
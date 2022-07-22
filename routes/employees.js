import express, { request, response } from 'express'
const router = express.Router();
let employees = [];
const addEmployeeModels = () => {
    employees = [
        { "id": 1, "fname": "Tony", "lname": "Jabroney", "dept": "HR"  },
        { "id": 2, "fname": "Curly", "lname": "theThird", "dept": "Engineering"  },
        { "id": 3, "fname": "Kristen", "lname": "Smith", "dept": "C-Suite"  }
    ]
}

console.log("employee length = " + employees.length);
//adds a list of employee models when there list is empty
if(employees.length == 0){
    addEmployeeModels();
}

//GET Functions
//all crud functions must have request,response to operate properly
const queryEmployees = (request, response) => {
    console.log('Query Employees: employees = ' + JSON.stringify(employees));
    response.send(employees);
}


const queryEmployeeById = (request, response) => {
    const { id } = request.params;
    let employee = employees.find(employee => employee.id == id);
    console.log('Query User By Id: id=' + id + ', employee=' + employee);
    response.send(employee);
}

//POST Functions
const createEmployee = (request, response) => {
    let employee = request.body;
    //employees = [...employees, employee];
    
    employees.push(employee);
    console.log('New Employee Created: employee =' + employee);
    console.log('New Employee Created: employees =' + JSON.stringify(employees));
    response.send({ "rows": 1 });
}

//PUT Functions
const updateEmployee = (request, response) => {
    const { id } = request.params;
    const { fname } = request.body;
    const { lname } = request.body;
    const { dept } = request.body;
    let employee = employees.find(employee => employee.id == id)
    if(!employee){
        response.send({ "rows" : 0});
        return;
    }
    if(fname) employee.fname = fname;
    if(lname) employee.lname = lname;
    if(dept) employee.dept = dept;
    response.send({ "rows": 1 });
}

//DELETE Functions
const deleteEmployee = (request, response) => {
    const { id } = request.params;
    employees = employees.filter(employee => employee.id != id)
    console.log('Deleted from Employees: id=' + id);
    response.send({ "rows": 1});
}
router.get('/', queryEmployees) //localhost:4300/employees GET
router.get('/:id', queryEmployeeById) //localhost:4300/employees/id GET
router.post('/', createEmployee)  //localhost:4300/employees/ POST
router.put('/:id', updateEmployee)  //localhost:4300/employees/id PUT
router.delete('/:id', deleteEmployee)  //localhost:4300/employees/id DELETE
export default router;



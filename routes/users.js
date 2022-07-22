import express from 'express'
const router = express.Router();
let users = []
const addDefaultUsers = () => {
    users = [
        { "id": 1, "fname": "Bruce", "lname": "Banner" },
        { "id": 2, "fname": "Diana", "lname": "Price" },
        { "id": 3, "fname": "Clark", "lname": "Kent" },
        { "id": 4, "fname": "Tony", "lname": "Tony" }
    ]
}
console.log("users.length="+ users.length)
if (users.length == 0) {
    addDefaultUsers();
}

const queryUsers = (request, response) => {      
    console.log('queryUsers: users=' + JSON.stringify(users))
    response.send(users);
}
const queryUser = (request, response) => {
    const { id } = request.params;
    let user = users.find(user => user.id == id)
    console.log('queryUser: user=' + JSON.stringify(user) + ", id=" + id);
    response.send(user);
}
const insertUser = (request, response) => {
    let user = request.body;
    users = [...users, user]
    console.log('insertUser: user=' + JSON.stringify(user))
    response.send({ "rows": 1 });
}
const deleteUser = (request, response) => {
    const { id } = request.params;
    users = users.filter(user => user.id != id)
    console.log('deleteUser: id=' + id);
    response.send({ "rows": 1 });
}

const updateUser = (request, response) => {
    const { id } = request.params;
    const { fname } = request.body;
    const { lname } = request.body;
    let user = users.find(user => user.id == id)
    if (!user || user == null) {
        response.send({ "rows": 0 });
        return;
    }
    if (fname) user.fname = fname;
    if (lname) user.lname = lname;
    response.send({ "rows": 1 });
}
router.get('/', queryUsers)              // localhost:4300/users/      GET
router.get('/:id', queryUser)            // localhost:4300/users/123   GET
router.post('/', insertUser)             // localhost:4300/users/      POST
router.put('/:id', updateUser)           // localhost:4300/users/123   PUT
router.delete('/:id', deleteUser)        // localhost:4300/users/123   DELETE
export default router
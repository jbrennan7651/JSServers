import express from 'express'
import bodyParser from 'body-parser'
import userRoute from './routes/users.js'
import productsRoute from './routes/products.js'
import employeeRoute from './routes/employees.js'


const app = express();
const port = 4300;

const home = (request, response) => {
    response.send('home page')
}

app.use( bodyParser.urlencoded({extended:true}));
app.use( bodyParser.json());
app.get('/', home) //localhost:4300/
app.use('/products', productsRoute) //localhost:4300/products
app.use('/employees', employeeRoute) //localhost:4300/employees
app.use('/users', userRoute) //localhost:4300/users
app.listen(port, () => console.log(`server running on http://127.0.0.1:${port}/`))
import express from 'express'
const router = express.Router();
const products = (request, response) => {
    response.send(`<html><head><title>products Page</title></head><body><table><h2>Current products</h2><thead><tr><th>first Name</th><th>Last Name</th></tr></thead><tbody><tr><td>${ user.fname }</td><td>${user.lname}</td></tr></tbody></table></body></html>`)

}
router.get('/', products)
export default router;
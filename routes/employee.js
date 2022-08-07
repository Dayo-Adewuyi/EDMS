const express = require('express')
const employee = require('../models/employee')
const router = express.Router()
const Employee = require('../models/employee')


router.get('/', (req, res)=>{
    Employee.find({})
        .then((employee)=>{
            res.render('index', {employees: employee})
        })
        .catch((error)=>{
            console.log(error)
        })
    
})

router.get('/employee/new', (req, res)=>{
    res.render('new')
})

router.get('/employee/search', (req,res)=> {
    res.render('search', {employee:""});
});

router.get('/employee', (req, res)=>{
    let searchQuery = {name: req.query.name}

    Employee.findOne(searchQuery)
        .then((employee) => {
            res.render('search', {employee: employee})
        })
        .catch((error)=>{
            req.flash('error_msg', 'an error occured')
            res.redirect('/')
        })
})

router.get('/edit/:id', (req,res)=>{
    
    let employeeId = {_id : req.params.id}
    console.log(employeeId)

    Employee.findOne(employeeId)
        .then((employee)=>{
            res.render('edit', {employee: employee})
        })
        .catch((error)=>{
            req.flash('error_msg', 'an error occured')
            res.redirect('/')
        })
})

router.post('/employee/new', (req, res)=>{

 let newEmployee = {
    name: req.body.name,
    designation: req.body.designation,
    salary: req.body.salary
 }

 Employee.create(newEmployee)
    .then(employee =>{
        req.flash('success_msg', ` New Employee with Id ${employeeId} has been deleted`)
        res.redirect('/')
    })
    .catch(err => {
        req.flash('error_msg', 'an error occured')
        res.redirect('/')})
})


router.put('/edit/:id', (req, res)=>{
    let employeeId = {_id : req.params.id}

    Employee.updateOne(employeeId, {$set: {
        name: req.body.name,
        designation: req.body.designation,
        salary: req.body.salary
    }})
    .then(employee => {
        req.flash('success_msg', `Employee with Id ${employeeId} has been updated`)
        res.redirect('/')
    })
    .catch(err => {
        req.flash('error_msg', 'an error occured')
        res.redirect('/')
    })
})

router.delete('/delete/:id', (req, res)=>{
    let employeeId = {_id : req.params.id}

    Employee.deleteOne(employeeId)
        .then(employee => {
            req.flash('success_msg', `Employee with Id ${employeeId} has been deleted`)
            res.redirect('/')
        })
        .catch(err => {
            req.flash('error_msg', 'an error occured')
            res.redirect('/')
        })
})


module.exports = router;
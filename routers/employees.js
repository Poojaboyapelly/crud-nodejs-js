const express = require('express')
const router =express.Router()
const Employee = require('../models/employee');


router.get('/',async(req,res) => {

 try
 {
    const employees = await Employee.find()
    res.json(employees)

 }
 catch(err)
 {
    res.send('Error' + err)
 }

});


router.get('/:employeeId', async (req, res) => {
    try {
        const employees = await Employee.findOne({
            employeeId: req.params.employeeId,
        });
        res.json(employees);

    } catch (err) {
        res.send('Error' + err);
    }
});

router.get('/', async (req, res) => {
    try {
        
        const { department, sort } = req.query;
        
        
        console.log('Department:', department); 

        const query = {};
        if (department) {
            query.department = department;
        }
        
        console.log('Query:', ); 

        const sortOptions = {};
        if (sort === 'desc') {
            sortOptions.name = -1; 
        } else {
            sortOptions.name = 1; 
        }

        const employees = await Employee.find(query).sort(sortOptions);

        
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/',async(req,res) => {
const emp=new Employee({
    employeeId: req.body.employeeId,
    employeename: req.body.employeename,
    dob:req.body.dob,
    department: req.body.department,
    isActive:req.body.isActive,
    employmentType: req.body.employmentType
});
try {
    const e1 = await emp.save();
    res.json(e1);
} catch (err) {
    res.send('Error' + err);
}
});


router.put('/:employeeId', async (req, res) => { 
    try {
        const updatedEmployee = await Employee.findOneAndUpdate(
            { employeeId: req.params.employeeId },
            req.body,
            { new: true }
        );

        if (!updatedEmployee) {
            res.status(404).json({ error: 'Employee not found' });
            return;
        }

        res.json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
  

router.delete('/:employeeId', async (req, res) => {
    try {
        const employee = await Employee.findOneAndDelete({
            employeeId: req.params.employeeId,
            isActive: true,
        });

        if (!employee) {
            res.status(404).json({ error: 'Employee not found or not active' });
            return;
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router
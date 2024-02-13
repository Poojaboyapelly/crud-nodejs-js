require('dotenv').config()
const express = require('express')
const router = express.Router()
const Employee = require('../models/employee');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Session = require('../models/sessions');
// const cookieParser = require('cookie-parser');
// const cookie = require('cookieParser')

router.get('/', async (req, res) => {

    try {
        const employees = await Employee.find()
        res.json(employees)

    }
    catch (err) {
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

        console.log('Query:',);

        const sortOptions = {};
        if (sort === 'desc') {
            sortOptions.employeename = -1;
        } else {
            sortOptions.employeename = 1;
        }

        const employees = await Employee.find(query).sort(sortOptions);


        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/', async (req, res) => {
    const emp = new Employee({
        employeeId: req.body.employeeId,
        employeename: req.body.employeename,
        dob: req.body.dob,
        department: req.body.department,
        isActive: req.body.isActive,
        employmentType: req.body.employmentType,
        role: req.body.role,
        password: req.body.password,
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

// Signup method
router.post('/employee/signup', async (req, res) => {

    function containsSpecialChars(str) {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return specialChars.test(str);
      }
  try {
    const existingEmployee = await Employee.findOne({ employeeId: req.body.employeeId });
    if (!req.body.password || !containsSpecialChars(req.body.password)) {
        return res.status(400).json({ error: 'Password must contain at least 1 special character and not be empty' });
      }

    if (existingEmployee) {
      return res.status(400).json({ error: 'Employee ID already exists' });
    }

    const employee = new Employee(req.body);
    await employee.save();
    console.log('User created successfully . Please signin ');
    return res.status(200).json({created: true});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Signin method
router.post('/employee/signin', async (req, res) => {
  try {
    const employee = await Employee.findOne({ employeeId: req.body.employeeId });
    console.log()

    if (!employee) {
      return res.status(401).json({ error: 'Invalid employee ID' });
    }

    const passwordMatch = await bcrypt.compare(req.body.password, employee.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const payload = { employeeId: employee.employeeId, role: employee.role };
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 600 });

    const session = new Session({
        employeeId: employee.employeeId,
        token: token
      });
    await session.save();
    res.status(200).json({auth :true ,session});
    // res.status(200).json({ auth: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/validateToken', async (req, res) => {
    // let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.ACCESS_TOKEN_SECRET;
  
    try {
      // const token = req.header(Bearer);
      const authHeader = req.headers["authorization"]
      const token = authHeader && authHeader.split(' ')[1]
      console.log(token)
  
      const verified = jwt.verify(token, jwtSecretKey);
      if (verified) {
        return res.send("Successfully Verified");
      } else {
        // Access Denied
        return res.status(401).send(error);
      }
    } catch (error) {
      // Access Denied
      return res.status(401).send(error);
    }
  })


  router.post('/logout', async (req, res) => {
    try {
      const { employeeId } = req.body;

      if (!employeeId) {
        return res.status(400).json({ message: 'Employee ID not provided' });
      }
  
      await Session.findOneAndDelete({ employeeId });

      return res.status(200).json({ message: 'Logout successful' });

    } catch (error) {

      console.error('Logout error:', error);
      
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  

module.exports = router;

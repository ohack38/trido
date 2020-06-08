const express = require('express');
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');
const { check, validationResult } = require('express-validator');

const Todo = require('../models/Todos');
const User = require('../models/User');

// @route GET api/todos
// @description get all todos
// @access private

router.get('/', requireLogin, async (req,res) => {
    try{
        const todos = await Todo.find({ user: req.user.id});
        res.json(todos);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error')
    }
});


// @route POST api/todos
// @description add a todos
// @access private

router.post('/', [requireLogin,[
    check('title', 'Title is Required').not().isEmpty()
]], async (req,res) => {
    const errors = validationResult(req);
    //returns array of errors
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    // add todo
    const { title } = req.body
})





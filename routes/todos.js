const express = require('express');
const mongoose = require('mongoose');
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
    const { title, description, time } =  req.body;

    try {
        const addTodo = new Todo({
            title,
            description,
            time,
            user: req.user.id
        });
        const todo = await addTodo.save();
        res.json(todo);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }

})

// update a todo

router.put('/:id', requireLogin , async(req, res) => {
    const { title, description, time } = req.body;
    const todoField = [];
    if(title) todoField.title = title;
    if(description) todoField.description = description;
    if(time) todoField.time = time;

    try {
        let todo = await Todo.findById(req.params.id);
        if(!todo){
            return res.status(404).json({ msg: 'Todo not found'});
        } 
        // checs if user owns choosen data
        if(todo.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'Not Auhtorized'});
        }
        // sets data to 'todoField' and updates, if not existing creates new
        todo = await Todo.findByIdAndUpdate(req.params.id,
            { $set: todoField },
            { new: true });

        res.json(todo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

})

// delete a todo

router.delete('/:id', requireLogin, async(req, res) => {
    try {
        let todo = await Todo.findById(req.params.id);
        if(!todo){
            return res.status(404).json({ msg: 'Todo not found'});
        } 
        // checs if user owns choosen data
        if(todo.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'Not Auhtorized'});
        }
        // finds and deletes the 'todo' with correct id
        await Todo.findByIdAndRemove(req.params.id);

        res.json({msg: 'Contact removed'});
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


module.exports = router;
import jwt from 'jsonwebtoken';
import express from 'express';
import { User,Todo } from '../database';
import { authenticateJwt, secretkey } from '../middleware/authVerify';
import { z } from 'zod';

const router = express.Router();

const signupZod = z.object({
  username:z.string().min(5),
  email:z.string().email(),
  password:z.string().min(5)
})

router.post('/signup',async(req,res)=>{
    const {username,email,password} = signupZod.parse(req.body);
    const user = await User.findOne({email});
    if(user){
        res.status(403).json({message:"User already exists"});
    }
    else{
        const newUser = new User({username,email,password});
        await newUser.save();
        const token = jwt.sign({ id: newUser._id },secretkey,{expiresIn:'1hr'});
        res.json({message:"User created successfully",token});
    }
});

router.post('/signin',async(req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email,password});
    if(user){
        const token = jwt.sign({ id: user._id },secretkey,{expiresIn:'1h'});
        res.json({message:"User Logined Successfully",token});
    }
    else{
        res.status(403).json({message:"Authentication Fails"});
    }
});

router.get('/me',authenticateJwt,async(req,res)=>{
  const userId = req.headers["userId"];
  const user = await User.findOne({_id: userId })
  if (!user) {
    res.status(403).json({msg: "User doesnt exist"})
    return
  }
  res.json({
      username: user.username
  })
})

router.post('/addtodos', authenticateJwt, (req, res) => {
  const { title, description } = req.body;
  const userId = req.headers["userId"];

  const newTodo = new Todo({ title, description, userId });

  newTodo.save()
    .then((savedTodo) => {
      res.status(201).json(savedTodo);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to create a new todo' });
    });
});


  router.get('/todos',authenticateJwt, (req, res) => {
    const userId = req.headers["userId"];
  
    Todo.find({ userId })
      .then((todos) => {
        res.json(todos);
      })
      .catch((err) => {
        res.status(500).json({ error: 'Failed to retrieve todos' });
      });
  });
  
  router.get('/todos/:todoId',authenticateJwt,async(req,res)=>{
    const { todoId } = req.params;
    const todo = await Todo.findById(todoId);
    res.json({ todo })
  })

  router.patch('/todos/:todoId', authenticateJwt, async(req, res) => {
    const { todoId } = req.params;
    const updateTodo = await Todo.findByIdAndUpdate(todoId, req.body, { new: true });
    if (updateTodo) {
      res.json({ message: 'Course updated successfully' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  });
    

  router.delete('/todos/:todoId', authenticateJwt, async(req, res) => {
    const { todoId } = req.params;
    const userId = req.headers["userId"];
  
    const deleteTodo = await Todo.findOneAndDelete({ _id: todoId, userId })
    if (!deleteTodo) {
          return res.status(404).json({ error: 'Todo not found' });
        }
        res.json(deleteTodo);
      });

export default router;
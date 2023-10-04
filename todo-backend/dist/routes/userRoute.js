"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const database_1 = require("../database");
const authVerify_1 = require("../middleware/authVerify");
const zod_1 = require("zod");
const router = express_1.default.Router();
const signupZod = zod_1.z.object({
    username: zod_1.z.string().min(5),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(5)
});
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = signupZod.parse(req.body);
    const user = yield database_1.User.findOne({ email });
    if (user) {
        res.status(403).json({ message: "User already exists" });
    }
    else {
        const newUser = new database_1.User({ username, email, password });
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, authVerify_1.secretkey, { expiresIn: '1hr' });
        res.json({ message: "User created successfully", token });
    }
}));
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield database_1.User.findOne({ email, password });
    if (user) {
        const token = jsonwebtoken_1.default.sign({ id: user._id }, authVerify_1.secretkey, { expiresIn: '1h' });
        res.json({ message: "User Logined Successfully", token });
    }
    else {
        res.status(403).json({ message: "Authentication Fails" });
    }
}));
router.get('/me', authVerify_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers["userId"];
    const user = yield database_1.User.findOne({ _id: userId });
    if (!user) {
        res.status(403).json({ msg: "User doesnt exist" });
        return;
    }
    res.json({
        username: user.username
    });
}));
router.post('/addtodos', authVerify_1.authenticateJwt, (req, res) => {
    const { title, description } = req.body;
    const userId = req.headers["userId"];
    const newTodo = new database_1.Todo({ title, description, userId });
    newTodo.save()
        .then((savedTodo) => {
        res.status(201).json(savedTodo);
    })
        .catch((err) => {
        res.status(500).json({ error: 'Failed to create a new todo' });
    });
});
router.get('/todos', authVerify_1.authenticateJwt, (req, res) => {
    const userId = req.headers["userId"];
    database_1.Todo.find({ userId })
        .then((todos) => {
        res.json(todos);
    })
        .catch((err) => {
        res.status(500).json({ error: 'Failed to retrieve todos' });
    });
});
router.get('/todos/:todoId', authVerify_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todoId } = req.params;
    const todo = yield database_1.Todo.findById(todoId);
    res.json({ todo });
}));
router.patch('/todos/:todoId', authVerify_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todoId } = req.params;
    const updateTodo = yield database_1.Todo.findByIdAndUpdate(todoId, req.body, { new: true });
    if (updateTodo) {
        res.json({ message: 'Course updated successfully' });
    }
    else {
        res.status(404).json({ message: 'Course not found' });
    }
}));
router.delete('/todos/:todoId', authVerify_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todoId } = req.params;
    const userId = req.headers["userId"];
    const deleteTodo = yield database_1.Todo.findOneAndDelete({ _id: todoId, userId });
    if (!deleteTodo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(deleteTodo);
}));
exports.default = router;

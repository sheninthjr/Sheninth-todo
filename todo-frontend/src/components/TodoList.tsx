import  { useState, useEffect } from 'react';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';

interface Todo {
    _id: string;
    title: string;
    description: string;
}

type TodoArray = Todo[];

const TodoList = () => {
    const navigate = useNavigate();
    const [todos, setTodos] = useState<TodoArray>([]);

    useEffect(() => {
        const getTodos = async () => {
            const response = await fetch(`${BASE_URL}/todos`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            const data: Todo[] = await response.json();
            setTodos(data);
        };
        getTodos();
    }, []);

    const deleteTodos = async (id:String) => {
        const response = await fetch(`${BASE_URL}/todos/${id}`, {
            method:"DELETE",
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        const updatedTodo = await response.json();
        setTodos(todos.filter((todo) => (todo._id !== updatedTodo._id )));
    }
    return (
        <div className='flex flex-wrap justify-content'>
            <Navbar/>
            {todos.map((todo)=>(         
                <div key={todo._id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-6">
                <a>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{todo.title}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{todo.description}</p>
                <div className="flex sm:justify-around lg:justify-end ">
                <button className="inline-flex items-center px-5 py-2 mx-2 text-m font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={()=>navigate("/todos/"+todo._id)}>
                    Update
                </button>
                <button className="inline-flex items-center px-5 py-2 text-m font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                onClick={()=>deleteTodos(todo._id)}>
                    Delete
                </button>
                </div>
            </div>
        ))}
        </div>
    );
};

export default TodoList;

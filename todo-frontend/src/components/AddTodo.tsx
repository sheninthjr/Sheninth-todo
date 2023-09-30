import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {BASE_URL} from "../config"

interface Todo {
    _id: string;
    title: string;
    description: string;
    done: boolean;
}

type TodoArray = Todo[];

export default function AddTodo(){
    const navigate = useNavigate()
    const [todos, setTodos] = useState<TodoArray>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const addTodo = async () => {
        const response = await fetch(`${BASE_URL}/addtodos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem("token")}` },
            body: JSON.stringify({ title, description })
        });
        const data = await response.json();

        let newTodos = [];
        for (let i = 0; i<todos.length; i++) {
            newTodos.push(todos[i]);
        }
        
        newTodos.push(data);
        setTodos(newTodos);
        navigate("/ ")
    };
    return(
        <>
        <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an Todo
              </h1>
              <div className="space-y-4 md:space-y-6">
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                      <input value={title} type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e)=>{setTitle(e.target.value)}}/>
                  </div>
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                      <input value={description} type="description" name="description" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e)=>{setDescription(e.target.value)}}/>
                  </div>
                  <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={addTodo}
                  >Add Todo</button>
              </div>
          </div>
      </div>
  </div>
</section>
        </>
    )
}
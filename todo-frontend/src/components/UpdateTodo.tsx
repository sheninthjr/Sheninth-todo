import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { useRecoilState, useSetRecoilState } from "recoil";
import { todoState } from "../store/atoms/todoState";


export default function updatedTodo() {
    let { todoId } = useParams();
    const setTodo = useSetRecoilState(todoState);
    
    useEffect(() => {
        axios.get(`${BASE_URL}/todos/${todoId}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((res) => {
            setTodo({ todo: res.data.todo });
        });
    }, [todoId]);
    
    return (<><UCard/></>)
    }
    
function UCard(){
    let { todoId } = useParams();
    const navigate = useNavigate();
    const [todoDetails,setTodoDetails] = useRecoilState(todoState)
    const [title,setTitle] = useState<string>(todoDetails.todo?.title || "")
    const [description,setDescription] = useState<string>(todoDetails.todo?.description|| "")

    const handleUpdate = async() => {
        const res = await axios.patch(`${BASE_URL}/todos/${todoId}`, {
            title: title,
            description: description,
        }, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        if(res){
            let updateTodo={
                title:title,
                description:description
            }
            setTodoDetails({ todo:updateTodo })
            navigate('/')
        }
        setTodoDetails({todo:null})
    }
        return(<>
            <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Update an Todo
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
                      onClick={handleUpdate}
                      >Update Todo</button>
                  </div>
              </div>
          </div>
      </div>
    </section>
        </>)
}
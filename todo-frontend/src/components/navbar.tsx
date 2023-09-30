
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../store/atoms/authState";


export default function Navbar(){
  const navigate = useNavigate()
  const authStateValue = useRecoilValue(authState);
  const Logout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };
  if(authStateValue.username==null){
    return(<>
    <nav className="w-full bg-gray-800">
          <div className="flex flex-row h-16 items-center">
            <div className="flex items-center justify-between text-white px-4 w-full">
              <div className="text-xl">Welcome to Our Website</div>
              <div className="flex space-x-4">
              <button type="button" className="text-white text-base bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>{navigate('/signin')}}>Signin</button>
              <button type="button" className="text-white text-base bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>{navigate('/signup')}}>Signup</button>
              </div>
            </div>
          </div>
      </nav>
    </>)
  }
  return(
      <>
      <nav className="w-full bg-gray-800">
          <div className="flex flex-row h-16 items-center">
            <div className="flex items-center justify-between text-white px-4 w-full">
              <div className="text-xl">Hello,{authStateValue.username}</div>
              <div className="flex space-x-4">
              <button type="button" className="text-white text-base bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>{navigate('/addtodos')}}>+ Create</button>
              <button type="button" className="text-white text-base bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={Logout}>Logout</button>
              </div>
              
            </div>
          </div>
      </nav>
      </>
    )
}
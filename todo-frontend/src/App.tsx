import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./components/signup"
import Signin from "./components/signin";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import { useEffect } from "react";
import { authState } from "./store/atoms/authState";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { BASE_URL } from "./config";
import UpdateTodo from "./components/UpdateTodo";

function App() {

  return (
    <>
    <RecoilRoot>
      <Router>
        <InitState/>
        <Routes>
          <Route path="/" element={<TodoList/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/signin" element={<Signin/>}></Route>
          <Route path="/addtodos" element={<AddTodo/>}></Route>
          <Route path="/todos/:todoId" element={<UpdateTodo/>}></Route>
        </Routes>
      </Router>
      </RecoilRoot>
    </>
  )
}

function InitState() {
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  const init = async () => {
      const token = localStorage.getItem("token");
      try {
          const response = await fetch(`${BASE_URL}/me`, {
              headers: { Authorization: `Bearer ${token}` }
          });
          const data = await response.json();
          if (data.username) {
              setAuth({ token: data.token, username: data.username });
              console.log
              navigate("/");
          } else {
              navigate("/signin");
          }
      } catch (e) {
          navigate("/signin");
      }
  }
  useEffect(() => {
      init();
  }, [])
  return <></>
}

export default App

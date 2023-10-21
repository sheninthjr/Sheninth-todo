import { atom } from "recoil";

interface Todo{
    title : string,
    description : string
}

export const todoState = atom<Todo>({
    key:"todoState",
    default: {
        title:"",
        description:""
    }
})
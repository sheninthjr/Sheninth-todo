import { selector } from "recoil";
import { todoState } from "../atoms/todoState";


export const todoDescription = selector({
    key:"todoDescription",
    get : ({get})=>{
        const state= get(todoState)
        if(state.description){
            return state.description;
        }
        return ""
    }
})
import { selector } from "recoil";
import { todoState } from "../atoms/todoState";

export const todoTitle = selector({
    key:"todoTitle",
    get : ({get})=>{
        const state = get(todoState);
        if(state.title){
            return state.title ;
        }
        return "";
    }
})
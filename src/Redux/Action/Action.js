import {Add_Item, Remove_Item} from './ActionType'

export const addItemCart =(data)=>({
    type:Add_Item,
    payload:data
})

export const removeItemCart =(index)=>({
    type:Remove_Item,
    payload:index 
})
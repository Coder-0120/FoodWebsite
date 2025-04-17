import React, { createContext, useContext, useReducer } from 'react'
const cardstatecontext=createContext();
const carddispathchcontext=createContext();

const reducer=(state,action)=>{
    switch(action.type){
        case "ADD":
            return[...state,{id:action.id,name:action.name,qty:action.qty,size:action.size,price:action.price,img:action.img}]
        case "REMOVE":
            // Remove an item from the cart by index
            return state.filter((_, index) => index !== action.index);  
        case "UPDATE":
            let arr=[...state]
            arr.find((food,index)=>{
                if(food.id===action.id){
                    console.log(food.qty,parseInt(action.qty),action.price+food.price);
                    arr[index]={...food,qty:parseInt(action.qty)+food.qty,price:action.price+food.price};
                }
                return arr;
            })              
            return arr;
        case "DROP":
            let empArray=[];
            return empArray;    
        default:
            console.log("error in reducer");    
    }
    

}
export const CartProvider = ({children}) => {
    const[state,dispatch]=useReducer(reducer,[])
  return (
    <carddispathchcontext.Provider value={dispatch}>
        <cardstatecontext.Provider value={state}>
            {children}
        </cardstatecontext.Provider>
    </carddispathchcontext.Provider>

  )
}
export const useCart=()=>useContext(cardstatecontext);
export const useDispatchCart=()=>useContext(carddispathchcontext);

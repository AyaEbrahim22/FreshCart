import { createContext, useState } from "react";

 
export let counterContext = createContext()

export default function CounterContextProvider(props){

    let [count, setCount] = useState(0)

    function CountChange(){
        setCount(Math.random())
    }
    return<>
    
    <counterContext.Provider value={ {count, CountChange} }>
        {props.children}
    </counterContext.Provider>
    </>
}
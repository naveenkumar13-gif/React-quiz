//  import { type } from "@testing-library/user-event/dist/type";
import { type } from "@testing-library/user-event/dist/type";
import { useReducer} from "react";

const initialState={count:0,step:1}

function reducer(state,action){
  console.log(state,action);
 switch (action.type) {
  case "inc":
    return{...state,count:state.count+state.step}
  case "dec":
    return{...state,count:state.count-state.step}
  
  case "setCount":
    return{...state,count:action.payload}
  
  case "setStep":
    return{...state,step :action.payload}
 case "reset":
   // return{count:0,step:1}
   return initialState
 
  default:
   throw new Error ("Unknown action")
 }
   
  // return state + action;
  // if(action.type === 'inc' ) return state + action.payload ;
  // if(action.type === 'dec' ) return state - action.payload ;
  // if(action.type === 'setCount' ) return  action.payload ;
  
}

function DateCounter() {
  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);
  
  const[state,dispatch]=useReducer(reducer,initialState) 
  const {count,step}=state

  // This mutates the date object.
  const date = new Date("oct 4 2024");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({type:"dec"})

    // setCount((count) => count - 1);  
    // dec by step
    // setCount((count) => count - step);
  };

  const inc = function () {
    dispatch({type:"inc"})   
     // setCount((count) => count + 1);
    // setCount((count) => count + step);
  };

  const defineCount = function (e) {
    // setCount(Number(e.target.value));
    dispatch({type:"setCount",payload:(Number(e.target.value))})
  };

  const defineStep = function (e) {
    dispatch({type:"setStep",payload:(Number(e.target.value))})
    // setStep(Number(e.target.value));
    // dis patch({type:"setCount" , payload:(Number(e.target.value))})
  };

  const reset = function () {
    dispatch({type:'reset'})
    // setCount(0);
    // setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;






// NOTES

/*
1.DEF THE REDUCER STATE [X,DISPATCH]=useReducer(REDUCER,0)
2.IF RES FUNCTION PARAMETER (STATE,ACTION)  {
  THEN RETURN THE ACTION==={dispatch} + STATE
}

3.THEN INDECATE THE TYPE OF FUNCTION() 
    EX:
    const dec = function () {
      dispatch({type:"dec",payload:+1})
      payload=== IS OPTIONAL
    };

*/
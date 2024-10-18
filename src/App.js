import React, { Children, useEffect, useReducer } from 'react';
import { type } from '@testing-library/user-event/dist/type';
import Headers from './Header/Header'
import Main from '../src/Main/Main'
import Loader from './Loader/Loader'
import Error from './Error/Error'
import Start from './StartScreen/Start';
import Question from './Question/Question';
import NextButton from './NExtButton/NextButton';
import Progress from './Progress/progress';
import Finish from './finish/Finish';
import Footer from './Footer/Footer';
import Timer from './Timer/Timer';
const App = () => {
  const SECOND_PER  = 30
 const initialState={ 
  questions:[],

  // loading ,error,ready,active,finished
  status:"loading",
    
  index:0,
  answer:null,
  points:0,
  highscore:0,
  secondsRemaining:null,
 }



 const[{questions,status,index,answer,points,highscore,secondsRemaining},dispatch]=useReducer(reducer,initialState)
function reducer(state,action){
  switch (action.type) {
    case "dataRecived":
    return {...state,
      questions:action.payload,
      status:"ready"}
    
    case "dataFailed":
    return{...state,
      status:"error"}

    case 'start':
    return{...state,
      status:'active',
      secondsRemaining:state.questions.length *SECOND_PER  }

    case 'newAnswer':
      const question =state.questions.at(state.index)
    return{...state,
      answer:action.payload,
      points:(action.payload===question.correctOption) ? state.points + question.points : state.points, }

    case'nextQuestion':
    return{
  ...state,index:state.index+1, answer:null}

  case 'fisish':
    return{...state,status:'finish',highscore:state.points > state.highscore ? state.points : state.highscore}

    case 'reset':
      return{...initialState ,questions:state.questions,status:"ready"}
      case 'tick':
        return{...state,secondsRemaining:state.secondsRemaining-1,status:state.secondsRemaining === 0 ? 'finish':state.status }
    default:
      throw new Error("Action Unknown");
      
  }
} 
const numQuestion=questions.length
const maxPoints = questions.reduce((prev,curr)=>prev + curr.points,0)

  useEffect(function(){
fetch("http://localhost:9000/questions")
.then((res)=>res.json())
.then((data)=>dispatch({type:'dataRecived', payload:data}))
.catch((err)=>dispatch({type:"dataFailed"}))
  },[])



  return (
    <div className='app'>
      <Headers/>
   <Main className='main'>
{status==='loading' && <Loader/>}
{status==='error' && <Error/>}
{status==='ready' && <Start numQuestion={numQuestion} dispatch={dispatch}/>}
{status==='active' &&
<>
<Progress index={index} numQuestion={numQuestion} points={points} maxPoints={maxPoints} answer={answer}/>
 <Question question={questions[index]} dispatch={dispatch} answer={answer}/>
 <Footer>
 <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
<NextButton dispatch={dispatch} answer={answer} index={index} numQuestion={numQuestion}/>
 </Footer>
</>
}
{status==='finish' && <Finish points={points} maxPoints={maxPoints} highscore={highscore}  dispatch={dispatch}/> }
   
   </Main>
    </div>
  );
}

export default App;



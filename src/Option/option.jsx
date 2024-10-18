import { type } from '@testing-library/user-event/dist/type';
import React from 'react';

const  Option = ({question,dispatch,answer}) => {

    // answer !== null   ===> !== answered  one time
    const hasAnswer = answer !== null  
    return (
        <div className='options'>
        {question.options.map((option,index)=>
    <button className={ `btn btn-option
         ${index===answer ? 'answer': ""}
        ${hasAnswer ? index=== question.correctOption ? " correct" :"wrong" :""} `}
        key={option} 
        onClick={()=>dispatch({type:'newAnswer',payload:index})}
        disabled={hasAnswer}>
            {option}
    </button>)}
        
        </div>
    );
}

export default Option;

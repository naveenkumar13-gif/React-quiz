import React from 'react';

const Finish = ({maxPoints,points,highscore,dispatch}) => {
    const Percentage =(points/maxPoints) *100
let emoji;
 if(Percentage === 100 ) emoji = '🥇'
 if(Percentage >= 80 && Percentage< 100) emoji='🥈'
 if(Percentage >= 50 && Percentage< 80) emoji='🥉'
 if(Percentage >= 0 && Percentage< 50) emoji='😒'
 if(Percentage === 0 ) emoji = '🤦‍♂️'




    return (
        <div>
            <p  className='result'>
               <span>{emoji}</span> You Scored <strong>{points}</strong> out of {maxPoints} ({Math.ceil(Percentage)}% )
            </p>
            <p className='highscore'>(Highscore: {highscore} points) </p>

            <button className='btn btn-ui
            ' onClick={()=>dispatch({type:"reset"})}>
                Reset Quiz
            </button>
        </div>
    );
}

export default Finish;

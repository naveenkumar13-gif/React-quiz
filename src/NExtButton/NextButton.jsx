import { type } from '@testing-library/user-event/dist/type';
import React from 'react';

const NextButton = ({dispatch,answer,index,nextQuestion}) => {

    if(index < nextQuestion -1) return (
        <div>
            {answer === null ? null  : <button className='btn btn-ui
            ' onClick={()=>dispatch({type:"nextQuestion"})}>
                Next
            </button>

            }
        </div>
    );
    if(index === nextQuestion -1) return (
        <div>
            {answer === null ? null  : <button className='btn btn-ui
            ' onClick={()=>dispatch({type:"finish"})}>
               Finish
            </button>

            }
        </div>
    );
}

export default NextButton;

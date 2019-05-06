import React from 'react';
import StyledButton from './StyledButton';
import './FlagAnswer.css';

/* Lastly let's look at the flag answer component.
    And that's a pretty simple one. It's basically correct or incorrect depending on the props or passed in here.
    And the answer is just the string that represents the correct answer. And finally we've got an on next which 
    is coming all the way from our country game components. Let's take a look at that function so on next is this 
    next question and what it does is it gets the countries out of state gets a new correct option a new set of 
    options including that correct option and then sets the state again with that new correct option and new 
    questions state of question. So that's all for this one. And congratulations on making it this far. */
const FlagAnswer = ({correct, answer, onNext}) => (
  <div className='flag-answer'>
    {correct ?
      `Correct!: ${answer}` :
      `Incorrect! Correct Answer: ${answer}`}
    <StyledButton text="NEXT" onClick={onNext} />
  </div>
);

export default FlagAnswer;

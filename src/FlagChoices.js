import React from 'react';
import StyledButton from './StyledButton';
import './FlagChoices.css';

/* Let's go look at the flag choice component. Now this computer is a stateless functional component 
    and all it is rendering is the four options. And then a button to say guess. So fairly simple,
    We're mapping over those four inputs and we're creating some GSX with input tag wrapped in a label 
    and notice this check property checked is either true or false (see FlagQuestion component). And 
    whereas that being set well back in the flag question we're mapping over our options. And if the 
    user choice is equals that option ID then checked is true. Otherwise it's false. */
const FlagChoices =  props => {
  let options = props.options || []
  const {handleChange, handleSubmit} = props;
  let inputs = options.map(opt => (
    <label key={opt.id}>
      <input type="radio"
             value={opt.id}
             checked={opt.checked}
             onChange={handleChange}
             name="flag-choice" />
      {opt.name}
    </label>
  ));

  return (
    <form className="flag-form" onSubmit={handleSubmit}>
      {inputs}
      <StyledButton text="GUESS" type="submit"/>
    </form>
  );
}

export default FlagChoices;

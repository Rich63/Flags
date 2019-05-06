// Now let's check out how flag question works.
import React, {Component} from 'react';
import FlagChoices from './FlagChoices'
import FlagAnswer from './FlagAnswer';
import './FlagQuestion.css';

/* so question can be in one of three states it's either being asked it's wrong or it's correct and we 
    saw this pattern Similarly in the memory game. I tend to make objects like this when I know that 
    the state of something in my application can take on more than two values if it's not just a boolean 
    if I have more options besides just true or false so we want to start out our questions day in asking state */
const QuestionStates = {
  QUESTION: 1,
  ANSWER_WRONG: 2,
  ANSWER_CORRECT: 3
};


class FlagQuestion extends Component {
  static defaultProps = {
    options: []
  }

  /*  The only state in this component is the choice for the user of the option that the user has clicked on. 
        The majority of the logic is in render so will map over the options. */
  constructor(props) {
    super(props);
    this.state = {
      userChoice: undefined,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /* So for handle change it's implemented right here and we're just setting state for wherever these are choices */
  handleChange(e) {
    this.setState({userChoice: Number(e.target.value)});
  }

  /* now handle submit is invoking on guess which has passed in from the parent component the country game. */
  handleSubmit(e) {
    e.preventDefault();
    this.props.onGuess(this.state.userChoice);
  }

  /* The question state if it is equal to correct answer then this is true if it is not equal the correct 
      answer is false. The other important thing going on here is that we have two callback functions that 
      were passing the flag choice and that is handleChange and handleSubmit. */
  render() {
    const {
      flag,
      questionState,
      options,
      answerText,
      onNext
    } = this.props;
    const {userChoice} = this.state;
    let opts = options.map(opt => ({
      ...opt,
      checked: userChoice === opt.id
    }));
    let output = questionState === QuestionStates.QUESTION ?
      (<FlagChoices handleChange={this.handleChange}
                   handleSubmit={this.handleSubmit}
                   options={opts} />) :
      (<FlagAnswer
        correct={questionState === QuestionStates.ANSWER_CORRECT}
        answer={answerText}
        onNext={onNext} />);

    return (
      <div>
        {output}
        <img
           className="flag-img"
           src={flag}
           alt="Guess the flag"
         />
      </div>
    );
  }
}

export default FlagQuestion;
export { QuestionStates };

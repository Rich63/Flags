/* Now this is where the interesting lifecycle events happen. So when we care about here is 
    in component did mount in our constructor we've got some state about first of all the countries.
    This is the data that we'll get back from the API request. And then secondly the options for 
    each question. Now there's a reason we want to keep the options here and that's because it's 
    easier for the game to figure out which one is correct or incorrect based on the user selection */

import React, {Component} from 'react';
import FlagQuestion, {QuestionStates} from './FlagQuestion.js';
import shuffle from 'shuffle-array';

class CountryGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countries: [],
      options: [],
      correctOption: undefined,
      questionState: undefined,
    }

    this.onGuess = this.onGuess.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    // getting all the information from the API
    fetch("https://restcountries.eu/rest/v2/all")
      // Convert the data to JSON
      .then(resp => resp.json())
      .then(countries => {
        // we get a random country out of the country's array.
        const correctOption = Math.floor(Math.random() * countries.length);
        /* And then we're passing that random index into a function called Get options which gives us 
            our four options for our question. */
        const options = this._getOptions(correctOption, countries); // see _getOptions

        /* Now once we have four options and we have the correct option we'll set the state so the state 
            that we care about is all the countries data from the API are correct option currently are for 
            options which include the correct option and then a question state value. so we want to start 
            out our questions state in asking state (1) */
        this.setState({
          countries,        // all the countries data from the API
          correctOption,    // the correct option
          options,          // the 4 options including the correct option
          questionState: QuestionStates.QUESTION,   // the state of QUESTION see flagQuestion.js
        });
      })
      .catch(console.warn)
  }

  onGuess(answer) {
    const {correctOption} = this.state;
    let questionState = answer === correctOption ?
                        QuestionStates.ANSWER_CORRECT :
                        QuestionStates.ANSWER_WRONG;
    this.setState({questionState});
  }

  nextQuestion() {
    const {countries} = this.state;
    const correctOption = Math.floor(Math.random() * countries.length);
    const options = this._getOptions(correctOption, countries);
    this.setState({
      correctOption,
      options,
      questionState: QuestionStates.QUESTION
    });
  }

  /* So get options we'll take our correct option and all the countries it will loop through 
      and then it will generate 4 random options. Now the first option will always be our 
      correct option but the end will shuffle it. So somewhere in the group of four answers 
      we'll have the correct answer. Also it's important to notice here we're only keeping 
      track of the index of the correct answer in the index of our options. We're not actually 
      saving the whole object. So this array that we're shuffling at the end are just numbers 
      that represent four indices into our country's array. And one of them is the correct answer. */
  _getOptions(correctOption, countries) {
    let options = [correctOption];
    let tries = 0;
    while (options.length < 4 && tries < 15) {                    // generating 4 country options
      let option = Math.floor(Math.random() * countries.length);
      if (options.indexOf(option) === -1 ) {
        options.push(option);
      } else {
        tries++;
      }
    }
    return shuffle(options); // shuffle the 4 indexes in the options array
  }

  /* now in render method we're going to have a couple of things that we need to render. So first of all we 
      always want a sane default value until we get the results of our API requests. So at first countries 
      will be undefined. And while countries undefined We want to say loading just so the user sees 
      something on the page. Now once we have the correct option we know that the countries have been 
      defined and the first thing we're doing here is we're getting the flag image the SVGA from the data 
      and then the name of the country for the correct option. Next we're mapping over all the options and 
      getting out the name and also the idea of that option. So remember this options array starts out as 
      just IDs and we're turning into an object with IDS and names. */
  render() {
    let {
      countries,
      correctOption,
      options,
      questionState
    } = this.state;
    let output = <div>Loading...</div>;
    if (correctOption !== undefined) {
      const {flag, name} = countries[correctOption];
      let opts = options.map(opt => {
        return {
          id: opt,
          name: countries[opt].name
        };
      });
      /* After that we'll change the output from what was default to a loading div into a flag question and the
          flag question takes a few props here. So the first is our answer text. This is the string that should 
          be displayed for the correct answer. The second is on guess. So this is the callback function that will 
          get called when the user clicks on guess on next is a function that we'll get called when the user 
          clicks next after they've guessed. Options are four options. That is the array that we just created.
          Of objects with IDS and names. The question state is the state we saw earlier. So it all started out as 
          a question. We're asking a question and then we'll transition to either correct or incorrect. And 
          finally the flag is just a URL for the flag image that we want to show. */
      output = (
        <FlagQuestion
          answerText={name}
          onGuess={this.onGuess}
          onNext={this.nextQuestion}
          options={opts}
          questionState={questionState}
          flag={flag}/>
      );
    }
    return (
      <div style={{marginTop: '15px'}}>
        {output}
      </div>
    );
  }
}

export default CountryGame;

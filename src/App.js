import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import scenarios from './components/scenarios/scenarios';

import { useState, useEffect } from 'react';



function HandleButtonPress(props) {
  console.log(props.buttonText)
  if (props.buttonText === "Start") {
    props.setButtonText("Stop")
    props.setButtonColor("#FF0000")
  }
  if (props.buttonText === "Stop") {
    props.setButtonText("Start")
    props.setButtonColor("#0557FF")
  }
}

function Picker(props) {

  const [randomText, setRandomText] = useState("?")
  const [index, setIndex] = useState(0)

  // Running the timer
  useEffect(() => {
    let interval = null
    if (props.data.selecting) {
      interval = setInterval(() => {
        if (index < scenarios[props.data.type].options.length - 1) {
          let newIndex = index + 1
          setIndex(newIndex)
          setRandomText(scenarios[props.data.type].options[newIndex])
        }
        if (index == scenarios[props.data.type].options.length - 1) {
          setIndex(0)
          setRandomText(scenarios[props.data.type].options[0])
        }
      }, props.data.interval);
    } else if (!props.data.selecting) {
      clearInterval(props.data.interval)
    }
    //Clear up
    return () => {
      clearInterval(interval)
    }
  }, [props.data.selecting, index])

  return (
    <div>
      <div className='sub-page-question-div'>
        <div className='question-text-div'>
          <p className='question-text'>{scenarios[props.data.type].label}</p>
        </div>
      </div >

      <div className='sub-page-response-div'>
        <div className='response-text-div'>
          <p className='response-text'>{randomText}</p>
        </div>
      </div >

    </div>
  )
}

function App() {

  const [scenarioSelecting, setScenarioSelecting] = useState(false)
  const [outcomeSelecting, setOutcomeSelecting] = useState(false)

  const [buttonColor, setButtonColor] = useState("#0557FF")
  const [buttonText, setButtonText] = useState("Start")
  const [buttonStyle, setButtonStyle] = useState({
    "border": 0,
    "background-color": "#0557FF",
    "width": "200px",
    "border-radius": "25px",
    "margin-top": "1em",
    "font-size": "25px"
  })

  useEffect(() => {
    console.log(buttonStyle)
    setButtonStyle({
      "border": 0,
      "background-color": buttonColor,
      "width": "200px",
      "border-radius": "25px",
      "margin-top": "1em",
      "font-size": "25px"
    })

  }, [buttonColor])

  return (
    <>
      <div className='app-div'>
        <h1> Data Hazards Scenario Selector </h1>
        <div className='break'></div>
        <Picker data={{
          "type": "scenario",
          "selecting": scenarioSelecting,
          "interval": 200
        }} />
        <Picker data={{
          "type": "outcome",
          "selecting": outcomeSelecting,
          "interval": 100

        }} />

      </div>

      <div className='app-div'>

        <Button style={buttonStyle}
          onClick={(event) => {
            setScenarioSelecting(!scenarioSelecting)
            const outcomeTimeout = setTimeout(() => {
              setOutcomeSelecting(!outcomeSelecting)
            }, 500)

            HandleButtonPress({
              setButtonColor: setButtonColor,
              buttonText: buttonText,
              setButtonText: setButtonText,
            })
          }}>{buttonText}</Button>
      </div>
    </>
  );
}

export default App;

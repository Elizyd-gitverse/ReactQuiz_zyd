import { useEffect, useReducer } from 'react'

import Header from './Component/Header.js'
import Main from './Component/Main.js'
import Loader from './Component/Loader.js'
import Error from './Component/Error.js'
import ReadyScreen from './Component/ReadyScreen.js'
import PlayScreen from './Component/PlayScreen.js'
import NextButton from './Component/NextButton.js'
import Progress from './Component/Progress.js'
import FinishedScreen from './Component/FinishedScreen.js'
import Footer from './Component/Footer.js'
import Timer from './Component/Timer.js'

// WILL GO IN NETLIFY

//1. STEP
const initialState = {
  questionArr: [],
  status: 'loading',  //loading, error, readr, active, finish
  index: 0, 
  answerIndex: null, //0, 1, 2, 3 thats why null taken
  points: 0,
  highScore: 0,
  secondRemaining: null //timer state 
}
const SEC_PER_QUEST = 30

//3. STEP
function reducer(state, action) {
  switch(action.type) {

    case 'dataRecieved': return {...state, questionArr: action.payload, status: "ready"}

    case 'dataFailed': return {...state, status: 'error'}

    case 'start': return {...state, status: 'active', secondRemaining: state.questionArr.length * SEC_PER_QUEST}

    case 'newAnswer': 
    const questObj = state.questionArr.at(state.index) 
    return {...state, answerIndex: action.payload, points: action.payload === questObj.correctOption ? state.points + questObj.points : state.points }

    case 'nextQuestion': return {...state, index: state.index + 1, answerIndex: null} 

    case 'Finished': return {...state, status: 'finish',highScore: state.points < state.highScore ? state.highScore : state.points}

    case 'restart': return {...initialState, questionArr: state.questionArr,highScore: state.highScore,status: 'ready'} 

    case 'tick': return {...state, secondRemaining: state.secondRemaining - 1, status: state.secondRemaining === 0 ? 'finish' : state.status, highScore:  state.points < state.highScore ? state.highScore : state.points}       

    default: throw new Error('Action unKnown')
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState) 
  const {questionArr, status, index, answerIndex, points, highScore, secondRemaining} = state 
  const numQuestion = questionArr.length
  const maxPoints = questionArr.reduce(function(acum, value) {
     return acum + value.points
  }, 0) 


  useEffect(function() {
    async function fetchQuestion() {
      try {
        const res = await fetch(`https://reactquiz-server-0v3c.onrender.com`)
        const data = await res.json()
        dispatch({type:'dataRecieved', payload: data})

      }catch(err) {
        dispatch({type: 'dataFailed'})
      }
    }
    fetchQuestion()
  }, [])

  return (
    <div className="app">
       <Header />
       <Main>
         {status === 'loading' && <Loader />}
         {status === 'error' && <Error />}
         {status === 'ready' && <ReadyScreen numQuestion ={numQuestion} dispatch={dispatch}/>}
         {/* passing dispatch function in other component */}
         {status === 'active' && 
          <>
             <Progress index={index} numQuestion={numQuestion} points={points} maxPoints={maxPoints} answerIndex={answerIndex}/>
             <PlayScreen questObj={questionArr[index]} dispatch={dispatch} answerIndex={answerIndex} points={points}/>
             <Footer>
                <Timer dispatch={dispatch} secondRemaining={secondRemaining}/>
                <NextButton dispatch={dispatch} answerIndex={answerIndex} index={index} numQuestion={numQuestion}/>
             </Footer>
          </>}
         {status === 'finish' && <FinishedScreen points={points} maxPoints={maxPoints} highScore={highScore} dispatch={dispatch}/>}
       </Main>
    </div>
  )
}



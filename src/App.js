import React, {useState} from "react";
import Stopwatch from './components/Stopwatch/Stopwatch';
import Button from './UI/Button/Button';
import {interval, fromEvent} from "rxjs";
import {scan, timeInterval, filter} from 'rxjs/operators';
import './App.css';

const App = (props) => {
  const initialState = {
    sc: 0 ,
    mm: 0,
    hh: 0,
    sub: false
  }

  const [state, setState] = useState(initialState);

  const startStopButtonHandler = () => {
    if (!state.sub) {
      const observable = interval(1000);
      const subscription = observable.subscribe(res => {
          state.sc++;
          setState({...state});
          if (state.sc > 59) {
            state.sc = 0;
            state.mm++;
            setState({...state});
          }
          if (state.mm > 59) {
            state.mm = 0;
            state.hh++;
            setState({...state});
          }
        });
      state.sub = subscription;
      console.log(state);
      setState({...state});
    } else {
      state.sub.unsubscribe();
      setState({...initialState});
    }
  }

  const resetButtonHandler = () => {
    if (state.sub) {
      state.sub.unsubscribe();
    }
    setState({...initialState});
  }

  const pauseButtonHandler = (event) => {
    fromEvent(event.target, 'mousedown')
        .pipe(
            timeInterval(),
            scan((acc, val) => val.interval < 300 ? acc + 1 : 0, 0),
            filter(value => value === 1)
        ).subscribe({
          next: value => {
            if (state.sub) {
              state.sub.unsubscribe();
            }
            state.sub = false;
            setState({...state});
          }
        })
  }

  return (
    <div className="App">
      <ol style={{textAlign: 'left', listStyle: 'none'}}>
        <li>Button Start/Stop - starts and stops the timer</li>
        <li>Button Wait - double click will trigger stop of the timer,
          subsequent pressing start restarts the timer</li>
        <li>Button Reset - resetting of the timer</li>
      </ol>
      <Stopwatch hh={state.hh} mm={state.mm} ss={state.sc}/>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
        <Button clicked={startStopButtonHandler} btnType="Start">Start/Stop</Button>
        <Button mouseDown={pauseButtonHandler} btnType="Pause">Wait</Button>
        <Button clicked={resetButtonHandler} btnType="Reset">Reset</Button>
      </div>

    </div>
  );
}

export default App;

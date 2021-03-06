import React, { useState, useEffect } from "react";
import "./App.css";
import BottomRow from "./BottomRow";

function App() {
  // Home and Away Team useState variables
  const [score, setScore] = useState({awayScore: 0, homeScore: 0});
  const [awayScore, setAwayScore] = useState(0);
  const [homeScore, setHomeScore] = useState(0);
  const resetScore = () => (setHomeScore(0) + setAwayScore(0) + setDown(1) + setQuarter(1) + setToGo(10) + setBallOn(20) + setTime(15*60));

  // // Setting up more button functionality for the BottomRow components
  const [quarter, setQuarter] = useState(1);
  const [down, setDown] = useState(1);
  const [toGo, setToGo] = useState(10);
  const [ballOn, setBallOn] = useState(20);
  const [time, setTime] = useState(15);

  // Hook for the timer
  useEffect(() => {
    const timer = window.setInterval(() => {
      setTime(prevTime => { 
        if (prevTime > 0) { 
          setTime(prevTime - 1);
        } 
      })
    }, 1000);
    return () => {
      window.clearInterval(timer);
    };
  }, []);

  useEffect(()  => {
    if(time < 1) {
      setTime(15*60)
      setQuarter(quarter + 1);
    }
  }, [time, quarter]);

  // Require and style the background image
  const brownsImg = require('../src/Browns.jpg');
  const backgroundStyle = {
    width: '100%',
    height: '100%',
    backgroundImage: `url(${brownsImg})`,
    backgroundSize: 'cover'
  };

  return (
    <div className="container" style={ backgroundStyle }>
      <section className="scoreboard">
        <div className="topRow">
          <div className="home">
            <h2 className="home__name">Browns</h2>
            <div className="home__score">{ homeScore }</div>
          </div>
          <div className="timer">{`${(Math.floor(time/60)).toString().padStart(2, '0')}:${(time%60).toString().padStart(2, '0')}`}</div>
          <div className="away">
            <h2 className="away__name">Steelers</h2>
            <div className="away__score">{ awayScore }</div>
          </div>
        </div>
        <BottomRow quarter={quarter} down={down} toGo={toGo} ballOn={ballOn} />
      </section>
      <section className="buttons">
        <div className="homeButtons">
          <button onClick={() => setHomeScore(homeScore + 7) } className="homeButtons__touchdown">Home Touchdown</button>
          <button onClick={() => setHomeScore(homeScore + 3) } className="homeButtons__fieldGoal">Home Field Goal</button>
        </div>
        <div className="awayButtons">
          <button onClick={() => setAwayScore(awayScore + 7) } className="awayButtons__touchdown">Away Touchdown</button>
          <button onClick={() => setAwayScore(awayScore + 3) } className="awayButtons__fieldGoal">Away Field Goal</button>
        </div>
        <div className="otherButtons">
          <button className="newGame" onClick={() => resetScore() }>New Game</button>
          <button className="newTime" onClick={() => setTime(time + 15*60) }>Clock</button>
          <button className="newQuarter" onClick={() => setQuarter(quarter + 1) }>Quarter</button>
          <button className="newDown" onClick={() => setDown(down+ 1) }>Down</button>
          <button className="toGo" onClick={() => setToGo(toGo + 1) }>To Go</button>
          <button className="ball" onClick={() => setBallOn(ballOn + 1) }>Ball On</button>
        </div>
      </section>
    </div>
  );
}

export default App;
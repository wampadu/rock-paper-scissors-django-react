import React, { useState, useEffect } from 'react';
import "./App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const [players, setPlayers] = useState("");
  const navigation = useNavigate()
  const [playerName, setPlayerName] = useState("Anonymous"+  Math.floor(Math.random() * 999) + 1);
  const [selectedOption, setSelectedOption] = useState("computer");

  const HandleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const player_name = data.get('player_name')
    const player_opponent = data.get('player_opponent')
      
    axios.post('http://localhost:8000/api/play/?id=&name='+player_name+'&preference='+player_opponent+'&online_status=True')
    .then(function (response) {
      setPlayers(response.data)
    })
   .catch(function (error) {
      console.log(error);
   });
  }

  useEffect(() => {
    players && navigation("/play", {state :{ players: players }, replace:true})
 }, [players, navigation])

    return (
      <div className="p-3 pb-5 pt-4">
        <div className="row justify-content-center"><b className="mb-3">Rock Paper Scissors</b></div>
        <div className="row justify-content-center">
        <form className="text-center" onSubmit={HandleSubmit}>
          <div className="form-group">
            <label htmlFor="player_name">Player Name</label>
            <input
              type="text"
              className="form-control text-center"
              id="player_name"
              name="player_name"
              aria-describedby="player_name"
              placeholder="Enter Name"
              value={playerName}
              onChange={event => setPlayerName(event.target.value)}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="player_opponent">Choose Your Opponent</label>
            <div className="d-flex">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="player_opponent"
                  id="player_opponent1"
                  value="computer"
                  checked={selectedOption === 'computer'} 
                  onChange={event => setSelectedOption(event.target.value)}
                ></input>
                <label className="form-check-label" htmlFor="player_opponent1">
                  🖥️ Computer
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="player_opponent"
                  id="player_opponent2"
                  value="live-player"
                  checked={selectedOption === 'live-player'} 
                  onChange={event => setSelectedOption(event.target.value)}
                ></input>
                <label className="form-check-label" htmlFor="player_opponent2">
                  🧑 Live Player
                </label>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3 py-2 px-5">
            Start
          </button>
        </form>
      </div>
      </div>
    );
  }

  /*
        <Link  to= "/play" state={{players: Players}}>
          <button type="submit" className="btn btn-primary mt-3 py-2 px-5">
            Start
          </button>
          </Link>

                    <button type="submit" className="btn btn-primary mt-3 py-2 px-5">
            Start
          </button>
          */
export default Home;
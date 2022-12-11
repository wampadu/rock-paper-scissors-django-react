import "./Play.css";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

import { w3cwebsocket as W3CWebSocket } from "websocket";

const Play = () => {
  const location = useLocation();
  const props = location.state;
  const playerName = props.players.player.name;
  const opponentName = "opponent" in props.players ? props.players.opponent.name : "Computer";
  const round = "round" in props.players ? props.players.round.id : "";
  const player = "player" in props.players ? props.players.player.id : "";
  const type = props.players.player.preference == "computer" ? "computer": "live-player"
  const [opponentScore, setOpponentScore] = useState(0);
  const [playerScore, setplayerScore] = useState(0);
  const [result, setResult] = useState("");
  const [subText, setSubText] = useState("");
  const [decision, setDecision] = useState("");
  const [opponent, setOpponent] = useState(false);


  var result_Text = "";
  var sub_Text = "";



    var ws = new W3CWebSocket("ws://"+window.location.host+"/ws/play/" + round + '/');

    ws.onopen = function () {
      console.log("WebSocket Client Connected");

    };
  
    ws.onmessage = function (e) {
      const dataFromServer = JSON.parse(e.data);
      if (dataFromServer) {
        if (dataFromServer.message.playerID !== player) {
          setOpponent(dataFromServer.message);
        }      
      }
    };
  
    ws.onclose = function (e) {
      console.log(
        "Socket is closed. Reconnect will be attempted in 1 second.",
        e.reason
      );
      setTimeout(function () {
      }, 1000);
    };


  useEffect(() => {
  
    if (decision) {
      if (type == "live-player") {
      ws.onopen = () => ws.send(JSON.stringify({
        decision: decision,
        playerID: player,
        playerName: playerName,
        roundID: round,
        playerScore: playerScore,
      }));  
    } else {
      var choices = ["rock", "paper", "scissors"]
      choices = choices[Math.floor(Math.random() * choices.length)]
      setOpponent({
        decision: choices,
        playerName: opponentName,
        playerID: player,
        roundID: round,
      });
    }
    }
  
    if(decision != "" && opponent.decision != ""){
      if (decision === "rock" && opponent.decision === "scissors") {
        result_Text = "You Won";
        sub_Text = "Rock crushes scissors!";
      } else if (decision === "rock" && opponent.decision === "paper") {
        result_Text = "You Lose";
        sub_Text = "Rock crushes paper!";
      } else if (decision === "paper" && opponent.decision === "rock") {
        result_Text = "You Won";
        sub_Text = "Paper wraps rock!";
      } else if (decision === "paper" && opponent.decision === "scissors") {
        result_Text = "You Lose";
        sub_Text = "Scissors cuts paper!";
      } else if (decision === "scissors" && opponent.decision === "paper") {
        result_Text = "You Won";
        sub_Text = "Paper wraps rock!";
      } else if (decision === "scissors" && opponent.decision === "rock") {
        result_Text = "You Lose";
        sub_Text = "Rock crushes scissors!";
      } else {
        result_Text = "You Tied";
        sub_Text = "Nothing happens. Play again!";
      }
      if (result_Text == "You Won") {
        setplayerScore(playerScore + 1);
      }
      if (result_Text == "You Lose") {
        setOpponentScore(opponentScore + 1);
      }
      setResult(result_Text);
      setSubText(sub_Text);
    }

  }, [decision, opponent.decision]);



  return (
    <div className="pt-4 pb-4 px-5">
      <div className="row score-board gap-2">
        <div className="col d-flex flex-column">
          <h5>🧑 You</h5>
          <div className="d-flex justify-content-between">
            <div>
              <p>{playerName}</p>
            </div>
            <div className="d-flex player-score">
              <label>Score {playerScore}</label>
            </div>
            {decision && (
              <span className="badge badge-primary position-absolute rsp-badge d-flex">
                <div className={decision === "paper" ? "paper" : ""}>
                  {decision === "rock"
                    ? "✊"
                    : decision === "scissors"
                    ? "✌️"
                    : "🤚"}
                </div>{" "}
                {decision}
              </span>
            )}
          </div>
        </div>
        <div className="col d-flex flex-column">
          <h5>{"opponent" in props.players ? "🧑" : "🖥️"} Opponent</h5>
          <div className="d-flex gap-1 justify-content-between">
            <div>
              <p>{opponentName}</p>
            </div>
            <div>
              <div className="d-flex player-score">
                <label>Score {opponentScore}</label>
              </div>
              {decision && opponent.decision ? (
                
                <span className="badge badge-primary position-absolute rsp-badge d-flex">
                  <div className={opponent.decision === "paper" ? "paper" : ""}>
                    {opponent.decision === "rock"
                      ? "✊"
                      : opponent.decision === "scissors"
                      ? "✌️"
                      : "🤚"}
                  </div>{" "}
                  {opponent.decision}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      {decision != "" && opponent == false  ? (
      <div className={"loader "}>
      <div>
      <div className="d-flex flex-column">
      <h5 style={{zIndex: "1", position: "relative"}}> Waiting on your opponent..</h5>
      <img style={{height: "8rem", marginTop: "-2rem", objectFit: "cover"}} src="https://i.pinimg.com/originals/07/24/88/0724884440e8ddd0896ff557b75a222a.gif" />
      </div> 
      </div>
    </div>
      ): ""}

      <div
        className={"row justify-content-between py-5 position-relative "}
        ref={(node) => {
          if (node) {
            node.style.setProperty(
              "display",
              decision && opponent.decision ? "none" : "",
              "important"
            );
          }
        }}
      >
        <div
          className="rps-option"
          onClick={() => {
            setDecision("rock");
          }}
        >
          <div className="rps-emoji">✊</div>
          <div className="rps-label">Rock</div>
        </div>
        <div
          className="rps-option"
          onClick={() => {
            setDecision("paper");
          }}
        >
          <div className="rps-emoji paper">🤚</div>
          <div className="rps-label">Paper</div>
        </div>
        <div
          className="rps-option"
          onClick={() => {
            setDecision("scissors");
          }}
        >
          <div className="rps-emoji">✌️</div>
          <div className="rps-label">Scissors</div>
        </div>
      </div>



      <div
        className="row d-flex justify-content-between py-5"
        ref={(node) => {
          if (node) {
            node.style.setProperty(
              "display",
              decision && opponent.decision ? "flex" : "none",
              "important"
            );
          }
        }}
      >
        <div className="w-100 d-flex align-items-center flex-column">
          <h3 className="font-weight-bold">{result}</h3>
          <h5 className="font-weight-bold mb-3">{subText}</h5>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setDecision("");
              setOpponent(false);
              setResult("")
              setSubText("")
              console.log("hello", 'opponent', opponent, 'decision', decision)
            }}
          >
            Play Again
          </button>
        </div>
      </div>



    </div>
  );
};

export default Play;

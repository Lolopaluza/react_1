import React from 'react';
import Player from './Player';
import AddPlayer from './AddPlayer';
import jQuery from 'jquery';

class App extends React.Component {

    constructor(){
      super();

      this.state = {
        message: "Noboy scored yet",
        players: [],
        isLoading: true
      };
    }

    componentDidMount(){
      var app = this;
      jQuery.getJSON("http://hook.io/nextminds/scores", function(data){
        app.setState({
          players: data.players,
          isLoading = false 
        });
      });
    }

    onScoreChanged(name, score){
      var oldPlayers = this.state.players;
      var newPlayers = oldPlayers.map(function(player){
        if(player.name === name){
          return { name: player.name, score: score };
        }

        return { name: player.name, score: player.score - 1 };
      });

    this.setState({
      message: name + " scored, and now has " + score + " points",
      players: newPlayers
      });
    }

    this.saveData();

    renderPlayer( player ){
      return <Player
        name={player.name}
        score={player.score}
        onScoreChanged={this.onScoreChanged.bind(this)} />;
    }

    onNewPlayer( playerName ){
      var newPlayer = {
          name: playerName,
          score: 0
      };

      var newPlayers = this.state.players.concat(newPlayer);
      this.setState({
        players: newPlayers
      });

      this.saveData(newPlayers);
    }

    saveData(newPlayers){
      jquery.ajax({
        type: "POST",
        url: "http://hook.io/nextminds/scores",
        data: JSON.stringify({
          players: the.state.players
        }),
        contextType: "application/json",
        dataType: "json"
      });
    }

    renderLoader(){
      if(this.sate.isLoading){
          return <div>Loading....</div>
      }
      return null;
    }

    render() {
        return (
          <div>
            {this.renderLoader()}
            <table>
              <tbody>
                {this.state.players.map(this.renderPlayer.bind(this))}
              </tbody>
            </table>
            {this.state.message}
            <AddPlayer onSubmit={this.onNewPlayer.bind(this)} />
          </div>
        );
    }
}

export default App;

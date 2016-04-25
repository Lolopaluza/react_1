import React from 'react';

class Player extends React.Component {
  plusOne(){
    var newScore = this.props.score + 1;
    this.props.onScoreChanged(this.props.name, newScore);
  }


  renderPrize(){
    if(this.props.score >= 10){
      return <img src="http://goo.gl/u1KKqp" />;
    }

    return null;
  }

  render(){
    return(
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.score}</td>
        <td>
          <button onClick={this.plusOne.bind(this)}>+1</button>
          {this.renderPrize()}
        </td>
      </tr>
    );
  }
}

export default Player;

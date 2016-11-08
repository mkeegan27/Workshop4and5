import React from 'react';
import {unixTimeToString} from '../util.js';
import {Link} from 'react-router';
import {unlikeComment} from '../server.js';
import {likeComment} from '../server.js';


export default class Comment extends React.Component {

  constructor(props) {
    super(props);
    this.state = props.data;
  }


  handleLikeClick(clickEvent){
    clickEvent.preventDefault();
    if(clickEvent.button === 0){
      var callbackFunction = (updatedLikeCounter) => {
        this.setState({likeCounter: updatedLikeCounter});
      };

      if(this.didUserLike()){
        unlikeComment(this.props.parentThread, this.props.idNum, 4, callbackFunction);
      } else{
        likeComment(this.props.parentThread, this.props.idNum, 4, callbackFunction);
      }
    }
  }

  didUserLike() {
    var likeCounter = this.state.likeCounter;
    var liked = false;
    for(var i = 0; i < likeCounter.length; i++){
      if(likeCounter[i]._id === 4){
        liked = true;
        break;
      }
    }
    return liked;
  }


  render() {
    var likeButtonText = "";
    if(this.didUserLike()){
      likeButtonText = "Unlike";
    }
    else{
      likeButtonText = "Like";
    }
    return (
      <div>
        <div className="media-left media-top">
          PIC
        </div>
        <div className="media-body">
          <Link to={"/profile/" + this.props.data.author._id}>
            {this.props.data.author.fullName}
          </Link> {this.props.data.children}
          <br /><a href="#" onClick={(e) => this.handleLikeClick(e)}>{likeButtonText}</a> · <a href="#">Reply</a> ·
          {unixTimeToString(this.props.data.postDate)}
          <br />{this.state.likeCounter.length} people like this
        </div>
      </div>
    )
  }
}

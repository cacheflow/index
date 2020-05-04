import React, { Component} from 'react'
import Comments from "./Comments"
import axios from 'axios'

export default class Post extends Component {
  constructor () {
    super()
    this.state = { 
        post: {},
        poster: {}, 
        comment: ""
    }
    // this.commentArea = React.createRef()
  }

  displayMedia = () => {
    if (this.props.post.type == 'image') {
        return (
            <div className="post-media" style={{
                backgroundImage: `url("${this.props.post.image_url}")`, 
                backgroundPosition: 'center center', 
                backgroundRepeat: 'no-repeat', 
                backgroundSize: 'cover'}}>
            </div>
        )
    }
  }

  handleChange = (event) => {
    const name = event.target.name
    const value = (event.target.type == 'checkbox') ? event.target.checked : event.target.value

    this.setState({
      [name]: value
    }, () => {
      console.log(this.state)
    })
  }

  submitComment = async () => {
      const self = this
      if (this.state.comment.length > 0) {
          try {
            const response = await axios.post('/comments', {
              post_id: self.props.post.id,
              user_id: self.props.user.id,
              content: self.state.comment
            }).then (function(response) {
              self.setState({
                ...self.state,
                comment: ""
              })
            //   self.props.update()
            //   this.commentArea.current.getComments()
              return 'comment saved'
            })
          } catch (error) {
            console.log("axios didnt work: " + error)
          }
      }
  }


  render () {
    if (this.props.post == undefined) {
        return (
            <div>Loading...</div>
        )
    } else {
        return (
            <div className="post">
                <div className="post-header">
                    <div className="author">
                        <div className="user-img" style={{
                        backgroundImage: `url("${this.props.user.profile_img}")`, 
                        backgroundPosition: 'center center', 
                        backgroundRepeat: 'no-repeat', 
                        backgroundSize: 'cover'}} />
                        <a href={`/profile/${this.props.user.id}`} className="username">{this.props.user.fname} {this.props.user.lname}</a>
                        <span className="text">shared {(this.props.post.type == 'image') ? 'an image' : 'something'}</span>
                    </div>
                    <div className="time">{new Date(this.props.post.created_at).toLocaleString()}</div>
                </div>

                {this.displayMedia()}
                <div className="post-info">
                    {/* <h3 className="title">How to Become a Web Developer in 2020</h3> */}
                    <p>{this.props.post.content}</p>
                </div>
                <div className="post-stats">
                    <div className="icons">
                        <i className="fa fa-grin-alt" />
                        <i className="fa fa-thumbs-up" />
                    </div>
                    <span className="text">Sarah Jane and 23 others liked this post.</span>
                    <div className="comment-count">4 comments</div>
                </div>
                <textarea name="comment" cols={30} rows={2} placeholder="write a comment..." value={this.state.comment} onChange={this.handleChange} />
                <div className="buttons">

                    {/* <Comments ref={this.commentArea} post={this.props.post} /> */}
                    <Comments post={this.props.post} />

                    <div className="send-btn" onClick={this.submitComment}>
                        <i className="fa fa-arrow-right" />
                    </div>
                    {/* <div className="share-btn">
                        <i className="fa fa-share" />
                    </div> */}
                    <div className="like-btn">
                        <i className="fa fa-thumbs-up" />
                    </div>
                </div>
            </div>
        )
    }
  }
}





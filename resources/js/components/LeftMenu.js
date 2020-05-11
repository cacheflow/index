import React, { Component} from 'react'

export default class LeftMenu extends Component {
  constructor () {
    super()
    this.state = { 
      dropdown: false
    }
  }

  clickedDropDown = () => {
    this.setState({
      dropdown: !this.state.dropdown
    })
  }

  render () {
    if (this.props.initialData.userData == undefined) {
      return (
        <div>Loading...</div>
      )
    } else {
      // console.log(this.props.initialData.userData)
      const {fname, lname} = this.props.initialData.userData
      return (
        <section id="left-menu">
          <div className="account-dropdown" onClick={this.clickedDropDown}>
            <div className="username">
              {`[: ${fname} ${lname} :]`}
            </div>
          </div>
  
          <div className={`dropdown ${this.state.dropdown ? 'active' : ''}`}>
            <nav>
              <a href={`/profile/${this.props.initialData.userData.id}`}>+ profile +</a>
              <a href={`/settings/${this.props.initialData.userData.id}`}>* settings *</a>
              <a href="/logout">- logout -</a>
            </nav>
          </div>
  
          <div className="groups">
            <div className="title">_usr</div>
            <ul>
              <li>bio</li>
              <li>work</li>
              <li>media</li>
            </ul>
          </div>
          <div className="groups">
            <div className="title">_groups</div>
            <ul>
              <li>software</li>
              <li>photography</li>
              <li>design</li>
            </ul>
          </div>
          <a href="/logout" className="logout">
            logout <i className="ayn-trash" />
          </a>
        </section>
      )
    }
  }
}

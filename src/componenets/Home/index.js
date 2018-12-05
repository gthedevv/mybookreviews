import React, { Component } from 'react'
import { connect } from 'react-redux'

import HomeContainer from '../../containers/Home'

 class Home extends Component {

  renderAppInfo() {
    if(!(this.props.loggedIn)) {
      return (
        <div className="rl_container">
          <section className="intro">
            <p>Share your book reviews with the world!</p>
          </section>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderAppInfo()}
        <HomeContainer/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
})

export default connect(mapStateToProps)(Home);

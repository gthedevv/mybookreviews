import React, { Component } from 'react'
import { connect } from 'react-redux'

import HomeContainer from '../../containers/Home'

 class Home extends Component {

  renderAppInfo() {
    if(!(this.props.loggedIn)) {
      return (
        <div>
          <section>
            <h2>Welcome to My Book Reviews</h2>
            <p>The one simple and easy to use app that lets you share your book reviews with the world!</p>
          </section>
          <section>
            <h2>How To Use</h2>
            <p>Select the menu button on the top left and register for an account. Once your account is created you can start writing your own reveiws!</p>
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

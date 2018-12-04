import React from 'react'
import { connect } from 'react-redux'
import {Link, Redirect} from 'react-router-dom';


class UserProfile extends React.Component {

  render() {

    const {username, firstName, lastName} = this.props.user


    if (!(this.props.loggedIn)) {
      return <Redirect to="/login" />
    }

    return (
      <div className="user_container rl_container">
        <div className="avatar">
          <img src="/images/avatar.png" alt="avatar"/>
        </div>
        <div className="info">
          <div>
            {firstName}
          </div>
          <div>
            {lastName}
          </div>
          <div>
            {username}
          </div>
        </div>
        <button><Link to="/add-review">Add a review</Link></button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.auth.currentUser !== null,
  user: state.auth.currentUser || {}
});

export default connect(mapStateToProps)(UserProfile);
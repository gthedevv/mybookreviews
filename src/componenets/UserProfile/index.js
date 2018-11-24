import React from 'react'
import { connect } from 'react-redux'


class UserProfile extends React.Component {

  render() {

    const {username, firstName, lastName} = this.props.user

    return (
      <div className="user_container">
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
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.auth.currentUser !== null,
  user: state.auth.currentUser || {}
});

export default connect(mapStateToProps)(UserProfile);
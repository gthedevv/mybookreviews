import React from 'react'
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import {clearAuth} from '../../actions/auth';
import {clearAuthToken} from '../../local-storage';

class NavItems extends React.Component {

  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    let items = [
      {
        type: 'navItem',
        icon: 'file-text-o',
        text: 'Register',
        link: '/register',
        restricted: false
      },
      {
        type: 'navItem',
        icon: 'sign-in',
        text: 'Login',
        link: '/login',
        restricted: false
      }
    ]

    const itemsLoggedIn = [
      {
        type: 'navItem',
        icon: 'file-text-o',
        text: 'Profile',
        link: '/user',
        restricted: false
      },
      {
        type: 'navItem',
        icon: 'file-text-o',
        text: 'My Reviews',
        link: '/user/user-reviews',
        restricted: false
      },
      {
        type: 'navItem',
        icon: 'file-text-o',
        text: 'Add Reviews',
        link: '/add-review',
        restricted: false
      }
    ]

    const element = (item, i) => (
      <div key={i} className={item.type}>
        <Link to={item.link}>
          <FontAwesome name={item.icon}/>
          {item.text}
        </Link>
      </div>
    )

    let logOutButton

    if (this.props.loggedIn) {
      items = itemsLoggedIn
      logOutButton = (
        <div className='navItem'>
        <Link to='/' onClick={() => this.logOut()}>
          <FontAwesome name='sign-out'/>
          Logout
        </Link>
      </div>
    );
    }

    const showItems = () => (
      items.map((item, i) => {
        return element(item, i)
      })
    )

    return (
      <div>
        <div className='navItem'>
        <Link to='/'>
          <FontAwesome name='home'/>
          Home
        </Link>
      </div>
        {showItems()}
        {logOutButton}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(NavItems);

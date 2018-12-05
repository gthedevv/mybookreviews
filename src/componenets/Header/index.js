import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

import SideNav from '../SideNav';

export default class Header extends Component {

  state = {
    showNav: false
  }

  onHideNav = () => {
    this.setState({showNav: false})
  }

  render() {
    return (
      <header>
        <div className="open_nav">
          <FontAwesome name="bars" 
            className="bars"
            style={{
              color: '#ffffff',
              paddingTop: '20px',
              paddingLeft: '15px',
              paddingRight: '20px',
              cursor: 'pointer'
            }}
            onClick={() => this.setState({showNav: true})}
          />
        </div>
        <SideNav 
          showNav={this.state.showNav}
          onHideNav={() => this.onHideNav()}
        />
        <Link to="/" className="logo">
          My Book Reviews
        </Link>
      </header>
    )
  }
}

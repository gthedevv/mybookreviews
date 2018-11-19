import React from 'react'
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

export default function NavItems() {

  const items = [
    {
      type: 'navItem',
      icon: 'home',
      text: 'Home',
      link: '/',
      restricted: false
    },
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
      text: 'Add Admin',
      link: '/register',
      restricted: false
    },
    {
      type: 'navItem',
      icon: 'sign-in',
      text: 'Login',
      link: '/login',
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
      link: '/user/add-review',
      restricted: false
    },
    {
      type: 'navItem',
      icon: 'sign-out',
      text: 'Logout',
      link: '/logout',
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

  const showItems = () => (
    items.map((item, i) => {
      return element(item, i)
    })
  )

  return (
    <div>
      {showItems()}
    </div>
  )
}

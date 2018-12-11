import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link }  from 'react-router-dom';
import { getUserReviews } from '../../actions/user-reviews';
import moment from 'moment';
import MDSpinner from 'react-md-spinner'

class UserPosts extends Component {

  componentDidMount() {
    if(this.props.user !== null) {
      this.props.dispatch(getUserReviews(this.props.user._id))
    }
  }


  renderReviews = () => {
    if (this.props.reviews.list !== null) {
      return (
        this.props.reviews.list.map(item => (
          <tr key={item._id}>
            <td><Link to={`/books/${item._id}`}>{item.name}</Link></td>
            <td>{item.author}</td>
            <td>{moment(item.createdAt).format('MM/DD/YY')}</td>
          </tr>
        ))
      );
    }
  }

  render() {
    if (!(this.props.loggedIn)) {
      return <Redirect to='/login' />
    }

    if (this.props.reviews.loading) {
      return (
        <div className='loader'>
          <MDSpinner className='spinner' size='50' />
        </div>
      );
    } 

    const noReviews = (<div className='user_posts'>
                        <h4>You have no reviews!</h4>
                        <Link to={'/add-review'}><button type='button'>Add a review</button></Link>
                      </div>)

    if (this.props.reviews.list.length < 1) {
      return noReviews;
    }

    if (this.props.reviews.error) {
      return <strong>{this.props.error}</strong>;
    }

    return (
      <div className='user_posts'>
        <h4>Your Reviews:</h4>
        <Link to={'/add-review'}><button type='button'>Add Reveiw</button></Link>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {this.renderReviews()}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  reviews: state.userReviews || null,
  user: state.auth.currentUser 
})

export default connect(mapStateToProps)(UserPosts);
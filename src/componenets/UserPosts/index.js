import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserReviews } from '../../actions/user-reviews';
import moment from 'moment';
import { Link } from 'react-router-dom';
import MDSpinner from 'react-md-spinner'

class UserPosts extends Component {

  componentDidMount() {
    if(this.props.user !== null) {
      this.props.dispatch(getUserReviews(this.props.user._id))
    }
  }

  renderReviews = () => {
    const { reviews } = this.props;

    if (reviews.loading) {
      return (
        <div className="loader">
          <MDSpinner className="spinner" size="50" />
        </div>
      );
    } 
    
    if (reviews.error) {
      return <strong>{this.props.error}</strong>;
    }
    if (reviews.list !== null) {
      return (
        reviews.list.map(item => (
          <tr key={item._id}>
            <td><Link to={`/edit-post/${item._id}`}>{item.name}</Link></td>
            <td>{item.author}</td>
            <td>{moment(item.createdAt).format("MM/DD/YY")}</td>
          </tr>
        ))
      );
    }
  }

  render() {
    return (
      <div className="user_posts">
        <h4>Your Reviews:</h4>
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
  reviews: state.userReviews,
  user: state.auth.currentUser 
})

export default connect(mapStateToProps)(UserPosts);
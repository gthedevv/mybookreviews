import React, { Component } from 'react'
import { connect } from 'react-redux'
import MDSpinner from 'react-md-spinner'
import { Link } from 'react-router-dom'

import  {getBookWithReviewer } from '../actions/book'
import BookReview from '../views/BookReview'

class BookView extends Component {

  componentDidMount() {
    this.props.dispatch(getBookWithReviewer(this.props.match.params.id))
  }

  renderBook = () => {
    const { book } = this.props

    if (book.loading) {
      return (
        <div className='loader'>
          <MDSpinner className='spinner' size='50' />
        </div>
      );
    } 
    
    if (book.error) {
      return <strong>{this.props.error}</strong>;
    }

    if (book.data !== null && book.data.reviewer !== null ) {
      return (
        <BookReview  book={book.data}  />
    );   
  }
}

  renderEditBtn = () => {
    if (this.props.user !== null && this.props.book.data !== null) {
      const { _id } = this.props.user
      const { reviewerId }  = this.props.book.data
      if(_id === reviewerId) {
        return (
          <div className="rl_container">
            <Link to={`/edit-review/${this.props.match.params.id}`}><button>Edit Review</button></Link>
          </div>
        )
      }
    }
  }

  render() {
    return (
      <div>
        {this.renderBook()}
        {this.renderEditBtn()}
      </div>
    )
  } 
}

const mapStatetoProps = (state) => ({
  user: state.auth.currentUser,
  book: state.book
})

export default connect(mapStatetoProps)(BookView)
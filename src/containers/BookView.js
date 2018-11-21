import React, { Component } from 'react'
import { connect } from 'react-redux'
import MDSpinner from 'react-md-spinner'

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
        <div className="loader">
          <MDSpinner className="spinner" size="50" />
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

  render() {
    return (
      <div>
        {this.renderBook()}
      </div>
    )
  } 
}

const mapStatetoProps = (state) => ({
  book: state.book
})

export default connect(mapStatetoProps)(BookView)
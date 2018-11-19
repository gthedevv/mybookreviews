import React, { Component } from 'react'
import { connect } from 'react-redux';
import MDSpinner from 'react-md-spinner'

import { getBooks } from '../actions/books'

import BookItem from '../views/BookItem'

class HomeContainer extends Component {

  componentDidMount() {
    this.props.dispatch(getBooks(3,0,'asc'))
  }

  renderItems = () => {
    const { books } = this.props

    if (books.loading) {
      return <MDSpinner className="spinner" size="28" />;
    } 
    
    if (books.error) {
      return <strong>{this.props.error}</strong>;
    }
    if (books.list !== null) {
    return (
      books.list.map(item => (
        <BookItem { ...item } key={item._id}/>
      ))
    );
  }   
}

  loadMore = () => {
    const { list } = this.props.books
    let count = list.length;
    this.props.dispatch(getBooks(1,count,'asc', list))
  }

  render() {
    return (
      <div>
        {this.renderItems()}
        <div 
          className="loadmore"
          onClick={this.loadMore}
        >
          Load More
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    books: state.books
});

export default connect(mapStateToProps)(HomeContainer);
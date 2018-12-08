import React, { Component } from 'react'
import { connect } from 'react-redux';
import MDSpinner from 'react-md-spinner'

import { getBooks } from '../actions/books'

import BookItem from '../views/BookItem'

class HomeContainer extends Component {

  componentDidMount() {
    this.props.dispatch(getBooks(10,0,'asc'))
  }

  renderItems = () => {
    const { books } = this.props

    if (books.loading) {
      return (
        <div className='loader'>
          <MDSpinner className='spinner' size='50' />
        </div>
      );
    } 
    
    if (books.error) {
      return <strong>{this.props.error}</strong>;
    }
    if (books.list !== null) {
      let loadMoreButton = (
        <div key=''
          className='loadmore'
          onClick={this.loadMore}
        >
          Load More
        </div>
      )
      return ([
        books.list.map(item => (
          <BookItem { ...item } key={item._id}/>
        )),
        loadMoreButton
      ]);
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
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    books: state.books
});

export default connect(mapStateToProps)(HomeContainer);
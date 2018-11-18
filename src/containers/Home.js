import React, { Component } from 'react'
import { connect } from 'react-redux';

import { getBooks } from '../actions/books'

import BookItem from '../ui-widgets/BookItem'

class HomeContainer extends Component {

  componentDidMount() {
    this.props.dispatch(getBooks(3,0,'asc'))
  }

  renderItems = (books) => (
    books.list ? 
      books.list.map(item => (
        <BookItem { ...item } key={item._id}/>
      ))
      :null
  )

  loadMore = () => {
    const { list } = this.props.books
    let count = list.length;
    this.props.dispatch(getBooks(1,count,'asc', list))
  }

  render() {
    return (
      <div>
        {this.renderItems(this.props.books)}
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

function mapStatetoProps(state){
  return{
    books: state.books
  }
}

export default connect(mapStatetoProps)(HomeContainer);
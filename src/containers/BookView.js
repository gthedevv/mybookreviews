import React, { Component } from 'react'
import { connect } from 'react-redux'

import  {getBookWithReviewer } from '../actions/book'

class BookView extends Component {

  componentDidMount() {
    this.props.dispatch(getBookWithReviewer(this.props.match.params.id))
  }

  render() {
    console.log(this.props)
    return (
      <div>
        
      </div>
    )
  } 
}

const mapStatetoProps = (state) => ({
  book: state.book.data
})

export default connect(mapStatetoProps)(BookView)
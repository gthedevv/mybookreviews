import React from 'react';
import { connect } from 'react-redux';
import { Redirect }  from 'react-router-dom';
import { Field, reduxForm, focus } from 'redux-form';
import Input from '../input';
import { required, nonEmpty, isTrimmed } from '../../validators';
import { editReview, clearEditBook, deleteReview } from '../../actions/edit-review';
import { getBookWithReviewer } from '../../actions/book';

export class EditReview extends React.Component {

  componentDidMount(){
   return this.props.dispatch(getBookWithReviewer(this.props.match.params.id))
  }

  componentWillUnmount(){
     return this.props.dispatch(clearEditBook());
  }

  deleteReview(bookId){
    return this.props.dispatch(deleteReview(bookId, this.props.history));
  }

  onSubmit(values) {
      const reviewerId = this.props.user._id
      const {review, name, author, rating, price, pages} = values;
      const { _id: id } = this.props.initialValues
      const editedReview = {id, review, name, author, rating, price, pages, reviewerId};
      this.props.dispatch(editReview(editedReview, this.props.history))
      return this.props.history.push(`/books/${this.props.match.params.id}`)
  }
  
  render() {
    if (!(this.props.loggedIn)) {
      return <Redirect to='/login' />
    }



      return (
        <div className='rl_container article'>
          <form
              className='login-form'
              onSubmit={this.props.handleSubmit(values =>
                  this.onSubmit(values)
              )}>
              <h2>Edit Review</h2>
              <label htmlFor='name' hidden>Title</label>
              <Field 
                  component={Input} 
                  type='text' 
                  name='name'
                  placeholder='Book Title'
                  validate={[required, nonEmpty, isTrimmed]}
              />
              <label htmlFor='author' hidden>Author</label>
              <Field 
                  component={Input} 
                  type='text' 
                  name='author'
                  placeholder='Author'
                  validate={[required, nonEmpty, isTrimmed]} 
              />
              <label htmlFor='pages' hidden>Number of pages</label>
              <Field 
                  component={Input} 
                  type='text' 
                  name='pages'
                  placeholder='Number of Pages' 
              />
              <label htmlFor='rating' hidden>Rating</label>
              <Field
                  component='select'
                  className='form_element'
                  name='rating'
                  placeholder='Rating'
                  validate={[required]}
                  ref={input => (this.input = input)}
              >
                <option></option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </Field>
              <label htmlFor='price' hidden>Price</label>
              <Field 
                  component={Input} 
                  type='text' 
                  name='price'
                  placeholder='Price' 
              />
              <label htmlFor='review' hidden>Review</label>
              <Field 
                  component='textarea'
                  name='review'
                  placeholder='Review...'
                  ref={input => (this.input = input)}
              />
              <button
                  type='submit'
                  disabled={this.props.pristine || this.props.submitting}>
                  Submit
              </button>
              <button type='button' disabled={this.props.pristine || this.props.submitting} onClick={this.props.reset}>
                Undo Changes
              </button>
              <button type='button' onClick={() => this.deleteReview(this.props.match.params.id)}>
                  Delete
              </button>
          </form>
        </div>
      );
  }
}


let InitializeFromStateForm = reduxForm({
    form: 'editReview',
    enableReinitialize : true,
    onSubmitFail: (errors, dispatch) => dispatch(focus('editReview', Object.keys(errors)[0])),
})(EditReview);

InitializeFromStateForm = connect(
  state => ({
    loggedIn: state.auth.currentUser !== null,
    user: state.auth.currentUser || {},
    editedBook: state.editReview,
    initialValues: state.book.data
  })
)(InitializeFromStateForm);

export default InitializeFromStateForm;
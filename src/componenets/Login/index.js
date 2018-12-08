import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import Input from '../input';
import {login} from '../../actions/auth';
import {required, nonEmpty} from '../../validators';
import {Redirect} from 'react-router-dom';

export class LoginForm extends React.Component {
    onSubmit(values) {
        return this.props.dispatch(login(values.email, values.password));
    }

    render() {
        let error;
        if (this.props.error) {
            error = (
                <div className='form-error error' aria-live='polite'>
                    {this.props.error}
                </div>
            );
        }

        if (this.props.loggedIn) {
          return <Redirect to='/user' />;
      }

        return (
          <div className='rl_container'>
            <form
                className='login-form'
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                {error}
                <h2>Log In</h2>
                <label htmlFor='email' hidden>Email</label>
                <Field
                    className='form_element'
                    component={Input}
                    type='text'
                    name='email'
                    id='email'
                    placeholder='Enter your email'
                    validate={[required, nonEmpty]}
                />
                <label htmlFor='password' hidden>Password</label>
                <Field
                    component={Input}
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Enter your password'
                    validate={[required, nonEmpty]}
                />
                <button disabled={this.props.pristine || this.props.submitting}>
                    Log in
                </button>
            </form>
          </div>
        );
    }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

const connectToComponenet = connect(mapStateToProps)(LoginForm)

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'email'))
})(connectToComponenet);
import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from '../input';
import {login} from '../../actions/auth';
import {required, nonEmpty} from '../../validators';

export class LoginForm extends React.Component {
    onSubmit(values) {
        return this.props.dispatch(login(values.email, values.password));
    }

    render() {
        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }
        return (
          <div className="rl_container">
            <form
                className="login-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                {error}
                <h2>Log In</h2>
                <label htmlFor="email">Email</label>
                <Field
                    className="form_element"
                    component={Input}
                    type="text"
                    name="email"
                    id="email"
                    validate={[required, nonEmpty]}
                />
                <label htmlFor="password">Password</label>
                <Field
                    component={Input}
                    type="password"
                    name="password"
                    id="password"
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

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'email'))
})(LoginForm);
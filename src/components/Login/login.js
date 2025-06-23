import React from 'react';
import "./Login.scss"
const Login = (props) => {
    return (
        <div className='login-container'>
            <div className='container'>
                <div className='row px-3 px-sm-0'>
                    <div className='content-left col-12 d-none col-sm-7 d-sm-block'>
                        <div className='brand'>
                            Well come
                        </div>
                        <div className='detail'>
                            My name is Son , nice to meet you '-'
                        </div>
                    </div>
                    <div className='content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3'>
                        <div className='brand d-sm-none'>
                            Well come
                        </div>
                        <input type='text' className='form-control' placeholder='Email address or phone number' />
                        <input type='text' className='form-control' placeholder='Your password' />
                        <button className='btn btn-warning'>Login</button>
                        <span className='text-center'><a className='forgot-password' href='#'>Forgot your password?</a></span>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-primary'>Create new account</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
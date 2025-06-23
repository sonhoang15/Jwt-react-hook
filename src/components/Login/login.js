import React from 'react';
import "./Login.scss"
const Login = (props) => {
    return (
        <div className='login-container mt-3'>
            <div className='container'>
                <div className='row'>
                    <div className='content-left col-7'>
                        <div className='brand'>
                            Well come
                        </div>
                        <div className='detail'>
                            Hello ! my name is Son , nice to meet you '-'
                        </div>
                    </div>
                    <div className='content-right col-5 d-flex flex-column gap-3 py-3'>
                        <input type='text' className='form-control' placeholder='Email address or phone number' />
                        <input type='text' className='form-control' placeholder='Your password' />
                        <button className='btn btn-warning'>Login</button>
                        <span className='text-center'>Forgot your password?</span>
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
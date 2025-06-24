import React from 'react';
import "./Login.scss"
import { useHistory } from "react-router-dom";
import img1 from "../../asset/hi login hẹ hẹ.jpg"
const Login = (props) => {
    let history = useHistory();
    const createNewUser = () => {
        history.push("/register")
    }
    return (
        <div className='login-container'>
            <div className='container'>
                <div className='row px-3 px-sm-0'>
                    <div className='content-left col-12 d-none col-sm-7 d-sm-block'>
                        <div className='brand'>
                            Wellcome
                        </div>
                        <div className='detail'>
                            My name is Son , nice to meet you '-'
                        </div>
                        <div className='meme'>
                            <img src={img1} class="img-fluid" alt="Hình ảnh đáp ứng" />
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
                            <button className='btn btn-primary' onClick={() => createNewUser()}>Create new account</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
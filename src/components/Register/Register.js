import React, { useEffect } from 'react';
import "./Register.scss"
import { useHistory } from "react-router-dom";
import img1 from "../../asset/Register or die.jpg"
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { RegisterService } from '../../Services/userService';
const Register = (props) => {
    const [email, setEmail] = React.useState("");
    const [username, setUserName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [repassword, setRePassword] = React.useState("");
    const defaultInput = {
        isValidEmail: true,
        isValidUserName: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidRePassword: true
    }
    const [objectCheckInput, setObjectCheckInput] = React.useState({ ...defaultInput });

    const isValidInput = () => {
        setObjectCheckInput({ ...defaultInput });
        if (!email || !username || !phone || !password || !repassword) {
            setObjectCheckInput({
                isValidEmail: false,
                isValidUserName: false,
                isValidPhone: false,
                isValidPassword: false,
                isValidRePassword: false
            });
            toast.error("Please fill all fields");
            return false;
        }
        let regx = /\S+@\S+\.\S+/;
        if (!regx.test(email)) {
            setObjectCheckInput({
                ...defaultInput,
                isValidEmail: false
            });
            toast.error("Invalid email format");
            return false;
        }
        if (password !== repassword) {
            toast.error("Passwords do not match");
            return false;
        }

        return true;
    }



    useEffect(() => {
        let session = sessionStorage.getItem('account');
        if (session) {
            history.push("/");
            window.location.reload();
        }
    }, [])
    const handleRegister = async () => {
        let check = isValidInput();
        if (check === true) {
            let severData = await RegisterService(email, username, phone, password);
            if (+severData.EC === 0) {
                toast.success(severData.EM);
                history.push("/login");
            } else {
                toast.error(severData.EM);
            }
        }

    }
    let history = useHistory();
    const login = () => {
        history.push("/login")
    }
    return (
        <div className='register-container'>
            <div className='container'>
                <div className='row px-3 px-sm-0'>
                    <div className='content-left col-12 d-none col-sm-7 d-sm-block'>
                        <div className='brand-top'>
                            Wellcome to Here
                        </div>
                        <div className='meme'>
                            <img src={img1} className="img-fluid" alt="Hình ảnh đáp ứng" />
                        </div>
                        <div className='detail'>
                            create account or die ...
                        </div>
                    </div>
                    <div className='content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3'>
                        <div className='brand d-sm-none'>
                            Well come
                        </div>
                        <div className='form-group'>
                            <label>Email</label>
                            <input type='text' className={objectCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'} placeholder='Email address'
                                value={email} onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>User name</label>
                            <input type='text' className={objectCheckInput.isValidUserName ? 'form-control' : 'form-control is-invalid'} placeholder='User name'
                                value={username} onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Phone</label>
                            <input type='text' className={objectCheckInput.isValidPhone ? 'form-control' : 'form-control is-invalid'} placeholder='Phone number'
                                value={phone} onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Password</label>
                            <input type='password' className={objectCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'} placeholder='Your password'
                                value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Re-enter Password</label>
                            <input type='password' className={objectCheckInput.isValidRePassword ? 'form-control' : 'form-control is-invalid'} placeholder='Re-enter Password'
                                value={repassword} onChange={(e) => setRePassword(e.target.value)}
                            />
                        </div>

                        <button className='btn btn-warning' onClick={() => handleRegister()}>Register</button>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-primary' onClick={() => login()}>Already've an account ?</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;

import "./Login.scss"
import { useHistory } from "react-router-dom";
import img1 from "../../asset/hi login hẹ hẹ.jpg"
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { LoginService } from "../../Services/userService";
const Login = (props) => {
    let history = useHistory();

    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");
    const defaultInput = {
        isValidValueLogin: true,
        isValidPassword: true,
    }
    const [objvalidInput, setObjValidInput] = useState(defaultInput);

    const createNewUser = () => {
        history.push("/register")
    }
    const login = async () => {
        setObjValidInput(defaultInput)
        if (!valueLogin) {
            setObjValidInput({
                ...objvalidInput,
                isValidValueLogin: false
            })
            toast.error("Please enter your email or phone number");
            return;
        }
        if (!password) {
            setObjValidInput({
                ...objvalidInput,
                isValidPassword: false
            })
            toast.error("Please enter your password");
            return;
        }
        let response = await LoginService(valueLogin, password)
        if (response && +response.EC === 0) {
            let data = {
                isAuthenticated: true,
                token: 'token fake'
            }
            sessionStorage.setItem('account', JSON.stringify(data));
            history.push("/");
            window.location.reload();
            toast.success("Login success");
        }
        if (response && +response.EC !== 0) {
            setObjValidInput({
                ...objvalidInput,
                isValidValueLogin: false
            })
            toast.error(response.EM)
        }
    }
    const handlePressEnter = (e) => {
        if (e.charCode === 13 || e.code === 'Enter') {
            login();
        }
    }
    useEffect(() => {
        let session = sessionStorage.getItem('account');
        if (session) {
            history.push("/");
            window.location.reload();
        }
    }, [])
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
                            <img src={img1} className="img-fluid" alt="Hình ảnh đáp ứng" />
                        </div>
                    </div>
                    <div className='content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3'>
                        <div className='brand d-sm-none'>
                            Well come
                        </div>
                        <input
                            type='text'
                            className={objvalidInput.isValidValueLogin ? 'form-control' : 'form-control is-invalid'}
                            placeholder='Email address or phone number'
                            value={valueLogin}
                            onChange={(e) => { setValueLogin(e.target.value) }}
                        />
                        <input
                            type='password'
                            className={objvalidInput.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                            placeholder='Your password'
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            onKeyPress={(e) => handlePressEnter(e)}
                        />
                        <button className='btn btn-warning' onClick={() => login()}>Login</button>
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
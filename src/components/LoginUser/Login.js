
import "./Login.scss"
import { useHistory, Link } from "react-router-dom";
import img1 from "../../asset/hi login hẹ hẹ.jpg"
import { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { LoginService } from "../../Services/userService";
import { UserContext } from "../../context/UserContext"
import { join } from "lodash";
import { ClimbingBoxLoader } from "react-spinners";



const Login = (props) => {

    const { user, loginContext } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
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

        setIsLoading(true); // Bắt đầu loading
        try {
            let response = await LoginService(valueLogin, password)
            if (response && +response.EC === 0) {
                let groupWithRoles = response.DT.groupWithRoles;
                let email = response.DT.email;
                let username = response.DT.username;
                let token = response.DT.access_token
                let data = {
                    isAuthenticated: true,
                    token,
                    account: { groupWithRoles, email, username }
                }
                localStorage.setItem("jwt", token)
                loginContext(data)
                history.push("/");
                toast.success("Login success");
            }
            if (response && +response.EC !== 0) {
                setObjValidInput({
                    ...objvalidInput,
                    isValidValueLogin: false
                })
                toast.error(response?.EM || "Login failed");
            }
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setIsLoading(false); // Kết thúc loading dù thành công hay lỗi
        }

    }
    const handlePressEnter = (e) => {
        if (e.charCode === 13 || e.code === 'Enter') {
            login();
        }
    }
    useEffect(() => {
        if (user && user.isAuthenticated) {
            history.push('/')
        }
    }, [])
    return (
        <>
            {isLoading ? (
                <div className='loading-container'>
                    <ClimbingBoxLoader
                        color="green"
                        loading
                        size={20}
                        speedMultiplier={1}
                    />
                    <div className='loading'>loading ...</div>
                </div>
            ) : (
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
                                    <div className=" mt-3 return">
                                        <Link to='/'>
                                            <i className="fa fa-chevron-circle-left" ></i>
                                            <span>Return to Home</span>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>

    );
}

export default Login;
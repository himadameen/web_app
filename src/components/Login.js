import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {loginUser} from '../reducers/AuthReducer';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    // const initialState = {
    //     name: "",
    //     email: ""
    // }

    const [info, setInfo] = useState({fullName:"", email : ""})
    const [er, setEr] = useState(false);
    const [formE, setFormE] = useState({});


    // const dispatch = useDispatch();
    let navigate = useNavigate();
    // const {error} = useSelector((state) => state.user)


    const handleChange = (e) => {
        const { name, value } = e.target
        setInfo({ ...info, [name]: value })
    }

    const submit = async (e) => {
        e.preventDefault();
        if (info.email !== "" && info.email !== "") {
            const url = 'http://localhost:2400/user/login';
            const resp = await axios.post(url, info)
            console.log(resp)
            localStorage.setItem('token', resp.data.token);
            localStorage.setItem('name', resp.data.fullName)
            if(resp.status === 201){
                navigate('/media')
            }else{
                window.alert("Invalid credentials!")
            }
        } else {
            setFormE(validate(info));
            setEr(true);
        }
    }

    const validate = (info) => {
        let errors = {};
        const er = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!info.name) {
            errors.name = "UserName is required!";
        }
        if (!info.email) {
            errors.email = "Email is required!";
        } else if (!er.test(info.email)) {
            errors.email = "Please enter valid email"
        }
        return errors;
    }

    return (
        <>
            <div className='auth_main'>
                <div className='header'>
                <img src={require('../images/img1.png')} alt='logo' />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-2"></div>
                        <div className="col-lg-6 col-md-8 login-box">
                            <div className="col-lg-12 login-key">
                                <i className="fa fa-key" aria-hidden="true"></i>
                            </div>
                            <div className="col-lg-12 login-title">
                                LOGIN PANEL
                            </div>
                            <div className="col-lg-12 login-form">
                                <div className="col-lg-12 login-form">
                                    <form>
                                        <div className="form-group">
                                            <label className="form-control-label">UserName</label>
                                            <input type="text" name='fullName' values={info.fullName} className="form-control" onChange={handleChange} />
                                            <p id="red">{formE.name}</p>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-control-label">Email</label>
                                            <input type="email" name='email' values={info.email} className="form-control" onChange={handleChange} />
                                            <p id="red">{formE.email}</p>
                                        </div>

                                        <div className="col-lg-12 loginbttm">
                                            <Link to='/' id='alr'><div id='alr_dy'>Don't have an account</div></Link>
                                            <div className="col-lg-6 login-btm login-button">
                                                <button className="btn btn-outline-primary" onClick={submit}>LOGIN</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}

export default Login
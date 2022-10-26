import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ScrollToTop from "react-scroll-to-top";
import axios from "axios";

const Media = () => {

    const navigate = useNavigate();
    const name = localStorage.getItem('name');

    const [text, setText] = useState({ comments: "" });
    const [inp, setInp] = useState("");
    const [er, setEr] = useState(false);
    const [formE, setFormE] = useState({});

    const [media, setMedia] = useState({});
    const [cmt, setCmt] = useState({});

    const [m_id, setM_id] = useState("");

    const handleInp = (e) => {
        setInp(e.target.value);
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setText({ ...text, [name]: value })
    }

    const handleClick = async (id) => {
        if (text.comments !== "") {
            const url = await `http://localhost:2400/comment/comment_post/${id}`
            setM_id(id);
            const resp = await axios.post(url, text, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": await localStorage.getItem('post_token')
                },
                body: JSON.stringify(Object.assign({}, text))
            });

            if (resp.status === 200) {
                console.log("post comment", resp.data);
                setText("");
                window.location.reload()
            } else;
        } else {
            setFormE(validate(text));
            setEr(true);
        }
    }

    const callApi = async () => {
        const url = "http://localhost:2400/media";
        const resp = await axios.get(url, media, {
            body: JSON.stringify(Object.assign({}, media))
        });
        setMedia(resp.data);
    }

    const getComment = async () => {
        const url2 = `http://localhost:2400/comment/${m_id}`
        const res = await axios.get(url2);
        console.log("det comments", res.data)
        setCmt(res.data);
    }

    useEffect(() => {
        getComment()
        callApi();
    }, {})


    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('post_id');
        localStorage.removeItem('post_token');
        console.log("clicked")
        navigate('/')
    }

    const validate = (txt) => {
        let errors = {};
        if (!txt.comments) {
            errors.comments = "their is no comment!";
        }
        return errors;
    }

    return (
        <>
            <div className='main'>
                <div className='header'>
                    <div className='head'>
                        <img src={require('../images/img1.png')} alt='logo' />
                        <div className='lg_out'>
                            <div className='txt' onClick={logout}>LOGOUT</div>
                        </div>
                        <div className='top'>
                            <div className='brand'>Start Your Entertainment</div>
                            <div className='title'>
                                <div className='name'>Welcome {name}</div>
                            </div>
                        </div>
                    </div>
                    <div className='search'>
                        <input placeholder='Search for post...' type="text" value={inp} onChange={handleInp} />
                        <Link to='/post' className='link'><div className='click'><span>New Post</span></div></Link>
                    </div>
                </div>
                {media.length > 0 ? (
                    <div>
                        {media.length > 0 ? (
                            <>
                                {/* {cmt && cmt.filter(item => {
                                    const searchTerm = inp.toLowerCase();
                                    const getFilter = item.comments;
                                    return getFilter.startsWith(searchTerm)
                                        < div > */}
                                {media && media

                                    .filter(item => {
                                        const searchTerm = inp.toLowerCase();
                                        const getFilter = item.fullName
                                        return getFilter.startsWith(searchTerm);
                                    })
                                    .map((item, index) => (
                                        <>
                                            <main>
                                                <div className='contain' key={index + 1}>
                                                    <div className="col-9">
                                                        <div className="card" id='crd'>
                                                            <div className="top">
                                                                <div className="userDetails">
                                                                    <div className="profilepic">
                                                                        <div className="profile_img">
                                                                            <div className="image">
                                                                                <img src=
                                                                                    "https://media.geeksforgeeks.org/wp-content/uploads/20220609093229/g-200x200.png"
                                                                                    alt="img8" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <h3>{item.postName}</h3>
                                                                </div>
                                                            </div>
                                                            <div className="imgBx">
                                                                <img src={item.post}
                                                                    alt="post-1" className="cover" />
                                                            </div>
                                                            <div className='description'>
                                                                <p className='desc_text'>{item.description}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='comment_box'>
                                                    <div className='comment_area'>
                                                        <input className='com_t' type="text" placeholder='Comment here' name="comments" values={text.comments} onChange={handleChange} />
                                                        <p className='sb' onClick={() => handleClick(item._id)}><i className="fa fa-arrow-right" aria-hidden="true"></i></p>
                                                        <p id="red">{formE.comments}</p>
                                                    </div>
                                                    <div className='slider'>
                                                        {cmt && cmt.map((item, index) => (
                                                            <div className='cmn_t' key={index + 1}>
                                                                <div className='cmt_list'>
                                                                    {item.comments}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                </div>
                                            </main>
                                        </>
                                    ))
                                }
                            </>
                        ) : (
                            <div id='filter'>
                                Their is no search for item
                            </div>
                        )}
                    </div>
                ) : (
                    <div id='gif'>
                        <img src={require('../images/gif1.gif')} alt='' />
                    </div>
                )}
                <ScrollToTop smooth top="20" className='push' />
            </div>
        </>
    )
}

export default Media
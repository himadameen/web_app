import React, { useState } from 'react'
import ReactFileReader from 'react-file-reader';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Post = () => {


  const [text, setText] = useState({ postName: "", post: "", description: "" });

  const submit = async () => {
    if (text.post !== "" && text.p_name !== "" && text.p_des !== "") {
      const url = "http://localhost:2400/media/create"
      const res = await axios.post(url, text)
      console.log(res.data);
      if (res.status === 200) {
        localStorage.setItem("post_token", res.data.token)
        window.alert("Successfully Posted")
        setText("");
      } else {
        window.alert("Invalid Credentials !!")
      }
    } else {
      window.alert("Something is incorrect")
    }
  }

  const handleFiles = files => {
    setText((pre) => ({ ...pre, post: files.base64[0] }));
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setText({ ...text, [name]: value })
    // console.log({ ...text, [name]: value })
  }

  return (
    <>
      <div className='p_main'>
        <div id='back'>
          <Link to='/media' id='link'><i className="fa fa-long-arrow-left" aria-hidden="true"></i></Link>
        </div>
        <div className="post_main">
          <div className='post_title'>
            Post your <span>Memories</span>
          </div>
          <div className='post_head'>
            <div className='post_pic'>
              <div className='post'>
                <img src={text.post} alt='' />
              </div>
              <div className='post_content'>
                <div className='post_icon'>
                  <i className="fa fa-cloud-upload" aria-hidden="true"></i>
                  <div className='text'>No file chosen yet</div>
                </div>
              </div>
              <div className='cancel-btn'>
                <i className="fa fa-times" aria-hidden="true"></i>
              </div>
            </div>
            <div className='des'>
              <input className='des_t' name='postName' type="text" placeholder='enter your username' values={text.postName} onChange={handleChange} />
            </div>
            <div className='des'>
              <input className='des_t' name='description' type="text" placeholder='write your description here' values={text.description} onChange={handleChange} />
            </div>
            <ReactFileReader base64={true} multipleFiles={true} handleFiles={handleFiles}>
              <input type='file' id='default-btn' />
            </ReactFileReader>
            <div onClick={submit} id='custom-btn'>Submit</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Post
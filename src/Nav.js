import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth'
import Media from './components/Media'
import Post from './components/Post'
import Login from './components/Login'

const Nav = () => {

    const token = localStorage.getItem('token');

    return (
        <>
            <div className='nav'>
                <BrowserRouter>
                    {token ? (
                        <Routes>
                            <Route path='/post' element={<Post />} />
                            <Route path='/media' element={<Media />} />
                            <Route path='/' element={<Auth />} />
                            <Route path='/login' element={<Login />} />
                        </Routes>
                    ) : (
                        <Routes>
                            <Route path='/post' element={<Post />} />
                            <Route path='/media' element={<Media />} />
                            <Route path='/' element={<Auth />} />
                            <Route path='/login' element={<Login />} />
                        </Routes>
                    )}
                </BrowserRouter>
            </div>
        </>
    )
}

export default Nav
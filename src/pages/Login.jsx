import React, { useState } from 'react';
import { login } from '../firebase';
import { useDispatch } from 'react-redux';
import {login as loginHandle} from "../store/auth";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
   const dispatch = useDispatch();
   const navigate = useNavigate();
  
    const handleSubmit = async e => {
      e.preventDefault()
  
      const user = await login(email, password)
      if (user) {  
      dispatch(loginHandle(user))
      console.log(user);
      navigate('/',{
        replace:true 

      }
    )}
    }
  
  return (
    <>
    <form className='max-w-xl mx-auto grid gap-y-4 py-4 ' onSubmit={handleSubmit}>
  <div>
  
  <label className='block text-sm font-medium text-gray-700'>E-posta
  
  </label>
  <div className='mt-1'>
  <input type="email"
  name='email' 
  placeholder='email'
  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-50'
  value={email} onChange={e => setEmail(e.target.value)}/>
  </div>
  
  </div>
  
  <div>
  
  <label className='block text-sm font-medium text-gray-700'>Parola
  
  </label>
  <div className='mt-1'>
  <input type="password"
  placeholder='Şifre giriniz'
  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-700'
  vvalue={password} onChange={e=> setPassword(e.target.value)}/>
  </div>
  
  </div>
  
  <div>
  <button className=' cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm text-white font-medium rounded-md indigo-600 bg-indigo-800 hover:bg-indigo-700 focus:outline-none focus-ring-2 focus:ring-indigo-500' disabled={!email || !password} type='submit'>Giriş Yap</button>
  
  </div>
  
        </form>
      
      </>
    )
  }
  
export default Login;

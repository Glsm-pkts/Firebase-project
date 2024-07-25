
import { useState } from 'react';
import { register } from '../firebase';

export default function Register(){

    const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const handleSubmit = async e => {
    e.preventDefault()

    const user = await register(email, password)
    console.log(user);
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
<button className=' cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm text-white font-medium rounded-md indigo-600 bg-indigo-800 hover:bg-indigo-700 focus:outline-none focus-ring-2 focus:ring-indigo-500' disabled={!email || !password} type='submit'>KAYIT OL</button>

</div>

      </form>
    
    </>
  )
}


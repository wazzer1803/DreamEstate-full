import React from 'react'
import { Link,useNavigate } from 'react-router-dom' 
import { useState } from 'react'
import OAuth from '../components/OAuth';
export default function SignUp() {
  const [formData,setFormData]=useState({})
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange=(e)=>{
    
    setFormData({
      ...formData,
      [e.target.id]:e.target.value
    })
  }
  const handleSubmit= async(e)=>{
    e.preventDefault()
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })
      const data =await res.json()
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    
    } catch (error) {
      console.log(error)
       setLoading(false); 
      setError(error.message) 
    }
    
    
  }
  // console.log(formData)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-bold text-center my-7'>
        Sign Up
        </h1>
        <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
          <input type="text" placeholder="username "className="border p-3 rounded-lg" id="username" onChange={handleChange}/>
          <input type="email" placeholder="email" className="border p-3 rounded-lg "id="email" onChange={handleChange}/>
          <input type="password" placeholder="password" className="border p-3 rounded-lg" id="password" onChange={handleChange}/>
        <button  disabled={loading} className ="bg-slate-900 text-white p-3 rounded-lg hover:opacity-95 disabled opacity:80"> {loading?"LOADING...":"SIGN UP"}</button>
        </form>
        <OAuth/>
      <div className='flex gap-2 mt-4 text-md text-bold'>
        <p> Have an Account ?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-800 text-bold '>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}



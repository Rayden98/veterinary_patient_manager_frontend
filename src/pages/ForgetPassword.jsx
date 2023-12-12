import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from '../components/Alert';
import clientAxios from '../config/axios';

const ForgetPassword = () => {
  const [email, setEmail] = useState('')
  const [alert, setAlert] = useState({})

  const handleSubmit= async e => {
    e.preventDefault()

    if(email === '' || email.length < 6){
      setAlert({msg: 'The email is mandatory', error: true})
      return
    }

    try{
      const { data } = await clientAxios.post('/veterinarians/forget-password', { email })
      
      setAlert({msg: data.msg})
    }catch(error){
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alert
  
  return (
    <>
      <div>
          <h1 className="text-indigo-600 font-black text-6xl">
            Recover your access and dont lose {""}
            <span className="text-black">your patients</span>
          </h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
          { msg && <Alert
            alert={alert}
          />}
          <form
            onSubmit={handleSubmit}
          >
          <div className="my-5">
              <label
                className="uppercase text-gray-600 block text-xl font-bold"
              >
                Email
              </label>
              <input 
                type="email"
                placeholder="Registration Email"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <input 
              type="submit"
              value="Send instructions"
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold 
              mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"/>
          </form>
          <nav className='mt-10 lg:flex lg:justify-between'>
            <Link 
              className='block text-center my-5 text-gray-500'
              to="/">You already have an account? Log in</Link>
            <Link 
              className='block text-center my-5 text-gray-500'
              to="/register">you dont have an account? Register</Link>

          </nav>
      </div>  
    </>
  )
}

export default ForgetPassword
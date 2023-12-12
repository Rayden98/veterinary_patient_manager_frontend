import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Alert from '../components/Alert';
import clientAxios from '../config/axios';

const NewPassword = () => {
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState({})
  const [tokenValid, setTokenValid] = useState(false)
  const [passwordModified, setPasswordModified] = useState(false)
  
  const params = useParams()
  const { token } = params

  useEffect(() => {
    const checkToken = async () => {
      try{
        await clientAxios(`/veterinarians/forget-password/${token}`)
        setAlert({
          msg: 'Put your new password'
        })
        setTokenValid(true)
      }catch(error){
        setAlert({
          msg: 'Has been an error with the link',
          error: true
        })
      }
    }
    checkToken()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(password.length < 6){
      setAlert({
        msg: 'The password must be at minimum of 6 characteres',
        error: true
      })
      return
    }
    
    try{
      const url = `/veterinarians/forget-password/${token}`
      const { data } = await clientAxios.post(url, { password } )
      setAlert({
        msg: data.msg
      })
      setPasswordModified(true)
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
            Restore your password and dont lose access to {""}
            <span className="text-black">your patients</span>
          </h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

        { msg && <Alert
            alert={alert}
          />}

          {tokenValid && (
            <>
              <form onSubmit={handleSubmit}>
                <div className="my-5">
                      <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                      >
                        New Password
                      </label>
                      <input 
                        type="password"
                        placeholder="Your new password"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                </div>
                    <input 
                      type="submit"
                      value="Save New Password"
                      className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold 
                      mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"/>
              </form>
              
            </>
          )}
          {passwordModified && <Link 
              className='block text-center my-5 text-gray-500'
              to="/">Log in</Link>
          }

        
      </div>
    </>
  )
};

export default NewPassword
import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from '../hooks/useAuth';
import Alert from '../components/Alert';

const EditProfile = () => {

  const { auth, updateProfile } = useAuth()
  const [profile, setProfile] = useState({})
  const [alert, setAlert] = useState({})
  
  useEffect( () => {
    setProfile(auth)
      
  }, [auth])

  const handleSubmit = async e => {
    e.preventDefault()
    const { name, email } = profile
    if([name, email].includes('')){
      setAlert({
        msg: 'Email and Name are mandatory',
        error: true
      })
      return
    }

    const result = await updateProfile(profile)
    setAlert(result)
  }
  const { msg } = alert
  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-10">Edit Profile</h2>
      <p className="text-xl mt-5 mb-10 text-center">Modify your {''} 
      <span className="text-indigo-600 font-bold">Information here</span>
      </p>
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          {msg && <Alert alert={alert} />}
          <form
            onSubmit={handleSubmit}
          >
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">Name</label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="name"
                value={profile.name || ''}
                onChange={e => setProfile({
                  ...profile,
                  [e.target.name] : e.target.value
                })}
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">Web Site</label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="web"
                value={profile.web || ''}
                onChange={e => setProfile({
                  ...profile,
                  [e.target.name] : e.target.value
                })}
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">Cellphone</label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="cellphone"
                value={profile.cellphone || ''}
                onChange={e => setProfile({
                  ...profile,
                  [e.target.name] : e.target.value
                })}
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">Email</label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="email"
                value={profile.email || ''}
                onChange={e => setProfile({
                  ...profile,
                  [e.target.name] : e.target.value
                })}
              />
            </div>

            <input 
              type="submit"
              value="Save Changes"
              className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg 
              uppercase w-full mt-5"
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default EditProfile
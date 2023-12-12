import { useState } from 'react'
import AdminNav from "../components/AdminNav";
import Alert from "../components/Alert";
import useAuth from '../hooks/useAuth';

const ChangePassword = () => {

    const { savePassword } = useAuth()

    const [alert, setAlert] = useState({})
    const [password, setPassword] = useState({
        pwd_actual: '',
        pwd_new: ''
    })

    const handleSubmit = async e => {
        e.preventDefault();

        if(Object.values(password).some( field => field === '')){
            setAlert({
                msg: 'All the fields are mandatory',
                error: true
            })
            return
        }
        if( password.pwd_new.length < 6){
            setAlert({
                msg: 'The password must have at minimum 6 characteres',
                error: true
            })
        }
        const response = await savePassword(password)
        setAlert(response)
    }
    const { msg } = alert
    return (
            <>
                    <AdminNav />

                    <h2 className="font-black text-3xl text-center mt-10">Change Password</h2>
                    <p className="text-xl mt-5 mb-10 text-center">Modify your {''} 
                    <span className="text-indigo-600 font-bold">Password here</span></p>

                    <div className="flex justify-center">
                        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                            {msg && <Alert alert={alert} />}
                            <form
                                onSubmit={handleSubmit}
                            >
                                <div className="my-3">
                                        <label className="uppercase font-bold text-gray-600">Actual Password</label>
                                        <input
                                            type="password"
                                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                            name="pwd_actual"
                                            placeholder='Write your actual password'
                                            onChange={e => setPassword({
                                                ...password,
                                                [e.target.name] : e.target.value
                                            })}
                                        />
                                        <div className="my-3">
                                        <label className="uppercase font-bold text-gray-600">New Password</label>
                                        <input
                                            type="password"
                                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                            name="pwd_new"
                                            placeholder='Write your your new password'
                                            onChange={e => setPassword({
                                                ...password,
                                                [e.target.name] : e.target.value
                                            })}
                                        />
                                    

                                        <input 
                                        type="submit"
                                        value="Save Changes"
                                        className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg 
                                        uppercase w-full mt-5"
                                        
                                        />
                                    </div>
                                </div>
                            </form>
                            
                        </div>
                    </div>
            </>
        )
}

export default ChangePassword
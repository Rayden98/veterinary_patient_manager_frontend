import { useState, useEffect, createContext } from 'react'
import clientAxios from '../config/axios'
const AuthContext = createContext()
const AuthProvider = ({children}) => {
    
    const[loading, setLoading] = useState(true)
    const[ auth, setAuth ] = useState({})

    useEffect(() => {
        const authenticateUser = async () =>{
            const token = localStorage.getItem('token')
            
            if(!token){
                setLoading(false)
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try{
                const { data } = await clientAxios('/veterinarians/profile', config)
                
                setAuth(data)
            }catch(error){
                console.log(error.response.data.msg)
                setAuth({})
            }

            setLoading(false)

        }
        authenticateUser()
    }, [])

    const closeSession = () => {
        localStorage.removeItem('token')
        setAuth({})
    }

    const updateProfile = async data1 => {
        const token = localStorage.getItem('token')
            
            if(!token){
                setLoading(false)
                return
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try{
                const url = `/veterinarians/profile/${data1._id}`
                const { data } = await clientAxios.put(url, data1, config)

                return {
                    msg: 'Stored correctly'
                }
            }catch(error){
                return {
                    msg: error.response.data.msg,
                    error: true
                }
            }
    }

    const savePassword = async (data1) => {
        const token = localStorage.getItem('token')
            
            if(!token){
                setLoading(false)
                return
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            
            try{
                const url = '/veterinarians/update-password'
                const { data } = await clientAxios.put(url, data1, config)
                console.log(data)

                return{
                    msg: data.msg
                }
            }catch(error){
                return {
                    msg: error.response.data.msg,
                    error: true
                }
            }
        
    }

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading,
                closeSession,
                updateProfile,
                savePassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export{
    AuthProvider
}

export default AuthContext
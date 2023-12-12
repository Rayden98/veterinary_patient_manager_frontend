import {createContext, useState, useEffect } from 'react'
import clientAxios from '../config/axios'
import useAuth from '../hooks/useAuth'

const PatientsContext = createContext()

export const PatientsProvider = ({children}) => {

    const [patients, setPatients] = useState([])
    const [patient, setPatient] = useState({})
    const { auth } = useAuth();

    useEffect(() => {
        const getPatients = async () => {

            try{
                const token = localStorage.getItem('token')
                if(!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clientAxios('/patients', config)
                setPatients(data)

            }catch(error){
                console.log(error)
            }
        }
        getPatients()
    }, [auth])

    const savePatient = async (patient) => {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if(patient.id){
            try{
                const { data } = await clientAxios.put(`/patients/${patient.id}`, patient, config)
                const patientsUpdated = patientes.map(patientState => patientState._id === data._id ? data : patientState)

                setPatients(patientsUpdated)
            }catch(error){
                console.log(error)
            }
        }else{

            try {
                
                const { data } = await clientAxios.post('/patients', patient, config)
    
                const { createdAt, updatedAt, __v, ...patientStored } = data
                setPatients([patientStored, ...patients])
    
            }catch(error){
                console.log(error.response.data.msg)
            }
        }
       
    }

    const setEdition = (patient) => {
        setPatient(patient)
    }

    const deletePatient = async id => {
        const confirm1 = confirm('Do you confirm that you wish delete it?')
        if(confirm1){
            try{
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clientAxios.delete(`/patients/${id}`, config)
                const patientsUpdated = patients.filter( patientsState => patientsState._id !== id)
                setPatients(patientsUpdated)
                
            }catch(error){
                console.log(error)
            }
        }
    }

    return(
        <PatientsContext.Provider
            value={{
                patients, 
                savePatient,
                setEdition,
                patient,
                deletePatient
            }}
        >
            {children}
        </PatientsContext.Provider>
    )
}

export default PatientsContext;
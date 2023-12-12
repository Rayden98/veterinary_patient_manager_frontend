import { useState, useEffect } from 'react'
import Alert from './Alert'
import usePatients from '../hooks/usePatients'

const Form = () => {
    const [name, setName] = useState('')
    const [owner, setOwner] = useState('')
    const [email, setEmail] = useState('')
    const [date, setDate] = useState('')
    const [symptoms, setSymptoms] = useState('')
    const [id, setId] = useState(null)

    const [alert, setAlert] = useState('')

    const { savePatient, patient } = usePatients()

    useEffect(() => {
        if(patient?.name){
            setName(patient.name)
            setOwner(patient.owner)
            setEmail(patient.email)
            setDate(new Date(patient.date).toISOString())
            setSymptoms(patient.symptoms)
            setId(patient._id)
        }
    }, [patient])

    const handleSubmit = e => {
        e.preventDefault()

        // Validate the form
        if([name, owner, email, date, symptoms].includes('')){
            setAlert({
                msg: 'All the fields are mandatory',
                error: true
            })
            return
        }

        
        savePatient({ name, owner, email, date, symptoms, id })
        setAlert({
            msg: 'Saved correctly'
        })
        setName('')
        setOwner('')
        setEmail('')
        setDate('')
        setSymptoms('')
        setId('')
    }
    const { msg } = alert

  return (
    <>
        <h2 className="font-black text-3xl text-center">Manager of patients</h2>
        <p className="text-xl mt-5 mb-10 text-center">
            Add your patients and {''}
            <span className="text-indigo-600 font-bold">Manage them</span>
          </p>
        <form 
            className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md"
            onSubmit={handleSubmit}
        >
            <div className="mb-5">
                <label htmlFor="name"
                className="text-gray-700 uppercase font-bold"
                >Name Pet</label>
                <input
                id="name"
                type="text"
                placeholder="Name of the pet"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={name}
                onChange={e => setName(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="owner"
                className="text-gray-700 uppercase font-bold"
                >Owners name</label>
                <input
                id="owner"
                type="text"
                placeholder="Name of the owner"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={owner}
                onChange={e => setOwner(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="email"
                className="text-gray-700 uppercase font-bold"
                >Email owner</label>
                <input
                id="email"
                type="text"
                placeholder="Email of the owner"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="date"
                className="text-gray-700 uppercase font-bold"
                >Discharge Date</label>
                <input
                id="date"
                type="date"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={date}
                onChange={e => setDate(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="symptoms"
                className="text-gray-700 uppercase font-bold"
                >Symptoms</label>
                <input
                id="symptoms"
                placeholder="Describe the symptoms"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={symptoms}
                onChange={e => setSymptoms(e.target.value)}
                />
            </div>
            <input
                type="submit"
                className="bg-indigo-600 w-full pd-3 text-white uppercase font-bold 
                hover:b-indigo-700 cursor-pointer transition-colors"
                value={ id ? 'Save changes': "Add patients"}
            />
        </form>

        {msg && <Alert alert={alert} />}
    </>
  )
}

export default Form
import usePatients from "../hooks/usePatients";

const Patient = ({patient}) => {

    const { setEdition, deletePatient } = usePatients()

    const { email, date, name, owner, symptoms, _id } = patient

    // console.log(date)

    const formatDate = (date) => {
        const newDate = new Date(date)
        return new Intl.DateTimeFormat('en-US', {dateStyle: 'long'}).format(newDate)
    }

    // console.log(date)

  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
        <p className="font-bold uppercase text-indigo-700 my-2">Name: {''}
            <span className="font-normal normal-case text-black">{name}</span>
        </p>
        <p className="font-bold uppercase text-indigo-700 my-2">Owner: {''}
            <span className="font-normal normal-case text-black">{owner}</span>
        </p>
        <p className="font-bold uppercase text-indigo-700 my-2">Email Contact: {''}
            <span className="font-normal normal-case text-black">{email}</span>
        </p>
        <p className="font-bold uppercase text-indigo-700 my-2">Discharge Date: {''}
            <span className="font-normal normal-case text-black">{formatDate(date)}</span>
        </p>
        <p className="font-bold uppercase text-indigo-700 my-2">Symptoms: {''}
            <span className="font-normal normal-case text-black">{symptoms}</span>
        </p>
        <div className="flex justify-between my-5">
            <button
            type="button"
            className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg"
            onClick={() => setEdition(patient)}
            >Edit</button>
            <button
            type="button"
            className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg"
            onClick={() => deletePatient(_id)}
            >Delete</button>
        </div>
    </div>
  )
}

export default Patient
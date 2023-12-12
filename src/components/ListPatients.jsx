import usePatients from "../hooks/usePatients"
import Patient from "./Patient";

const ListPatients = () => {

  const { patients } = usePatients()
  
  
  return (
    <>
      {patients.length ? (
        <>
          <h2 className="font-black text-3xl text-center">List of patients</h2>

          <p className="text-xl mt-5 mb-10 text-center">
            Manage your {''}
            <span className="text-indigo-600 font-bold"> Patients and Appointments</span>
          </p>

          {patients.map( patient => (
            <Patient
              key={patient._id}
              patient={patient}
            />
          ))}
        </>
      ) : 
      (
        <>
          <h2 className="font-black text-3xl text-center">There arent patients</h2>

          <p className="text-xl mt-5 mb-10 text-center">
            Begin adding patients {''}
            <span className="text-indigo-600 font-bold">and they will appear at this place</span>
          </p>
        </>
      )}
    </>
  )
}

export default ListPatients
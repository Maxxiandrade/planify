import { servicios } from "./Servicios"
import { useAppSelector, useAppDispatch } from "../store/store"
import { addReservation, changeProgress, setProgress } from "../store/features/serviceSlice"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

const Confirmation = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const id = useAppSelector((state) => state.service.service.id);
    const date = useAppSelector((state)=> state.service.date.date)
    const timeSelected = useAppSelector((state)=>state.service.date.time)
    const servicioElegido = servicios.services.find(servicio => servicio.id === id);
    console.log(servicioElegido);
    const service = servicioElegido?.name
    console.log(date);
    
    useEffect(()=>{
      dispatch(changeProgress('Confirmar turno'))
      dispatch(setProgress(90))
    },)

    const handleConfirm = ()=>{
      if (service && timeSelected && date) {
        const dateSelected = {
          date,
          timeSelected
        }
        dispatch(addReservation({ service, dateSelected }));
        
        Swal.fire({
          title: 'Reserva confirmada!',
          text: 'Puedes ver tus reservas en el apartado "Mis Reservas"',
          icon: 'success',
          confirmButtonText: 'Cool'
        }).then((result)=>{
          if(result){
            navigate('/')
          }
        })
      }}
    return (
      <>
    <div className="border border-slate-300 flex flex-col items-start rounded-md">
        <h1 className="my-3 ml-3">Servicio: {servicioElegido?.name}</h1>     
        <br />
        <h1 className="mb-3 ml-5">Fecha: {date}  {timeSelected}</h1>
    </div>

      <hr className="my-2 border border-slate-300" />
    <div className='flex space-x-28 justify-center my-3'>
      <Link to='/schedule'>
      <button className='bg-slate-500 py-2 px-2 text-white rounded-sm'>Anterior</button>  
      </Link>
          <button className='bg-slate-600 py-2 px-2 text-white rounded-sm' onClick={handleConfirm}>Confirmar</button>
    </div>
          <hr className="my-2 border border-slate-300" />
      </>
  )
}

export default Confirmation
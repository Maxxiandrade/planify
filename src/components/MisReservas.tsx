import { useAppSelector } from "../store/store"

const MisReservas = () => {
    const reservas = useAppSelector((state)=> state.service.reservation.reservations)
    console.log(reservas);
    
  return (
   <div >
    <h1>Mis reservas:</h1>
    {reservas.map((reserva)=>{
        return(
            <div  className="border border-slate-300 flex flex-col items-start rounded-md w-full my-3 mb-3">
                <h2 className="my-3 ml-3">
                Servicio: {reserva.service}
                </h2>
            <h2 className="mb-5 ml-5">
                Fecha: {reserva.dateSelected.date} {reserva.dateSelected.timeSelected}
            </h2>
            </div>
        )
    })}
   </div>
  )
}

export default MisReservas
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { servicios } from "../../components/Servicios";


export interface Service {
    id: number;
    name: string;
    description: string;
    category: string;
}

interface ServiceState {
    id: number | null;
    name: string;
    description: string;
    category: string;
}

const initialState: ServiceState = {
    id: null,
    name: '',
    description: '',
    category: ''
}


interface DateState{
    date: string
    time: string
}
const dateState: DateState = {
    date: '',
    time: ''
}

interface ProgressState{
    progress: number 
    status: string
}

const progressState: ProgressState = {
    progress: 20,
    status:''
}

interface dateSelected {
    date: string
    timeSelected: string
}

interface DateSelected {
    date: string;
    timeSelected: string;
}

interface Reservations{
    service: string
    dateSelected: dateSelected
}
interface ReservationState{
    reservations: Reservations[]
    
}

const reservationState: ReservationState = {
    reservations: []
}

export const ServiceSlice = createSlice({
    name: "service",
    initialState:{
        service: initialState,
        date: dateState,
        progress: progressState,
        reservation:reservationState
    },
    reducers: {
        addService: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            const servicio = servicios.services.find(servicio => servicio.id === id);
            if (servicio) {
                state.service = {
                    id: servicio.id,
                    name: servicio.name,
                    description: servicio.description,
                    category: servicio.category
                };
            }
        },
        removeService : (state)=>{
            state.service.id = null
        },
        addAppointment: (state, action: PayloadAction<{ date: string; timeSelected: string }>) => {
            const { date, timeSelected } = action.payload;
            state.date.date = date;
            state.date.time = timeSelected;
        },
        setProgress: (state, action: PayloadAction<number>) => {
            state.progress.progress = action.payload
        },
        changeProgress: (state, action: PayloadAction<string>) =>{

            state.progress.status = action.payload
        },
        addReservation: (state, action: PayloadAction<{ service: string; dateSelected: DateSelected }>) => {
            const newReservation = action.payload;
            state.reservation.reservations.push(newReservation);
        }
    }
})



export const { reducer, actions } = ServiceSlice;
export const { addService, addAppointment, setProgress, removeService, addReservation, changeProgress } = actions;

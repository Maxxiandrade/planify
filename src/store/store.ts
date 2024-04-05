import { configureStore } from "@reduxjs/toolkit";
import { ServiceSlice } from "./features/serviceSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer:{
        service: ServiceSlice.reducer
    }
})


export const useAppDispatch:()=>typeof store.dispatch=useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector;
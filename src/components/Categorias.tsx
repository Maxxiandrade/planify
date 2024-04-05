import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { servicios } from "./Servicios";
import { Link } from "react-router-dom";
import {
  addService,
  changeProgress,
  setProgress,
} from "../store/features/serviceSlice";

interface Service {
  id: number;
  name: string;
  description: string;
  category: string;
}

interface OrganizedServices {
  [category: string]: Service[];
}

const Categorias = () => {
  const dispatch = useAppDispatch();
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [expandedServices, setExpandedServices] = useState<{
    [key: string]: boolean;
  }>({});

  const handleToggle = (category: string) => {
    setExpandedServices((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  const handleSelect = (id: number) => {
    dispatch(setProgress(40));
    setSelectedService(id);
    dispatch(addService(id));
  };
  dispatch(changeProgress("Seleccionar servicio"));

  const id = useAppSelector((state) => state.service.service.id);
  const organizedServices: OrganizedServices = {};
  const serviciosArray = servicios.services;
  serviciosArray.forEach((servicio) => {
    if (!organizedServices[servicio.category]) {
      organizedServices[servicio.category] = [];
    }
    organizedServices[servicio.category].push(servicio);
  });

  useEffect(() => {
    dispatch(setProgress(20));
  });

  return (
    <>
      <div className="border border-slate-300 flex flex-col items-start rounded-md">
        <h1 className="ml-3 mt-5 font">Categorías:</h1>
        <form action="" className="w-full">
          {Object.entries(organizedServices).map(([category, services]) => (
            <div key={category}>
              <div
                className="bg-slate-200 w-11/12 flex items-center justify-between mb-2 my-3 ml-5 rounded-sm cursor-pointer "
                onClick={() => handleToggle(category)}
              >
                <p className="text-thin ml-5 ">{category}</p>
                <img
                  src={expandedServices[category] ? `/minus.svg` : `plus.svg`}
                  alt="icono"
                  className="h-5 mr-5"
                />
              </div>
              {expandedServices[category] &&
                services.map((servicio) => (
                  <div
                    key={servicio.id}
                    className="border border-stone-300 w-11/12 flex flex-col items-start mb-2 my-3 ml-5 rounded-sm"
                  >
                    <p className="ml-3">{servicio.name}:</p>
                    <p className="ml-5">{servicio.description}</p>
                    <br />
                    <div className="flex justify-end w-full">
                      <label
                        htmlFor={`serviceSelection_${servicio.id}`}
                        className={`${
                          selectedService === servicio.id
                            ? "bg-slate-600 rounded-sm mr-3 mb-3 px-2 py-1 text-white cursor-pointer"
                            : "bg-slate-500 rounded-sm mr-3 mb-3 px-2 py-1 text-white cursor-pointer"
                        }`}
                      >
                        <input
                          type="radio"
                          id={`serviceSelection_${servicio.id}`}
                          name="serviceSelection"
                          value={servicio.id}
                          checked={selectedService === servicio.id}
                          onChange={() => handleSelect(servicio.id)}
                          style={{ display: "none" }}
                        />
                        {selectedService === servicio.id
                          ? "Seleccionado"
                          : "Seleccionar"}
                      </label>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </form>
      </div>
      {id != null && (
        <>
          <br />
          <hr className="my-2 border border-slate-300" />
          <div className="flex justify-end items-end ">
            <Link to="/schedule">
              <button
                className="bg-slate-600 rounded-sm px-2 py-2 text-white"
                onClick={() => {}}
              >
                Continuar
              </button>
            </Link>
          </div>
          <hr className="my-3 border border-slate-300" />
        </>
      )}
    </>
  );
};

export default Categorias;

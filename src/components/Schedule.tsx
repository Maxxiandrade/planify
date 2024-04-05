import { useEffect, useState } from "react";
import slots from "../slots.json";
import { Link, useNavigate } from "react-router-dom";
import {
  setProgress,
  addAppointment,
  changeProgress,
} from "../store/features/serviceSlice";
import { useAppDispatch } from "../store/store";

const Schedule = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [timeSelected, setTimeSelected] = useState("");
  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTimeSelected(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = slots.date;
    dispatch(addAppointment({ timeSelected, date }));

    navigate("/confirmation");
  };

  useEffect(() => {
    dispatch(changeProgress("Seleccionar horario"));
    dispatch(setProgress(70));
  });
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="border border-slate-300 flex flex-col rounded-md"
      >
        <div className="flex flex-col">
          {slots.date}
          <div className="grid grid-cols-2 gap-2 ml-10">
            {slots.availableTimeslots.map((slot) => (
              <label
                key={slot}
                className={`w-9/12 block py-2 ${
                  timeSelected === slot
                    ? "bg-gray-700"
                    : "bg-slate-300 cursor-pointer"
                }`}
              >
                <input
                  type="radio"
                  name="timeslot"
                  value={slot}
                  checked={timeSelected === slot}
                  onChange={handleSelect}
                  style={{ display: "none" }}
                />
                <p
                  className={`${
                    timeSelected === slot ? "text-white" : "text-black"
                  }`}
                >
                  {slot}
                </p>
              </label>
            ))}
          </div>
        </div>
        <div className="flex space-x-5 justify-center my-3">
          <Link to="/">
            <button className="bg-slate-600 py-2 px-2 text-white">
              Anterior
            </button>
          </Link>
          <Link to="/confirmation"></Link>
          <button
            className={`${
              timeSelected
                ? "bg-slate-600 py-2 px-2 text-white"
                : "bg-slate-300 py-2 px-3 text-white"
            }`}
            disabled={timeSelected == ""}
          >
            Siguiente
          </button>
        </div>
      </form>
    </>
  );
};

export default Schedule;

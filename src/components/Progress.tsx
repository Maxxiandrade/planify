import { useEffect, useState } from "react";
import { useAppSelector } from "../store/store";

const Progress = () => {
  // const id = useAppSelector((state)=> state.service.service.id)
  const progress = useAppSelector((state) => state.service.progress.progress);
  const status = useAppSelector((state) => state.service.progress.status);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    setPercent(progress);
  }, [progress]);

  return (
    <>
      <p className="font-quicksand">{status}</p>
      <div className="w-full bg-gray-200 rounded-lg overflow-hidden ">
        <div
          className="bg-green-500 h-2"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <br />
    </>
  );
};

export default Progress;

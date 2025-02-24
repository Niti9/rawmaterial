import { useContext } from "react";
import { AppContext } from "../AppContext";
import { GrLinkNext } from "react-icons/gr";
export const CustomButton = ({ label, className = "", style = {}, icon }) => {
  const { formData, onSubmit } = useContext(AppContext);
  return (
    <div
      onClick={() => onSubmit(formData)}
      style={{ ...style }}
      className={`text-center cursor-pointer text-white text-sm sm:text-base font-medium px-[30px] py-2.5  rounded-md justify-center items-center gap-[5px] inline-flex ${className}`}
      // className={`text-center cursor-pointer text-white text-sm sm:text-base font-medium px-[30px] py-2.5 bg-red-500 rounded-md justify-center items-center gap-[5px] inline-flex ${className}`}
    >
      {label ? label : ""}
      {icon ? icon : <GrLinkNext />}
    </div>
  );
};

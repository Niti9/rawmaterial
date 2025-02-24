import React, { useState } from "react";
import { AppContext } from "../AppContext";
import { useContext } from "react";
import DynamicSelect from "../DynamicSelect";
import { PrintLogs } from "@/app/_utils/constant";

export default function InputField({
  errorMessage,
  onInputChange,
  field,
  type = "text",
  style,
  className,
  subClassName,
  subClassName2,
  submitOnEnter = false,
  filterSubmitEnter = false,
  minDate,
  formData,
  maxDate,
  fieldName,
  fieldNameClasses,
  smallFields,
  convertToInt = false,
  placeholder = "Enter Details",
  hidden,
  onInputBlur,
  filterStyle,
  value = "",
  label,
  options,
  placeholderText,
  icon, // New prop for icon
  multiSelect,
  ...restProps
}) {
  const { onSubmit } = useContext(AppContext);
  const onKeyDown = (event) => {
    const keyCode = event["key"];
    if (keyCode === "Enter" && submitOnEnter) {
      onSubmit && onSubmit();
    }
    if (keyCode == "Enter" && filterSubmitEnter) {
      onInputBlur &&
        onInputBlur({
          field,
          value: event.target.value
        });
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  const commonInputProps = {
    value,
    onKeyDown,
    onChange: (e) => onInputChange({ field, value: e.target.value }),
    placeholder
  };

  switch (type) {
    case "text":
      return (
        <>
          <div style={style} className={className}>
            <label className={`block`}>
              <span className={`${subClassName}  `}>{label}</span>

              <div className="relative">
                {/* Icon */}
                {icon && (
                  <span className="absolute inset-y-0 left-3 top-0 flex items-center text-slate-400 dark:text-primary">
                    {icon}
                  </span>
                )}
                <input
                  value={value}
                  className={`
              ${subClassName2}
              ${icon && "!pl-9"}
              form-input 
              focus:outline-none  
            w-full rounded-lg border 
            border-slate-300 bg-transparent px-3 py-2 pl-4
             placeholder:text-slate-400/70 hover:border-slate-400 
             focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent`}
                  // onKeyDown={onKeyDown}
                  // onChange={(e) => onInputChange({ field, value: e.target.value })}
                  // placeholder={placeholder}
                  type="text"
                  {...commonInputProps}
                />
              </div>
            </label>

            {errorMessage && (
              <div className="text-sm text-red mt-2 text-red-400">
                {errorMessage}
              </div>
            )}
          </div>
        </>
      );

    case "password":
      return (
        <div style={style} className={className}>
          <label className={`block`}>
            <span className={`${subClassName} `}>{label}</span>
            <div className="relative flex">
              {icon && (
                <span className="absolute inset-y-0 left-3 top-3 flex items-center text-slate-400 dark:text-primary">
                  {icon}
                </span>
              )}
              <input
                value={value}
                className={`${subClassName2} ${icon && "pl-9"}
                form-input focus:outline-none w-full rounded-lg border 
            border-slate-300 bg-transparent px-3 py-2 pl-4
             placeholder:text-slate-400/70 hover:border-slate-400 
             focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent`}
                type={`${showPassword ? "text" : "password"}`}
                {...commonInputProps}
              />
              <div
                className="cursor-pointer absolute right-0 flex h-full w-10 items-center justify-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-eye-slash-fill size-5 mt-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                  </svg>
                ) : (
                  <svg
                    fill="currentColor"
                    className="size-5 mt-2"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                )}
              </div>
            </div>
          </label>
          {errorMessage && (
            <div className="text-sm text-red mt-2 text-red-400">
              {errorMessage}
            </div>
          )}
        </div>
      );

    case "number":
      return (
        <div style={style} className={className}>
          <label className={`block`}>
            <span className={`${subClassName} `}> {label}</span>
            <div className="relative">
              {/* Icon */}
              {icon && (
                <span className="absolute inset-y-0 left-3 top-3 flex items-center text-slate-400 dark:text-primary">
                  {icon}
                </span>
              )}
              <input
                className={`${subClassName2}
                 ${icon && "pl-9"}
                form-input 
              focus:outline-none  
            w-full rounded-lg border 
            border-slate-300 bg-transparent px-3 py-2 pl-4
             placeholder:text-slate-400/70 hover:border-slate-400 
             focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent`}
                type="number"
                value={value}
                {...commonInputProps}
              />
            </div>
          </label>
          {errorMessage && (
            <div className="text-sm text-red mt-2 text-red-400">
              {errorMessage}
            </div>
          )}
        </div>
      );

    case "textArea":
      return (
        // <div style={style} className={className}>
        //   {/* <textarea
        //     type="text"
        //     rows={3}
        //     value={value}
        //     style={{ height: "93px" }}
        //     className="form-control w-full !rounded-e-none mb-2"
        //     placeholder={placeholder}
        //   /> */}
        //   {errorMessage && (
        //     <div className="text-sm text-red mt-2 text-red-400">
        //       {errorMessage}
        //     </div>
        //   )}
        // </div>

        <>
          <div style={style} className={className}>
            <label className={`block`}>
              <span className={`${subClassName} `}>
                {restProps.isHideLabel ? "" : label}
              </span>

              <div className="relative">
                {/* Icon */}
                {icon && (
                  <span className="absolute inset-y-0 left-3 top-3 flex items-center text-slate-400 dark:text-primary">
                    {icon}
                  </span>
                )}
                <textarea
                  value={value}
                  className={`
            ${subClassName2}
            ${icon && "pl-9"}
            form-input 
            focus:outline-none  
          w-full rounded-lg border  h-10 hover:h-20 transition-h duration-500
           overflow-auto text-balance
          border-slate-300 bg-transparent px-3 py-2 pl-4
           placeholder:text-slate-400/70 
           hover:border-primary dark:border-navy-450  dark:hover:border-accent`}
                  // onKeyDown={onKeyDown}
                  // onChange={(e) => onInputChange({ field, value: e.target.value })}
                  // placeholder={placeholder}
                  type="text"
                  {...commonInputProps}
                />
              </div>
            </label>

            {errorMessage && (
              <div className="text-sm text-red mt-2 text-red-400">
                {errorMessage}
              </div>
            )}
          </div>
        </>
      );

    case "custom":
      let { component, classes } = restProps;
      return (
        <div style={style} className={classes}>
          {component}
        </div>
      );

    case "dropdown":
      console.log("dropdown-value", value);
      return (
        <>
          <div style={style} className={className}>
            <label className="block">
              <span> {label}</span>
              <div className="relative">
                {/* Icon */}
                {icon && (
                  <span className="absolute inset-y-0 left-3 top-3 flex items-center text-slate-400 dark:text-primary">
                    {icon}
                  </span>
                )}
                <select
                  // value={value || 'User'}
                  value={value}
                  className="form-select mt-1.5 w-full   placeholder:font-normal  rounded-lg border focus:outline-none border-slate-300 bg-white px-3 py-2 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:bg-navy-700 dark:hover:border-navy-400 dark:focus:border-accent"
                  // onChange={(e)=>onInputChange({ field, value: e.target.value })}
                  onChange={(e) => {
                    PrintLogs("Dropdown Change:", {
                      field,
                      value: e.target.value
                    });
                    onInputChange({ field, value: e.target.value });
                  }}
                >
                  {options.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </label>
            {errorMessage && (
              <div className="text-sm text-red mt-2 text-red-400">
                {errorMessage}
              </div>
            )}
          </div>
        </>
      );

    case "date":
      return (
        <>
          <div style={style} className={className}>
            <label className="block">
              <span>{label}</span>
              <div className="relative">
                {/* Icon */}
                {icon && (
                  <span className="absolute inset-y-0 left-3 top-2 flex items-center text-slate-400 dark:text-primary">
                    {icon}
                  </span>
                )}
                {/* Date Input Field */}
                <input
                  type="date"
                  value={value} // This should be in 'YYYY-MM-DD' format
                  onChange={(e) => {
                    const rawDate = e.target.value; // Value is in 'YYYY-MM-DD' format

                    // Update the state with the raw 'YYYY-MM-DD' value
                    onInputChange({ field, value: rawDate });

                    // Optional: If you want to show the formatted date elsewhere
                    const formattedDate = rawDate
                      .split("-")
                      .reverse()
                      .join("-");
                    PrintLogs("Formatted Date:", {
                      field,
                      value: formattedDate
                    });
                  }}
                  className="form-input mt-1.5 w-full pl-9 placeholder:font-normal rounded-lg border focus:outline-none border-slate-300 bg-white px-3 py-2 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:bg-navy-700 dark:hover:border-navy-400 dark:focus:border-accent"
                />
              </div>
            </label>
            {errorMessage && (
              <div className="text-sm text-red mt-2 text-red-400">
                {errorMessage}
              </div>
            )}
          </div>
        </>
      );

    case "dynamicSelect":
      return (
        <>
          <DynamicSelect
            disabled
            style={style}
            type={type}
            field={field}
            value={value}
            label={label}
            placeholder={placeholder}
            subClassName={subClassName}
            multiSelect={multiSelect}
            {...restProps}
            errorMessage={errorMessage}
            // onInputChange={(e) =>
            //   onInputChange({
            //     field,
            //     value: e.value,
            //   })
            // }

            onInputChange={(value) => {
              // console.log(
              //   " field are--",
              //   field,
              //   " value is here ---",
              //   value.value
              // );
              console.log("rest props are", label);

              onInputChange({ field: field, value: value.value });
            }}
            // onInputChange={(value) =>
            //   onInputChange({ field: field.field, value: value })
            // }
          />
          {/* <DynamicSelect
            disabled
            style={style}
            type={type}
            field={field}
            value={value}
            {...restProps}
            // errorMessage={errorMessage}
            // onInputChange={(e) =>
            //   onInputChange({
            //     field,
            //     value: e.value,
            //   })
            // }

            onInputChange={(value) => {
              // console.log(
              //   " field are--",
              //   field,
              //   " value is here ---",
              //   value.value
              // );
              console.log("rest props are", restProps);

              onInputChange({ field: field, value: value.value });
            }}
            // onInputChange={(value) =>
            //   onInputChange({ field: field.field, value: value })
            // }
          /> */}
        </>
      );
    // "select";
    // "date",
    // "daterange"
    // radio
    // checkbox
  }
}

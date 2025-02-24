///**updated code  upper code is best but try somthing new here*/
"use client";
import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { ApiFetcher } from "../_customHooks/useButtonClickFetcher";
import { PrintLogs } from "../_utils/constant";
import { AppContext } from "./AppContext";

export default function DynamicSelect(props) {
  const {
    value: selectedValue = "",
    getData,
    onInputChange,
    placeholderValue,
    placeholder,
    label,
    subClassName,
    errorMessage
  } = props;

  // PrintLogs('selectedvalue',selectedValue);

  const [options, setOptions] = useState([]);
  const [defaultSelectValue, setDefaultSelectValue] = useState(null);

  const { valueKey, labelKey, dynamicFieldId } = getData || {};
  const { formData } = useContext(AppContext);
  console.log("formdata is ", formData);
  const searchId = formData[dynamicFieldId] || "";

  const getOptions = async () => {
    var responseData = [];

    if (dynamicFieldId && !searchId) {
      PrintLogs("Skipping API call: No value for dynamicField", dynamicFieldId);
      return; // Exit the function early if dynamicField is required but missing
    }

    if (dynamicFieldId) {
      responseData = await ApiFetcher(getData["service"], {}, searchId);
    } else {
      responseData = await ApiFetcher(getData["service"]);
    }
    PrintLogs("dynamic select response data", responseData);

    const options = responseData.data.map((item) => {
      if (selectedValue === item[valueKey])
        setDefaultSelectValue({
          value: item[valueKey],
          label: item[labelKey]
        });

      return {
        value: item[valueKey],
        label: item[labelKey]
      };
    });

    // If a selectedValue exists, set it as the default
    const defaultOption = options.find((opt) => opt.value === selectedValue);

    setOptions(options); // Populate dropdown with options
    if (defaultOption) {
      setDefaultSelectValue(defaultOption);
    }
  };

  // const getOptions = async () => {
  //   const responseData = await ApiFetcher(getData["service"]);
  //   PrintLogs("dynamic select response data", responseData);

  //   const { valueKey, labelKey } = getData;
  //   const options = responseData.data.map((item) => {
  //     if (selectedValue === item[valueKey])
  //       setDefaultSelectValue({ value: item[valueKey], label: item[labelKey] });

  //     return {
  //       value: item[valueKey],
  //       label: item[labelKey]
  //     };
  //   });
  //   // } ({
  //   //   value: item[valueKey],
  //   //   label: item[labelKey],
  //   // }));

  //   // If a selectedValue exists, set it as the default
  //   const defaultOption = options.find((opt) => opt.value === selectedValue);

  //   setOptions(options); // Populate dropdown with options
  //   if (defaultOption) {
  //     setDefaultSelectValue(defaultOption);
  //   }
  // };

  useEffect(() => {
    getOptions();
  }, [searchId]);

  // Extract MultiSelectTrue from getData
  const isMulti = getData?.MultiSelectTrue || false;

  return (
    <div>
      <p
        className={`${subClassName} text-black dark:text-[#a3adc2]  text-sm mb-2`}
      >
        {label}
      </p>

      <Select
        onChange={(selectedOption) => {
          // PrintLogs("Selected option:", selectedOption);
          setDefaultSelectValue(selectedOption); // Update internal state
          onInputChange(selectedOption); // Notify parent of the change
        }}
        isMulti={isMulti}
        placeholder={placeholder ? placeholder : "Select Value"}
        // placeholder={placeholderValue ? placeholderValue : "Select Value"}
        value={defaultSelectValue}
        options={options}
        isSearchable
        classNamePrefix="custom-select" // Assign a prefix for styling
        // classNamePrefix="Select2"
        styles={{
          control: (provided, state) => ({
            ...provided,
            minWidth: "110px",
            width: "100%",
            borderRadius: "0.35rem",
            background: "transparent",
            // backgroundColor: "rgba(255, 255, 255, var(--tw-bg-opacity))",
            fontSize: "0.875rem",
            fontWeight: 400,
            // marginRight: "10px",
            borderColor: state.isFocused ? "#a0aec0" : "#d1d5db",
            boxShadow: state.isFocused ? "0 0 0 1px #a0aec0" : "none"
          }),
          menu: (provided) => ({
            ...provided,
            zIndex: 9999,
            borderRadius: "0.35rem"
          }),
          menuList: (provided) => ({
            ...provided,
            maxHeight: "150px", // Set max height
            overflowY: "auto", // Enable scrolling
            backgroundColor: "rgb(30,41,59,1)", // Ensure background color matches

            // padding: 2, // Remove default padding
            borderWidth: "0.50px",
            borderRadius: 8
          }),
          option: (provided, state) => ({
            ...provided,
            fontSize: "0.875rem",
            fontWeight: 400,
            backgroundColor: state.isSelected
              ? "rgb(30,41,59,1)"
              : state.isFocused
              ? "rgb(173 173 174) "
              : "rgb(30,41,59,1)",
            color: "white !important"

            // backgroundColor: state.isSelected
            //   ? "rgba(229, 231, 235, var(--tw-bg-opacity))"
            //   : state.isFocused
            //   ? "rgba(243, 244, 246, var(--tw-bg-opacity))"
            //   : "#fff",
            // color: "black !important"
          }),
          input: (provided) => ({
            ...provided,
            fontSize: "12.5px",
            fontWeight: "normal",
            color: "black"
            // color: "white"
          }),
          singleValue: (provided) => ({
            ...provided,
            fontSize: "14px",
            fontWeight: 400,
            color: "rgb(173 173 174) !important"
          })
        }}
      />
      {errorMessage && (
        <p className="text-sm text-red mt-2 text-red-400">{errorMessage}</p>
      )}
    </div>
  );
}

import { useState, useEffect, useContext } from "react";
// import styles from "./index.module.css";
import InputField from "./InputField";
import { AppContext } from "../AppContext";
import { validateField } from "@/app/_utils/constant";

export default function Form({
  setResetForm,
  hideHeader = false,
  error,
  actions,
  formLayout,
  resetForm = false,
  onSubmitForm,
  disabled,
  updateOnChangeDefaultData = false,
  inputProps,
  getDataOnchange: propsDataChange,
  defaultData = {}, //edit
  customHeading,
  contextProps = {},
  component,
  flexStyle = {},
  inputFieldCss,
  subClassName,
  subClassName2,
}) {
  const { heading, smallFields, layout, fields, loadingText } =
    formLayout || {};

  const [formData, setFormData] = useState(defaultData || {});

  // useEffect(() => {
  //   if (defaultData && Object.keys(defaultData).length > 0) {
  //     setFormData(defaultData);
  //   }
  // }, [defaultData]);

  const [validationData, setValidationData] = useState({});
  const [uploading, setUploading] = useState(false);
  const { getDataOnChange } = useContext(AppContext);

  useEffect(() => {
    if (Object.keys(validationData).length > 0) setValidationData({});
  }, [formLayout]);

  useEffect(() => {
    if (updateOnChangeDefaultData && Object.keys(defaultData).length > 0) {
      setFormData(defaultData);
    }
  }, [defaultData]);

  const onInputChange = ({ field, value, maxLength }) => {
    if (maxLength && value && value.length > maxLength) {
      return;
    }
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    getDataOnChange &&
      getDataOnChange({ updatingField: field, formData: newFormData });
    propsDataChange &&
      propsDataChange({ updatingField: field, formData: newFormData });
    if (validationData[field]) {
      delete validationData[field];
    }
  };

  const isValid = () => {
    let isDataValidate = {};
    fields.map((item) => {
      const { mandatory, validation, customValidation, emailValidation } = item;
      const { field, label } = item;
      let value = Array.isArray(formData[field])
        ? formData[field][0]?.trim()
        : formData[field]?.trim();
      if (!value && mandatory) {
        if (error) {
          return error;
        } else {
          isDataValidate[field] = `${label} is mandatory`;
        }
      } else if (value && validation) {
        if (!validateField({ type: validation, value })) {
          if (validation == "password") {
            isDataValidate[field] = `${label} should be 8 digits/characters`;
          } else {
            isDataValidate[field] = `${label} is not valid`;
          }
        }
      } else if (value && customValidation) {
        let { isValid, message, field } = customValidation({ formData });
        if (!isValid) {
          isDataValidate[field] = message || `${label} is not valid`;
        }
      } else if (value && emailValidation) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const testEmail = emailRegex.test(value);
        if (!testEmail) {
          isDataValidate[field] = `${label} is not valid`;
        }
      }
    });
    if (Object.keys(isDataValidate).length > 0) {
      setValidationData(isDataValidate);
      return false;
    } else {
      setValidationData({});
      return true;
    }
  };
  const onSubmit = async () => {
    if (uploading) {
      return;
    }
    if (isValid()) {
      setUploading(true);
      onSubmitForm && (await onSubmitForm(formData));
      setUploading(false);
    }
  };

  useEffect(() => {
    if (resetForm) {
      let newFormData = {};
      for (var key in formData) {
        newFormData[key] = "";
      }
      setFormData(newFormData);
      setResetForm(false);
    }
  }, [resetForm]);

  console.log("defaultData", defaultData);
  return (
    <AppContext.Provider
      value={{
        onSubmit: onSubmit,
        formData,
        uploading,
        loadingText,
        ...contextProps,
      }}
    >
      <div className={"flex flex-col f16 fullWidth"}>
        {!hideHeader && (
          <div className={` c1 text-base md:text-2xl font-semibold `}>
            {customHeading || heading}
          </div>
        )}
        <div className={`bgWhite flex-1 ${flexStyle}`}>
          <div className={`formLayout fullWidth gap-[24px] grid ${layout}`}>
            {fields.map((element, index) => {
              return (
                <InputField
                  inputProps={{ inputProps }}
                  formData={formData}
                  smallFields={smallFields}
                  disabled={disabled}
                  errorMessage={validationData[element?.field]}
                  value={formData[element?.field] || ""}
                  onInputChange={onInputChange}
                  key={index}
                  {...element}
                  className={inputFieldCss}
                  subClassName={subClassName}
                  subClassName2={subClassName2}
                />
              );
            })}
          </div>
          {component ? component : <></>}
          {error && <div className={"errorStyle fullWidth"}>{error}</div>}
          {actions}
        </div>
      </div>
    </AppContext.Provider>
  );
}

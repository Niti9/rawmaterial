"use client";
import { CustomButton } from "@/app/_components/Forms/CustomButton";
import Form from "@/app/_components/Forms/Form";
import React, { useState } from "react";
import { GrLinkNext } from "react-icons/gr";
import { MdCancel } from "react-icons/md";
import { Stepper, Step } from "react-form-stepper";
import PageTitle from "@/app/_components/PageTitle";
import toast from "react-hot-toast";
import { ApiFetcher } from "@/app/_customHooks/useButtonClickFetcher";
import { mockUserData, UserForm } from "../../constant";
import { PrintLogs } from "@/app/_utils/constant";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoArrowForwardSharp } from "react-icons/io5";
const Request = () => {
  // State to store selected values as { locationId: space }
  const [itemDeatils, setItemDetails] = useState({
    CheckInStatus: "Pending",
    itemTypeId: "",
    totalSize: 0
  });
  const [step, setStep] = useState(0); // Track the current step
  // State for storage details
  const [storeageDetails, setStorageDetails] = useState([]);
  const [availableLocationsCapacity, setAvailableLocationsCapacity] = useState(
    []
  );

  const [plantId, setSelectedPlantId] = useState("");
  //   console.log("mockUserData are", mockUserData);

  const handleStorageSelection = (locationId, availableCapacity) => {
    setStorageDetails((prevStorage) => {
      const existingStorage = prevStorage.find(
        (item) => item.locationId === locationId
      );

      if (existingStorage) {
        // If already selected, remove it
        return prevStorage.filter((item) => item.locationId !== locationId);
      } else {
        // If not selected and space is available, add it
        if (remainingSpace > 0) {
          const allocatedSpace = Math.min(availableCapacity, remainingSpace);
          return [...prevStorage, { locationId, storage: allocatedSpace }];
        }
      }
      return prevStorage;
    });
  };

  // Compute selected and remaining space
  const selectedSpace = storeageDetails.reduce(
    (acc, item) => acc + item.storage,
    0
  );
  const remainingSpace = itemDeatils.totalSize - selectedSpace;
  //   const remainingSpace = itemDetails.totalSize - selectedSpace;

  // Final formatted data
  const finalData = {
    itemDeatils,
    storeageDetails
  };

  console.log("Final Data:", finalData);

  const getAvailableLocations = async (payload) => {
    console.log("payload is ", payload);
    setItemDetails({
      CheckInStatus: "Pending",
      itemTypeId: payload.itemTypeId,
      totalSize: payload.itemSize
    });

    try {
      const response = await ApiFetcher(
        "getAvailableLocations",
        {},
        payload?.plantId
      );
      console.log("response is", response);
      //   setAvailableLocationsCapacity(response?.data);

      if (response?.code === 0) {
        const totalCapacity = response.data.reduce(
          (acc, loc) => acc + loc.availableCapacity,
          0
        );

        // Check if totalSize exceeds total available capacity
        if (payload.itemSize > totalCapacity) {
          toast.error(
            `Total requested size (${payload.itemSize}) exceeds available capacity (${totalCapacity}).`
          );
          return; // Stop execution
        }

        setAvailableLocationsCapacity(response.data);
        setSelectedPlantId(payload?.plantId);
        setStep(1); // Move to Step 2
      } else {
        toast.error(`No available locations found.${response.message}`);
        return;
      }
    } catch (error) {
      PrintLogs(error);
    }
  };
  const createPlantLocationsBlock = async () => {
    console.log("storageDetails finall data is here ", finalData);
    // setStep(2);

    try {
      const response = await ApiFetcher(
        "createPlantLocationsBlock",
        finalData,
        plantId
      );
      console.log("response is", response);
      if (response?.code === 0) {
        setStep(2);
      }
      //   const response = await ApiFetcher("getAvailableLocations", payload);
      //   if (response?.code === 0) {
      //     toast.success(response?.message);
      //     plantsRefetch();
      //     // setPlantsFetch(!plantsRefetch);
      //     setIsModalOpen(!isModalOpen);
      //     return;
      //   } else {
      //     toast.error(response.message);
      //     return;
      //   }
    } catch (error) {
      PrintLogs(error);
    }
  };

  return (
    <div>
      <Stepper
        activeStep={step}
        styleConfig={{ activeBgColor: "#4F46E5", completedBgColor: "#22C55E" }}
      >
        <Step label="Fill Item Form" />
        <Step label="Select Storage" />
        <Step label="Complete" />
      </Stepper>

      {step === 0 && (
        <div className="pt-4 h-full  px-2">
          <Form
            onSubmitForm={getAvailableLocations}
            actions={
              <div className="flex  my-6 justify-center">
                <CustomButton
                  label={"Get Available Locations"}
                  className={`!text-white my-1 justify-between bg-primary mt-2 hover:bg-focus focus:bg-focus active:bg-focus/90 dark:bg-accent dark:hover:bg-focus dark:focus:bg-focus dark:active:bg-accent/90`}
                />
              </div>
            }
            setResetForm={() => setFormData({})}
            inputFieldCss={` text-[#64748b] dark:text-[#a3adc2] `}
            subClassName={` `}
            subClassName2={`border-slate-300 bg-transparent px-3 pb-2
                  mt-4
                  placeholder:font-normal
                  focus:outline-none
                  `}
            formLayout={UserForm.PlantsFromMapping}
          />
        </div>
      )}

      {step === 1 && (
        // <div className=" p-5 h-full overflow-y-auto is-scrollbar-hidden">
        <div className="flex flex-col items-center p-5 h-full overflow-y-auto is-scrollbar-hidden">
          <h1 className="text-2xl font-bold mb-5 ">
            Selected Space: {selectedSpace} | Remaining: {remainingSpace}
          </h1>
          {/* Grid of boxes */}

          <div className="grid grid-cols-3 md:grid-cols-5  gap-4 mb-8">
            {availableLocationsCapacity &&
              availableLocationsCapacity.map((item) => {
                const selectedItem = storeageDetails.find(
                  (s) => s.locationId === item._id
                );
                const isDisabled = remainingSpace === 0 && !selectedItem;

                return (
                  <div
                    key={item._id}
                    className={`px-8 py-4 border rounded-lg cursor-pointer text-center text-white text-xl font-semibold transition
              ${
                selectedItem
                  ? "bg-blue-800 shadow-lg scale-105"
                  : "bg-green-500 hover:bg-green-600"
                //   : "bg-blue-500 hover:bg-blue-600"
              }
              ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
            `}
                    onClick={() =>
                      !isDisabled &&
                      handleStorageSelection(item._id, item.availableCapacity)
                    }
                  >
                    {selectedItem
                      ? item.availableCapacity - selectedItem.storage
                      : item.availableCapacity}
                  </div>
                );
              })}
            {/* {mockUserData.map((item) => {
              const selectedItem = storeageDetails.find(
                (s) => s.locationId === item._id
              );
              const isDisabled = remainingSpace === 0 && !selectedItem;

              return (
                <div
                  key={item._id}
                  className={`p-6 border rounded-lg cursor-pointer text-center text-white text-xl font-semibold transition
              ${
                selectedItem
                  ? "bg-blue-800 shadow-lg scale-105"
                  : "bg-blue-500 hover:bg-blue-600"
              }
              ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
            `}
                  onClick={() =>
                    !isDisabled &&
                    handleStorageSelection(item._id, item.availableCapacity)
                  }
                >
                  {selectedItem
                    ? item.availableCapacity - selectedItem.storage
                    : item.availableCapacity}
                </div>
              );
            })} */}
          </div>
          <div className=" flex justify-center">
            {remainingSpace === 0 ? (
              <button
                onClick={createPlantLocationsBlock}
                className="inline-flex flex-row  justify-start  px-6 py-4 mt-10 !text-white  gap-x-2 text-center rounded-lg bg-primary  hover:bg-focus focus:bg-focus active:bg-focus/90 dark:bg-accent dark:hover:bg-focus dark:focus:bg-focus dark:active:bg-accent/90"
              >
                Continue <GrLinkNext className="mt-1" />
              </button>
            ) : (
              <button
                disabled
                className=" cursor-not-allowed justify-start   text-sm  px-4 py-4 mt-10 !text-white  gap-x-2 text-center rounded-lg bg-primary  hover:bg-focus focus:bg-focus active:bg-focus/90 dark:bg-accent dark:hover:bg-focus dark:focus:bg-focus dark:active:bg-accent/90"
              >
                Select to proceed
              </button>
            )}
          </div>
          {/* <pre className="mt-5 p-3 bg-gray-100 text-gray-800 rounded">
            {JSON.stringify(finalData, null, 2)}
          </pre> */}
        </div>
      )}
      {step === 2 && (
        <div className="flex flex-col items-center p-5">
          <h1 className="text-3xl font-bold text-green-600">
            ✔️ Process Completed!
          </h1>
          <p className="text-lg mt-4 text-gray-700">
            Your items have been successfully selected and stored.
          </p>
        </div>
      )}
    </div>
  );
};

export default Request;

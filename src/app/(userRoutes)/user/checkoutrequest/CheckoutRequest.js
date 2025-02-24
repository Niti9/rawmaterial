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
import { mockUserData, UserCheckoutForm, UserForm } from "../../constant";
import { PrintLogs } from "@/app/_utils/constant";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoArrowForwardSharp } from "react-icons/io5";
const CheckoutRequest = () => {
  const createCheckoutRequest = async (payload) => {
    console.log("payload is ", payload);
    const CheckOutStatus = "Pending";
    const newData = { ...payload, CheckOutStatus };

    try {
      const response = await ApiFetcher("createCheckOut", newData, {});
      console.log("response is", response);
      if (response?.code === 0) {
        toast.success(response.message);
        window.location.href = "/homepage";
      } else {
        toast.error(`No available locations found.${response.message}`);
        return;
      }
    } catch (error) {
      PrintLogs(error);
    }
  };

  const setFormData = () => {};
  return (
    <div>
      <div className="text-4xl text-black dark:text-gray-500 font-bold">
        Items Checkout
      </div>
      <div className="pt-4 h-full  px-2">
        <Form
          onSubmitForm={createCheckoutRequest}
          actions={
            <div className="flex  my-6 justify-center">
              <CustomButton
                label={"Submit Details"}
                className={`!text-white my-1 justify-between bg-primary mt-2 hover:bg-focus focus:bg-focus active:bg-focus/90 dark:bg-accent dark:hover:bg-focus dark:focus:bg-focus dark:active:bg-accent/90`}
              />
            </div>
          }
          setResetForm={() => setFormData({})}
          resetForm={true}
          inputFieldCss={` text-[#64748b] dark:text-[#a3adc2] `}
          subClassName={` `}
          subClassName2={`border-slate-300 bg-transparent px-3 pb-2
                        mt-4
                        placeholder:font-normal
                        focus:outline-none
                        `}
          formLayout={UserCheckoutForm.CheckoutMapping}
        />
      </div>
    </div>
  );
};

export default CheckoutRequest;

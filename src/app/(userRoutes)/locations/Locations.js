"use client";
import { CustomButton } from "@/app/_components/Forms/CustomButton";
import Form from "@/app/_components/Forms/Form";
import Modal from "@/app/_components/Overlays/Modal";
import React, { useState } from "react";
import {
  LocationForm,
  dummyLocations,
  dummyClients,
  dummyPlants,
  updateLocationForm
} from "../constant";
import PageTitle from "@/app/_components/PageTitle";
import toast from "react-hot-toast";
import { PrintLogs } from "@/app/_utils/constant";
import { ApiFetcher } from "@/app/_customHooks/useButtonClickFetcher";
import useApiFetcher from "@/app/_customHooks/useApiFetcher";
import { useClients, useLocations, usePlants } from "../getApiResponse";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Locations = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refetch, setFetch] = useState(false);
  const [search, setSearch] = useState("");
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(null);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(null);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Show 8 clients at a time
  const {
    allLocations,
    loading: loader,
    error: err,
    refetch: locationsRefetch
  } = useLocations();
  const {
    allPlants,
    loading: plantLoading,
    error: plantErr,
    refetch: plantsRefetch
  } = usePlants();

  const { allClients, loading, error, refetch: clientsRefetch } = useClients();

  const filteredData = allLocations
    .map((location) => {
      const client = allClients.find((c) => c._id === location.clientId);
      const plant = allPlants.find((p) => p._id === location.plantId);
      return {
        ...location,
        clientName: client?.clientName,
        plantName: plant?.plantName
      };
    })
    .filter((location) =>
      location.locationName.toLowerCase().includes(search.toLowerCase())
    );

  // Calculate total pages based on filtered results
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Get paginated clients for the current page
  const paginatedLocations = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Next page
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  // Previous page
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const createNewLocation = async (payload) => {
    console.log("payload is ", payload);
    try {
      const response = await ApiFetcher("createLocation", payload);
      if (response?.statusCode === 400) {
        PrintLogs("error is post request");
        return;
      }
      if (response?.code === 0) {
        toast.success(response?.message);
        locationsRefetch();
        setIsModalOpen(!isModalOpen);
        return;
      } else {
        toast.error(response.message);
        return;
      }
    } catch (error) {
      PrintLogs(error);
    }
  };

  const deleteLocation = async (id) => {
    try {
      const response = await ApiFetcher("deleteLocation", {}, id);
      if (response?.statusCode === 400) {
        PrintLogs("error is post request");
        return;
      }
      if (response?.code === 0) {
        toast.success(response?.message);
        locationsRefetch();
        return;
      } else {
        toast.error(response.message);
        return;
      }
    } catch (error) {
      PrintLogs(error);
    }
  };
  return (
    <div>
      <PageTitle
        mainTitle={"Admin"}
        subTitle={"Client"}
        pageTitle={"Locations"}
      />
      <div className="card">
        <div className="flex flex-wrap justify-between items-center gap-2 p-6">
          <div className="relative sm:flex-1  ">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <input
              type="text"
              name="table-search"
              id="table-search"
              className="form-input ps-11 border rounded p-2 w-full"
              placeholder="Search for clients"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
              <svg
                className="h-3.5 w-3.5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="btn bg-success/25 text-sm font-medium  text-success hover:text-white hover:bg-success"
          >
            <i className="mgc_add_circle_line me-3"></i>
            Add Locations
          </button>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="border divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-slate-300 bg-opacity-20  dark:bg-slate-800 divide-gray-300 dark:border-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 ps-4 pe-3 text-center text-sm font-semibold text-gray-900 dark:text-gray-200"
                      >
                        Index
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 ps-4 pe-3 text-center text-sm font-semibold text-gray-900 dark:text-gray-200"
                      >
                        Location Name
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 ps-4 pe-3 text-center text-sm font-semibold text-gray-900 dark:text-gray-200"
                      >
                        Total Capacity
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 ps-4 pe-3 text-center text-sm font-semibold text-gray-900 dark:text-gray-200"
                      >
                        Available Capacity
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 ps-4 pe-3 text-center text-sm font-semibold text-gray-900 dark:text-gray-200"
                      >
                        Client Name
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 ps-4 pe-3 text-center text-sm font-semibold text-gray-900 dark:text-gray-200"
                      >
                        Plant Name
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 ps-4 pe-3 text-center text-sm font-semibold text-gray-900 dark:text-gray-200"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {loader ? (
                      <tr>
                        <td colSpan="4" className="text-center py-4">
                          Loading Plants...
                        </td>
                      </tr>
                    ) : err ? (
                      <tr>
                        <td
                          colSpan="4"
                          className="text-center py-4 text-red-500"
                        >
                          {error}
                        </td>
                      </tr>
                    ) : paginatedLocations.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center py-4">
                          No Plants found
                        </td>
                      </tr>
                    ) : (
                      paginatedLocations.map((location, index) => (
                        <tr
                          key={location._id}
                          className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                          onClick={() =>
                            router.push(`locations/${location._id}`)
                          }
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium ">
                            {(currentPage - 1) * itemsPerPage + index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium ">
                            {location.locationName === "Location 52"
                              ? "Location 520"
                              : location.locationName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center ">
                            {location.totalCapacity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center ">
                            {location.availableCapacity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center ">
                            {location.clientName || "Not Found"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center ">
                            {location.plantName}
                          </td>
                          <td
                            className="whitespace-nowrap py-4 px-3 text-center text-sm font-medium"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              className="me-0.5"
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsModalOpenEdit(location);
                              }}
                            >
                              <i className="mgc_edit_line text-lg"></i>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsModalOpenDelete(location);

                                // deleteLocation(location._id);
                              }}
                              className="ms-0.5"
                            >
                              <i className="mgc_delete_line text-xl"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                    {/* {filteredData &&
                      filteredData.map((location, index) => (
                        <tr
                          key={location._id}
                          className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                          onClick={() =>
                            router.push(`locations/${location._id}`)
                          }
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-800 dark:text-gray-200">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-800 dark:text-gray-200">
                            {location.locationName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-800 dark:text-gray-200">
                            {location.totalCapacity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-800 dark:text-gray-200">
                            {location.availableCapacity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-800 dark:text-gray-200">
                            {location.clientName || "Not Found"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-800 dark:text-gray-200">
                            {location.plantName}
                          </td>
                          <td className="whitespace-nowrap py-4 px-3 text-center text-sm font-medium">
                            <button className="me-0.5">
                              <i className="mgc_edit_line text-lg"></i>
                            </button>
                            <button
                              onClick={() => deleteLocation(location._id)}
                              className="ms-0.5"
                            >
                              <i className="mgc_delete_line text-xl"></i>
                            </button>
                          </td>
                        </tr>
                      ))} */}
                  </tbody>
                </table>
              </div>
              {totalPages > 1 && (
                <div className="flex justify-between items-center p-4">
                  <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className={`btn ${
                      currentPage === 1
                        ? `bg-transparent`
                        : `bg-blue-600 text-white`
                    } px-4 py-2`}
                  >
                    Previous
                  </button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={`btn ${
                      currentPage === totalPages
                        ? `bg-transparent`
                        : `bg-blue-600 text-white`
                    } px-4 py-2`}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsModalOpen(!isModalOpen)}
          title={LocationForm.heading}
          containerClassName="text-base
            w-[50%] h-[90%] max-h-[80vh]
            bg-red-50 dark:bg-[#1e293b]
            font-medium text-slate-700 dark:text-white "
        >
          <div className="pt-4 h-full overflow-y-scroll is-scrollbar-hidden px-2">
            <Form
              onSubmitForm={createNewLocation}
              actions={
                <div className="flex justify-center mt-3 ">
                  <CustomButton
                    label={"Submit"}
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
              formLayout={LocationForm.LocationFromMapping}
            />
          </div>
        </Modal>
      )}

      <Modal
        isOpen={isModalOpenEdit}
        onClose={() => setIsModalOpenEdit(!isModalOpenEdit)}
        title={updateLocationForm.heading}
        containerClassName="text-base
            w-[70%] md:w-[50%] h-[80%] max-h-[80vh]
            bg-red-50 dark:bg-[#1e293b]
            font-medium text-slate-700 dark:text-white "
      >
        <div className="pt-4 h-full overflow-y-scroll is-scrollbar-hidden px-2">
          {/* <div className="pt-4"> */}
          <Form
            defaultData={isModalOpenEdit}
            onSubmitForm={""}
            actions={
              <div className="flex justify-center mt-4 ">
                <CustomButton
                  label={"Submit"}
                  className={`!text-white my-1 justify-between bg-primary mt-2 hover:bg-focus focus:bg-focus active:bg-focus/90 dark:bg-accent dark:hover:bg-focus dark:focus:bg-focus dark:active:bg-accent/90`}
                />
              </div>
            }
            setResetForm={() => setFormData({})}
            inputFieldCss={` text-[#64748b] dark:text-[#a3adc2] `}
            subClassName={` `}
            subClassName2={`border-slate-300 bg-transparent px-3 pb-2
                  mt-1
                  placeholder:font-normal
                  focus:outline-none
                  `}
            formLayout={updateLocationForm.LocationFromMapping}
          />
        </div>
      </Modal>

      <Modal
        isOpen={isModalOpenDelete}
        onClose={() => setIsModalOpenDelete(!isModalOpenDelete)}
        title={"Delete Location"}
        containerClassName="text-base
            w-[60%] xl:w-[40%] h-[50%] lg:h-[30%] max-h-[70vh]
            bg-red-50 dark:bg-[#1e293b]
            font-medium text-slate-700 dark:text-white "
      >
        <div className="mt-4">
          <p className="text-sm md:text-base mb-6">
            Are you sure you want to delete{" "}
            <span className="font-bold">{isModalOpenDelete?.locationName}</span>
            ?
          </p>
          <div className="flex flex-col mx-4 sm:flex-row  space-x-0 sm:space-x-4 space-y-4 sm:space-y-0">
            <button
              className="btn text-xs sm:text-base bg-gray-300 hover:bg-gray-400 text-gray-700"
              onClick={() => {
                setIsModalOpenDelete(!isModalOpenDelete);
              }}
            >
              Cancel
            </button>
            <button
              className="btn text-xs sm:text-base bg-red-500 hover:bg-red-600 text-white"
              onClick={() => deletePlant(isModalOpenDelete?._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Locations;

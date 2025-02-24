"use client";
import { CustomButton } from "@/app/_components/Forms/CustomButton";
import Form from "@/app/_components/Forms/Form";
import Modal from "@/app/_components/Overlays/Modal";
import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import PageTitle from "@/app/_components/PageTitle";
import toast from "react-hot-toast";
import { PrintLogs } from "@/app/_utils/constant";
import { ApiFetcher } from "@/app/_customHooks/useButtonClickFetcher";
import { BsFillBucketFill } from "react-icons/bs";
import { MdLocalGroceryStore } from "react-icons/md";
import { MdOutlineGridView } from "react-icons/md";
import {
  ClientForm,
  dummyClients,
  ItemTypeForm,
  updateItemType
} from "../constant";
import useApiFetcher from "@/app/_customHooks/useApiFetcher";
import { getAllItemType } from "../getApiResponse";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdStorage } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdOutlineViewList } from "react-icons/md";
const ItemType = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState({
    type: "",
    state: false
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Show 8 clients at a time

  const [selectedItemData, setSelectedItemData] = useState({});
  const [isGridView, setIsGridView] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Toggle dropdown for a specific item
  const toggleDropdown = (itemId) => {
    setIsDropdownOpen((prev) => (prev === itemId ? null : itemId));
    // setIsDropdownOpen((prev) => (prev === itemId ? null : itemId));
  };
  const {
    allItemType,
    loading,
    error,
    refetch: itemTypeRefetch
  } = getAllItemType();

  console.log("allitemtype are", allItemType);

  const filteredItems =
    allItemType.filter((item) =>
      item.itemTypeName.toLowerCase().includes(search.toLowerCase())
    ) || [];

  const handleSubmit = async (formData) => {
    const response = await ApiFetcher("createItemType", formData, {});
    try {
      if (response.code === 0) {
        toast.success(response.message);
        closeModal();
        setIsDropdownOpen(!isDropdownOpen);
        itemTypeRefetch();

        return;
      } else {
        toast.error(response.message);
        return;
      }
    } catch (error) {
      console.error("Error Adding item :", error);
    }
  };

  const handleEdit = async (formData) => {
    const { createdAt, updatedAt, _id, ...filteredData } = formData;
    console.log("filtered data is ", filteredData);
    try {
      const response = await ApiFetcher("updateItemType", filteredData, _id);
      if (response?.code === 0) {
        console.log("response is ", response);
        toast.success(response.message);
        setIsDropdownOpen(!isDropdownOpen);
        itemTypeRefetch();
        closeModal();
      } else {
        toast.error(response.message);
        console.error("Failed to update task status:", response?.message);
      }
    } catch (error) {
      console.error("Error in Update item :", error);
    }
  };

  // Function to open a specific modal
  const openModal = (modalType) => {
    setIsModalOpen({ type: modalType, state: true });
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen({ type: "", state: false });
  };

  const confirmDelete = async () => {
    const response = await ApiFetcher(
      "deleteItemType",
      {},
      selectedItemData._id
    );
    if (response.code === 0) {
      toast.success(response.message);
      setIsDropdownOpen(!isDropdownOpen);
      itemTypeRefetch();
      closeModal();
      return;
    } else {
      toast.error(response.message);
      return;
    }
  };

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Get paginated clients for the current page
  const paginatedItems = filteredItems.slice(
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

  const formattedDate = (value) => {
    const date = new Date(value).toLocaleDateString("en-US", {
      month: "short", // "Feb"
      day: "2-digit", // "21"
      year: "numeric" // "2025"
    });

    return date;
  };
  return (
    <div className="card">
      <div className="w-full">
        <div className="flex flex-wrap justify-between items-center gap-2 pt-6 px-6 mb-6">
          <div className="relative sm:flex-1  ">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <input
              type="text"
              name="table-search"
              id="table-search"
              className="form-input ps-11 border rounded p-2 w-full"
              placeholder="Search for Items"
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
            onClick={() => openModal("Create")}
            className="btn bg-success/25 text-sm font-medium  text-success hover:text-white hover:bg-success"
          >
            <i className="mgc_add_circle_line me-3"></i>
            Add Items
          </button>
          <div className="  ">
            {!isGridView ? (
              <MdOutlineGridView
                className="text-5xl"
                onClick={() => setIsGridView(!isGridView)}
              />
            ) : (
              <MdOutlineViewList
                className="text-5xl "
                onClick={() => setIsGridView(!isGridView)}
              />
            )}
          </div>
        </div>

        {!isGridView ? (
          <div className="grid 2xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6  px-6 pb-6">
            {filteredItems.map((item, index) => (
              <div
                key={item._id}
                className="card hover:dark:bg-blue-900/40 hover:bg-success/10 dark:bg-slate-700"
              >
                <div className="px-5 pb-2 ">
                  <div className="space-y-4 text-gray-600 dark:text-gray-300">
                    <div className="flex items-start relative my-4">
                      <div className="flex gap-3">
                        <div className="h-14 w-14">
                          <span className="flex items-center  ">
                            <MdLocalGroceryStore className="text-5xl  fill-warning text-warning" />
                          </span>
                        </div>
                        <div className="space-y-1">
                          <p className="font-semibold text-base pr-1 max-h-32">
                            {item.itemTypeName === "Chromebook"
                              ? "Chromebhook updated Name"
                              : item.itemTypeName}
                            {/* {item.itemTypeName} */}
                          </p>

                          <p className="text-sm">
                            {item.itemTypeDescription
                              ? item.itemTypeDescription
                              : "No Record"}
                          </p>
                        </div>
                      </div>

                      <div className=" flex absolute  top-0 -end-2 ">
                        <BsThreeDotsVertical
                          onClick={() => {
                            setIsDropdownOpen(!isDropdownOpen);
                            setSelectedItemData(item);
                          }}
                          className="  text-xl cursor-pointer"
                        />
                        {isDropdownOpen &&
                          selectedItemData._id === item._id && (
                            <div className="absolute right-1  w-40  top-5 mt-2 transition-all duration-300 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg p-2">
                              <div
                                onClick={() => {
                                  openModal("Edit");
                                }}
                                className="flex cursor-pointer items-center py-2 px-4 text-sm rounded text-gray-500  hover:bg-slate-100 hover:text-slate-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                              >
                                <CiEdit className="text-lg mr-2" /> Edit
                              </div>
                              <div
                                onClick={() => {
                                  openModal("Delete");
                                }}
                                className="flex cursor-pointer items-center py-2 px-4 text-sm rounded text-gray-500  hover:bg-slate-100 hover:text-slate-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                              >
                                <MdDeleteOutline className="text-lg mr-2" />{" "}
                                Delete
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm">Date</p>
                      <span className="p-0.5 bg-gray-600 rounded-full"></span>
                      <p className="text-sm">
                        {item.createdAt
                          ? formattedDate(item.createdAt)
                          : "No Record"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="relative overflow-x-auto">
              <table className="w-full divide-y divide-gray-300 dark:divide-gray-700">
                <thead className="bg-slate-300 bg-opacity-20 border-t dark:bg-slate-800 divide-gray-300 dark:border-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 ps-4 pe-3 text-center text-sm font-semibold text-gray-900 dark:text-gray-200"
                    >
                      Index
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 dark:text-gray-200"
                    >
                      Item Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 dark:text-gray-200"
                    >
                      Item Description
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold  text-gray-900 dark:text-gray-200"
                    >
                      Created Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 dark:text-gray-200"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 ">
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        Loading clients...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-red-500">
                        {error}
                      </td>
                    </tr>
                  ) : paginatedItems.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        No clients found
                      </td>
                    </tr>
                  ) : (
                    paginatedItems.map((item, index) => (
                      <tr
                        key={item._id}
                        className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        <td className="py-4 text-center">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className="py-4 text-center">
                          {item.itemTypeName === "Chromebook"
                            ? "Chromebhook updated Name"
                            : item.itemTypeName}
                          {/* {item.itemTypeName} */}
                        </td>
                        <td className="py-4 text-center">
                          {item.itemTypeDescription
                            ? item.itemTypeDescription
                            : "No Record"}
                        </td>
                        <td className="py-4 text-center">
                          {" "}
                          {item.createdAt
                            ? formattedDate(item.createdAt)
                            : "No Record"}
                        </td>
                        <td className="py-4 text-center">
                          <button
                            className="me-2"
                            onClick={() => {
                              setSelectedItemData(item);
                              openModal("Edit");
                            }}
                          >
                            <i className="mgc_edit_line text-lg"></i>
                          </button>
                          <button
                            onClick={() => {
                              setSelectedItemData(item);
                              openModal("Delete");
                            }}
                          >
                            <i className="mgc_delete_line text-xl"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <Modal
          isOpen={isModalOpen.state}
          onClose={() => {
            closeModal();
            isModalOpen.type === "Create"
              ? ""
              : setIsDropdownOpen(!isDropdownOpen);
          }}
          title={
            isModalOpen.type === "Edit"
              ? "Edit Item Details"
              : isModalOpen.type === "Create"
              ? "Add Item Details"
              : "Delete Item"
          }
          containerClassName={`text-base
             ${
               isModalOpen.type === "Delete"
                 ? " lg:w-[30%] w-[50%] h-[30%]"
                 : " w-[50%] h-[50%]"
             }max-h-[70vh]     bg-slate-50 dark:bg-navy-750
            font-medium text-slate-700 dark:text-navy-100 `}
        >
          {isModalOpen.type === "Edit" && (
            <div className="mt-4">
              <Form
                defaultData={selectedItemData}
                formLayout={updateItemType.DataFromMapping}
                actions={
                  <div className=" flex justify-center pt-4   ">
                    <CustomButton
                      label={"Update"}
                      className={`!text-white   bg-primary py-3 mx-2 mb-8 mt-2 hover:bg-focus focus:bg-focus active:bg-focus/90 dark:bg-accent dark:hover:bg-focus dark:focus:bg-focus dark:active:bg-accent/90`}
                    />
                  </div>
                }
                inputFieldCss={` text-[#64748b] dark:text-[#a3adc2] `}
                subClassName={` `}
                subClassName2={`border-slate-300 bg-transparent px-3 pb-2
                  mt-1
                  placeholder:font-normal
                  focus:outline-none
                  `}
                onSubmitForm={handleEdit}
              />
            </div>
          )}
          {isModalOpen.type === "Create" && (
            <div className="mt-4">
              <Form
                formLayout={ItemTypeForm.ItemFormMapping}
                actions={
                  <div className=" flex justify-center pt-4   ">
                    <CustomButton
                      label={"Submit"}
                      className={`!text-white   bg-primary py-3 mx-2 mb-8 mt-2 hover:bg-focus focus:bg-focus active:bg-focus/90 dark:bg-accent dark:hover:bg-focus dark:focus:bg-focus dark:active:bg-accent/90`}
                    />
                  </div>
                }
                inputFieldCss={` text-[#64748b] dark:text-[#a3adc2] `}
                subClassName={` `}
                subClassName2={`border-slate-300 bg-transparent px-3 pb-2
                        mt-1
                        placeholder:font-normal
                        focus:outline-none
                        `}
                onSubmitForm={handleSubmit}
              />
            </div>
          )}
          {isModalOpen.type === "Delete" && (
            <div className="mt-4">
              <p className="text-sm md:text-base mb-6">
                Are you sure you want to delete{" "}
                <span className="font-bold">
                  {selectedItemData?.itemTypeName}
                </span>
                ?
              </p>
              <div className="flex flex-col mx-4 sm:flex-row  space-x-0 sm:space-x-4 space-y-4 sm:space-y-0">
                <button
                  className="btn text-xs sm:text-base bg-gray-300 hover:bg-gray-400 text-gray-700"
                  onClick={() => {
                    closeModal();
                    setIsDropdownOpen(!isDropdownOpen);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="btn text-xs sm:text-base bg-red-500 hover:bg-red-600 text-white"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default ItemType;

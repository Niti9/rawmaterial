"use client";
import React, { useState } from "react";
import PageTitle from "../../_components/PageTitle";
import { dummyRequests } from "../constant";
import { BsBuildingsFill } from "react-icons/bs";
import {
  getAllItemType,
  getAllPendingItems,
  usePlants
} from "../getApiResponse";
import { useRouter } from "next/navigation";
import { BsFillClipboard2DataFill } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ApiFetcher } from "../../_customHooks/useButtonClickFetcher";
import toast from "react-hot-toast";
import Form from "../../_components/Forms/Form";
import Modal from "../../_components/Overlays/Modal";
import { formatDate } from "@/app/_utils/constant";
const HomePage = () => {
  const router = useRouter();
  // Track selected status for each item (only for UI)
  const [selectedStatus, setSelectedStatus] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState({
    item: {},
    type: "",
    state: false
  });

  const {
    allPlants,
    loading: loader,
    error: err,
    refetch: plantsRefetch
  } = usePlants();
  const {
    allPendingItems,
    loading: itemsLoader,
    error: itemsErr,
    refetch: itemsRefetch
  } = getAllPendingItems();
  console.log("getAllPendingItems", allPendingItems);
  const {
    allItemType,
    loading,
    error,
    refetch: itemTypeRefetch
  } = getAllItemType();

  const getItemName = (itemTypeId) => {
    if (!allItemType) return "Loading..."; // Prevent function from breaking
    const itemType = allItemType.find((c) => c._id === itemTypeId);
    return itemType ? itemType.itemTypeName : "Not Found";
  };

  const getItemDetails = (itemTypeId) => {
    if (!allItemType) return null; // Prevents errors if data isn't loaded yet
    return allItemType.find((c) => c._id === itemTypeId) || null;
  };

  // const filteredItems =
  //   allItemType.filter((item) =>
  //     item.itemTypeName.toLowerCase().includes(search.toLowerCase())
  //   ) || [];

  const getPlantName = (plantId) => {
    if (!allPlants) return "Loading..."; // Prevent function from breaking
    const plant = allPlants.find((c) => c._id === plantId);
    return plant ? plant.plantName : "Not Found";
  };

  const updateLocationStatus = async (item, type) => {
    const payload = { itemId: item._id, type };
    console.log("item.plantId is", item.plantId);

    try {
      const response = await ApiFetcher("updateLocationStatus", payload, {});

      if (response?.code === 0) {
        toast.success(response?.message);
        itemsRefetch();
        return;
      } else {
        toast.error(response.message);
        return;
      }
    } catch (error) {
      toast.error("Item not update", error);
    }
  };

  return (
    <section>
      {/* <PageTitle mainTitle={"Admin"} pageTitle={"Dashboard"} subTitle={""} /> */}
      <h1 className="text-2xl font-bold my-2 mb-4 text-black dark:text-white">
        Dashboard{" "}
      </h1>

      <div className="grid md:grid-cols-2  xl:grid-cols-3 gap-6 ">
        {/* {dummyRequests.data.map((item, index) => { */}
        {allPendingItems.map((item, index) => {
          const itemDetails = getItemDetails(item.itemTypeId); // Now item is available
          return (
            <div
              className="card bg-transparent  hover:-translate-y-1 transition delay-100 h-40"
              key={item._id}
            >
              <div
                className={`rounded-lg shadow-lg text-white text-sm font-medium  relative  
                  ${
                    item.CheckOutStatus
                      ? " dark:bg-red-700/50  bg-red-700 "
                      : "border  border-green-950/25  dark:bg-success/10  bg-green-700 "
                  }  `}
              >
                <div className="card-header ">
                  <div className="flex justify-between items-center">
                    <h5 className="card-title text-white ">
                      User Requirements
                    </h5>
                    <p>{formatDate(item.createdAt)}</p>
                    {/* <p>{item.createdAt}</p> */}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="py-3 px-6">
                    <h5 className="my-2">
                      <p className="text-slate-200 dark:text-slate-200">
                        {itemDetails ? itemDetails.itemTypeName : "Loading..."}
                      </p>
                    </h5>
                    <div className="flex">
                      <p className=" dark:text-white text-sm mb-5 flex-1 text-gray-300">
                        {/* {itemDetails.itemTypeDescription
                            ? itemDetails.itemTypeDescription
                            : "No Description "} */}
                        {itemDetails
                          ? itemDetails.itemTypeDescription
                          : "Not Found"}
                      </p>
                      <p className="text-base inline-flex gap-x-1">
                        <BsFillClipboard2DataFill className="mt-1" />
                        <span className="align-text-bottom">
                          {item.totalSize}
                        </span>
                      </p>
                    </div>

                    <div className="flex ">
                      {/* <div className="flex-1 mt-2">
                        <p className="text-sm inline-flex">
                          <BsBuildingsFill className="mgc_comment_line text-lg me-2" />
                          <span className="align-text-bottom">
                            {getPlantName(item.plantId)}
                          </span>
                        </p>
                      </div> */}

                      <a href="/">
                        <img
                          className="inline-block h-8 w-8 rounded-full border-2 border-white dark:border-gray-600"
                          src="/images/users/avatar-3.jpg"
                          alt="Image Description"
                        />
                      </a>
                    </div>
                  </div>

                  <div className="border-t  border-gray-300  rounded-b-lg dark:border-gray-600">
                    <div className="flex justify-between ">
                      <button
                        onClick={() => {
                          setIsModalOpen({
                            item: item,
                            type: "Accepted",
                            state: true
                          });
                        }}
                        className="block w-full py-5 border-r rounded-l-lg border-gray-500 font-medium text-sm text-green-200 hover:bg-success/20 hover:text-white  dark:text-green-400"
                      >
                        Accepted
                      </button>
                      <button
                        onClick={() => {
                          setIsModalOpen({
                            item: item,
                            type: "Rejected",
                            state: true
                          });
                        }}
                        className="block w-full py-5 rounded-r-lg font-medium text-sm text-red-200 dark:text-red-400 hover:bg-success/20 hover:text-white "
                      >
                        Rejected
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {isModalOpen.state && (
        <Modal
          isOpen={true}
          onClose={() => {
            setIsModalOpen(!isModalOpen);
          }}
          title={"Change Status"}
          containerClassName="text-base
           w-[60%] xl:w-[40%] h-[50%] lg:h-[30%] max-h-[70vh]
            bg-slate-50 dark:bg-navy-750
            font-medium text-slate-700 dark:text-navy-100 "
        >
          <div className="mt-4">
            <p className="text-sm md:text-base mb-6">
              Are you sure you want to change the request status{" "}
              <span className="font-bold">
                {getItemName(isModalOpen?.item.itemTypeId)}
              </span>
              ?
            </p>
            <div className="flex flex-col mx-4 sm:flex-row  space-x-0 sm:space-x-4 space-y-4 sm:space-y-0">
              <button
                className="btn text-xs sm:text-base bg-gray-300 hover:bg-gray-400 text-gray-700"
                onClick={() => {
                  setIsModalOpen({ type: "", state: false });
                }}
              >
                Cancel
              </button>

              {isModalOpen.item.CheckOutStatus === "Pending" ? (
                <button
                  className={`btn text-xs sm:text-base ${
                    isModalOpen.type === "Accepted"
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-red-500 hover:bg-red-600"
                  } text-white`}
                  onClick={() => {
                    if (isModalOpen.type === "Accepted") {
                      router.push(`/homepage/1`); // Executes immediately
                    } else {
                      setIsModalOpen({ type: "", state: false, item: "" });
                    }
                  }}
                >
                  {isModalOpen.type === "Accepted" ? (
                    <p>Accept</p>
                  ) : (
                    <p>Reject</p>
                  )}
                </button>
              ) : (
                <button
                  className={`btn text-xs sm:text-base ${
                    isModalOpen.type === "Accepted"
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-red-500 hover:bg-red-600"
                  } text-white`}
                  onClick={() => {
                    isModalOpen.type === "Accepted"
                      ? updateLocationStatus(isModalOpen.item, "ACCEPTED")
                      : updateLocationStatus(isModalOpen.item, "REJECT");
                  }}
                >
                  {isModalOpen.type === "Accepted" ? (
                    <p>Accept</p>
                  ) : (
                    <p>Reject</p>
                  )}
                </button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default HomePage;

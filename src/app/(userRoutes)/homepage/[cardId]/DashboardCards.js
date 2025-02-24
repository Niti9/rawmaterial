"use client";
import React, { useState } from "react";
import { getAllItemType } from "../../getApiResponse";
import { RiColorFilterAiFill } from "react-icons/ri";
import Modal from "@/app/_components/Overlays/Modal";
import { FaCheckCircle } from "react-icons/fa";
import useApiFetcher from "@/app/_customHooks/useApiFetcher";
const dummyData = [
  {
    id: "1",
    locationName: "Location 1",
    checkOutCount: 0,
    itemDetails: [
      {
        _id: "a",
        size: 150,
        status: "Fulfilled",
        requestedId: "1234",
        itemId: "67b74c1d6310845abc601936"
      },
      {
        _id: "b",
        size: 210,
        status: "Fulfilled",
        requestedId: "12345",
        itemId: "67b74cc894ad9b2ec0b1aeb9"
      }
    ]
  },
  {
    id: "2",
    locationName: "Location 2",
    checkOutCount: 0,
    itemDetails: [
      {
        _id: "k",
        size: 100,
        status: "Fulfilled",
        requestedId: "12346",
        itemId: "67b74cc894ad9b2ec0b1aeb9"
      },
      {
        _id: "j",
        size: 120,
        status: "Fulfilled",
        requestedId: "12347",
        itemId: "67b74c1d6310845abc601936"
      }
    ]
  },
  {
    id: "3",
    locationName: "Location 3",
    checkOutCount: 0,
    itemDetails: [
      {
        _id: "i",
        size: 100,
        status: "Fulfilled",
        requestedId: "12346",
        itemId: "67b74cc894ad9b2ec0b1aeb9"
      },
      {
        _id: "h",
        size: 120,
        status: "Fulfilled",
        requestedId: "12347",
        itemId: "43217"
      }
    ]
  },
  {
    id: "4",
    locationName: "Location 4",
    checkOutCount: 0,
    itemDetails: [
      {
        _id: "g",
        size: 100,
        status: "Fulfilled",
        requestedId: "12346",
        itemId: "67b74cc894ad9b2ec0b1aeb9"
      },
      {
        _id: "f",
        size: 120,
        status: "Fulfilled",
        requestedId: "12347",
        itemId: "43217ddjldk"
      },
      {
        _id: "z",
        size: 20,
        status: "Fulfilled",
        requestedId: "12347",
        itemId: "43217ddjldk"
      },
      {
        _id: "x",
        size: 5,
        status: "Fulfilled",
        requestedId: "12347",
        itemId: "43217ddjldk"
      }
    ]
  }
];

const DashboardCards = ({ cardId }) => {
  const [locations, setLocations] = useState(dummyData);
  const [remainingAmount, setRemainingAmount] = useState(40);
  // const [remainingAmount, setRemainingAmount] = useState(170);
  const [selectedItems, setSelectedItems] = useState({}); // Track selected sizes by `_id`
  const [selectedLocations, setSelectedLocations] = useState([]); // Store only selected locations
  const [isItemRelease, setIsItemRelease] = useState(false);

  const { data } = useApiFetcher(
    "getRequestedItemsWithLocation",
    {},
    "67b74c1d6310845abc601936"
  );

  console.log("getRequested items with locations are:-", data);
  const {
    allItemType,
    loading,
    error,
    refetch: itemTypeRefetch
  } = getAllItemType();

  const getItemName = (itemId) => {
    if (!allItemType) return "Loading..."; // Prevent function from breaking
    const item = allItemType.find((c) => c._id === itemId);
    return item ? item.itemTypeName : "Not Found";
  };

  const handleSelectItem = (locationId, itemId) => {
    let amountChange = 0;

    const updatedLocations = locations.map((location) => {
      if (location.id === locationId) {
        let newCheckOutCount = location.checkOutCount;

        const updatedItems = location.itemDetails.map((item) => {
          if (item._id === itemId) {
            if (selectedItems[itemId]) {
              // 🛑 Undo Selection: Restore size
              amountChange = selectedItems[itemId];
              newCheckOutCount -= selectedItems[itemId];

              const updatedSelections = { ...selectedItems };
              delete updatedSelections[itemId];

              setSelectedItems(updatedSelections);
              return {
                ...item,
                size: item.size + amountChange,
                status: item.size + amountChange > 0 ? "Fulfilled" : "Empty"
              };
            } else if (remainingAmount > 0) {
              // ✅ Select Item: Deduct from size
              const deduct = Math.min(item.size, remainingAmount);
              amountChange = -deduct;
              newCheckOutCount += deduct;

              setSelectedItems({ ...selectedItems, [itemId]: deduct });
              return {
                ...item,
                size: item.size - deduct,
                status: item.size - deduct === 0 ? "Empty" : "Fulfilled"
              };
            }
          }
          return item;
        });

        return {
          ...location,
          itemDetails: updatedItems,
          checkOutCount: newCheckOutCount
        };
      }
      return location;
    });

    setLocations(updatedLocations);
    setRemainingAmount((prev) => prev + amountChange);

    // ✅ Update selected locations state
    const filteredSelectedLocations = updatedLocations.filter((loc) =>
      loc.itemDetails.some(
        (item) =>
          selectedItems[item._id] || (item._id === itemId && amountChange < 0)
      )
    );

    setSelectedLocations(filteredSelectedLocations);

    // ✅ Console log updated selected locations
    console.log("Selected Locations Data:", filteredSelectedLocations);
  };

  // ✅ Function to determine card background color
  const getCardColor = (index) => {
    if (index === 0) return "bg-green-700"; // First card -> Green
    if (index === 1) return "bg-amber-600"; // Second card -> Orange
    return "bg-red-700"; // Remaining cards -> Red
  };
  return (
    <div>
      {/* {cardId} */}
      <div>
        <div className="flex flex-col p-6 ">
          <h1 className="text-2xl font-bold mb-6">Locations Item</h1>
          <div className="flex flex-wrap justify-between items-center pr-6">
            <p className="text-lg font-bold mb-2 ">
              Required Items Size:{" "}
              <span className="text-blue-600">{remainingAmount}</span>
            </p>
            {remainingAmount === 0 && (
              <button
                className="btn bg-success/25 text-sm font-medium  text-success hover:text-white hover:bg-success mb-5"
                // className="text-base text-start  bg-blue-800 hover:bg-blue-700 px-4 py-3 text-white rounded-lg font-semibold mb-2"
                onClick={() => setIsItemRelease(true)}
              >
                Confirm Release
                <FaCheckCircle className="text-xl ml-2 mb-1" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-12">
            {locations.map((location, index) => (
              <div
                key={location.id}
                className={` bg-blue-950 dark:bg-[#1F2937] shadow-lg rounded-2xl p-4 w-64  h-96 flex flex-col  hover:-translate-y-1 transition delay-150`}
              >
                <div className="overflow-y-auto overflow-x-hidden is-scrollbar-hidden p-2">
                  <div className="text-blue-500 text-3xl mb-2">
                    <RiColorFilterAiFill className="text-white" />
                  </div>
                  {/* <div className="text-blue-500 text-3xl mb-2">📍</div> */}
                  <h2 className="text-lg font-semibold text-white">
                    {location.locationName}
                  </h2>
                  {/* <p className="text-sm text-gray-600">
                  <strong>Checkout Count:</strong> {location.checkOutCount}
                </p> */}
                  <div className="w-full mt-3 border-t border-gray-300 pt-3  pb-8">
                    {location.itemDetails.length > 0 ? (
                      location.itemDetails.map((item, index) => (
                        <div
                          key={item._id}
                          className={`flex items-center gap-2 p-2 rounded-lg mb-2 w-full justify-between 
                           ${getCardColor(
                             index
                           )} hover:scale-y-110 transition-transform
                        `}
                          // className={`flex items-center gap-2 p-2 rounded-lg mb-2 w-full justify-between
                          // ${
                          //   item.size === 0 ? "bg-gray-300" : "bg-gray-200"
                          // } hover:scale-105 transition-transform`}
                        >
                          <div>
                            <p className="text-white font-bold text-sm">
                              {getItemName(item.itemId)}
                            </p>
                            <p className="text-sm text-slate-100">
                              Item Size Left: {item.size}{" "}
                              {/* {selectedItems[item._id] && (
                              <span className="text-green-600">
                                (Selected: {selectedItems[item._id]})
                              </span>
                            )} */}
                            </p>
                            {/* <p
                            className={`text-xs font-semibold ${
                              item.status === "Empty"
                                ? "text-red-500"
                                : "text-gray-500"
                            }`}
                          >
                            Status: {item.status}
                          </p> */}
                          </div>
                          <button
                            className={`p-1 rounded text-xs ${
                              remainingAmount === 0 && !selectedItems[item._id]
                                ? " bg-gray-400 text-white cursor-not-allowed "
                                : ` text-white ${
                                    selectedItems[item._id]
                                      ? "bg-red-500"
                                      : "bg-blue-500"
                                  }`
                              // : "bg-blue-500 text-white"
                            }`}
                            onClick={() =>
                              handleSelectItem(location.id, item._id)
                            }
                            disabled={
                              remainingAmount === 0 && !selectedItems[item._id]
                            }
                          >
                            {selectedItems[item._id] ? "Undo" : "Select"}
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-sm">
                        No items available
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <Modal
              isOpen={isItemRelease}
              onClose={() => setIsItemRelease(!isItemRelease)}
              title={"Release Items"}
              containerClassName="text-base
            w-[60%] xl:w-[40%] h-[50%] lg:h-[30%] max-h-[70vh]
            bg-red-50 dark:bg-[#1e293b]
            font-medium text-slate-700 dark:text-white "
            >
              <div className="mt-4">
                <p className="text-sm md:text-base mb-6">
                  Are you sure you want to Release selected Items ?
                </p>
                <div className="flex flex-col mx-4 sm:flex-row  space-x-0 sm:space-x-4 space-y-4 sm:space-y-0">
                  <button
                    className="btn text-xs sm:text-base bg-gray-300 hover:bg-gray-400 text-gray-700"
                    onClick={() => {
                      setIsItemRelease(!isItemRelease);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn text-xs sm:text-base bg-green-500 hover:bg-green-600 text-white"
                    // onClick={() => deletePlant(isModalOpenDelete?._id)}
                    onClick={() =>
                      console.log(" this is final data ", selectedLocations)
                    }
                  >
                    Accept
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;

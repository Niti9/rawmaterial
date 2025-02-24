"use client";
import React, { useState } from "react";
import {
  getPlantsDetails,
  useClients,
  getLocationByPlant
} from "../../getApiResponse";
import { FaLocationDot } from "react-icons/fa6";
import { BsBuildingsFill } from "react-icons/bs";
import { LuBookmark } from "react-icons/lu";
import { MdMarkunreadMailbox } from "react-icons/md";
import { PiUsersFill } from "react-icons/pi";
const PlantDetails = ({ plantsId }) => {
  const [search, setSearch] = useState("");
  const {
    plantDetails,
    loading: loader,
    error: err,
    refetch: plantsRefetch
  } = getPlantsDetails(plantsId);

  const { allClients, loading, error, refetch: clientsRefetch } = useClients();

  const {
    locationByPlant,
    loading: locationByPlantLoader,
    error: locationByPlantErr,
    refetch: locationByPlantRefetch
  } = getLocationByPlant(plantsId);

  const filteredPlants =
    locationByPlant.filter((plant) =>
      plant.locationName.toLowerCase().includes(search.toLowerCase())
    ) || [];

  const getClientName = (clientId) => {
    if (!allClients) return "Loading..."; // Prevent function from breaking
    const client = allClients.find((c) => c._id === clientId);
    return client ? client.clientName : "Not Found";
  };

  return (
    <div>
      {plantDetails && (
        <div className="card mb-4">
          <div className="card-header">
            <h6 className="card-title">
              {" "}
              All Locations at {plantDetails.plantName}
            </h6>
            {/* <h6 className="card-title"> All Locations on this Plant </h6> */}
          </div>

          <div className="p-6">
            <div className="grid lg:grid-cols-4 gap-6">
              <div className="flex items-center gap-5">
                <FaLocationDot className="text-4xl hover:text-blue-500" />
                <div className="">
                  <h4 className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                    {locationByPlant.length}
                  </h4>
                  <span className="text-sm">Total Locations</span>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <BsBuildingsFill className="text-4xl hover:text-blue-500" />

                <div className="">
                  <h4 className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                    {plantDetails.plantName}
                  </h4>
                  <span className="text-sm">Plant Name</span>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <MdMarkunreadMailbox className="text-4xl  hover:text-blue-500" />
                <div className="">
                  <h4 className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                    {plantDetails.plantAddress}
                  </h4>
                  <span className="text-sm">Plant Address</span>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <PiUsersFill className="text-4xl  hover:text-blue-500" />
                <div className="">
                  <h4 className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                    {plantDetails
                      ? getClientName(plantDetails.clientId)
                      : "Loading..."}
                  </h4>
                  <span className="text-sm">Client Name</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="card">
        <div className="flex flex-wrap justify-between items-center gap-2 p-6">
          <div className="relative flex-1">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <input
              type="text"
              name="table-search"
              id="table-search"
              className="form-input ps-11 border rounded p-2 w-full"
              placeholder="Search for Plants"
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
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="border  shadow-lg overflow-hidden dark:border-gray-700 dark:shadow-gray-900">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-slate-300 bg-opacity-20  dark:bg-slate-800 divide-gray-300 dark:border-gray-700">
                    <tr>
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
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredPlants &&
                      filteredPlants.map((plant, index) => (
                        <tr
                          key={plant._id}
                          className="hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <td className="whitespace-nowrap py-4 pe-3 text-sm text-center font-medium text-gray-900 dark:text-gray-200">
                            {plant.locationName}
                          </td>

                          <td className="whitespace-nowrap py-4 pe-3 text-sm text-center font-medium text-gray-900 dark:text-gray-200">
                            {plant.totalCapacity}
                          </td>
                          <td className="whitespace-nowrap py-4 pe-3 text-sm text-center font-medium text-gray-900 dark:text-gray-200">
                            {plant.availableCapacity}
                          </td>
                          <td className="whitespace-nowrap py-4 pe-3 text-sm text-center font-medium text-gray-900 dark:text-gray-200">
                            {allClients
                              ? getClientName(plant.clientId)
                              : "Loading..."}
                          </td>
                          <td className="whitespace-nowrap py-4 pe-3 text-sm text-center font-medium text-gray-900 dark:text-gray-200">
                            {plantDetails.plantName}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;

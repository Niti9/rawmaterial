"use client";
import React from "react";
import {
  getLocationDetails,
  useClients,
  usePlants
} from "../../getApiResponse";

const LocationDetails = ({ locationId }) => {
  const {
    locationDetails,
    loading: locationLoader,
    error: locationErr,
    refetch: locationRefetch
  } = getLocationDetails(locationId);

  const {
    allPlants,
    loading: loader,
    error: err,
    refetch: plantsRefetch
  } = usePlants();

  const { allClients, loading, error, refetch: clientsRefetch } = useClients();

  const getClientName = (clientId) => {
    if (!allClients) return "Loading..."; // Prevent function from breaking
    const client = allClients.find((c) => c._id === clientId);
    return client ? client.clientName : "Not Found";
  };
  const getPlantName = (plantId) => {
    if (!allPlants) return "Loading..."; // Prevent function from breaking
    const plant = allPlants.find((c) => c._id === plantId);
    return plant ? plant.plantName : "Not Found";
  };

  return (
    <div>
      <div className="card">
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
                    {locationDetails && (
                      <tr
                        key={locationDetails._id}
                        className="hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {/* <td className="py-3 ps-4">
                          <div className="flex items-center h-5">
                            <input
                              id="table-search-checkbox-2"
                              type="checkbox"
                              className="form-checkbox rounded"
                            />
                            <label
                              htmlFor="table-search-checkbox-2"
                              className="sr-only"
                            >
                              Checkbox
                            </label>
                          </div>
                        </td> */}

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-800 dark:text-gray-200">
                          {locationDetails.locationName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-800 dark:text-gray-200">
                          {locationDetails.totalCapacity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-800 dark:text-gray-200">
                          {locationDetails.availableCapacity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-800 dark:text-gray-200">
                          {getClientName(locationDetails.clientId)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-800 dark:text-gray-200">
                          {getPlantName(locationDetails.plantId)}
                        </td>
                      </tr>
                    )}
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

export default LocationDetails;

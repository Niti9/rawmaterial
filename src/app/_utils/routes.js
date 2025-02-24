import { API_BASE_URL } from "./config";

export const routes = {
  login: {
    method: "POST",
    url: `${API_BASE_URL}/account/login`
  },
  logout: {
    method: "POST",
    url: `${API_BASE_URL}/account/logout`
  },
  userAuthorization: {
    method: "GEt",
    url: `${API_BASE_URL}/account/validate`
  },
  createOrganization: {
    method: "POST",
    url: `${API_BASE_URL}/account/register`
  },
  createClient: {
    method: "POST",
    url: `${API_BASE_URL}/client/create`
  },
  getClientById: (id) => ({
    method: "GET",
    url: `${API_BASE_URL}/client/get/${id}`
  }),
  getAllClients: {
    method: "GET",
    url: `${API_BASE_URL}/client/get-all`
  },
  deleteClient: (id) => ({
    method: "DELETE",
    url: `${API_BASE_URL}/client/delete/${id}`
  }),
  createPlant: {
    method: "POST",
    url: `${API_BASE_URL}/client/plant/create`
  },
  getPlantById: (id) => ({
    method: "GET",
    url: `${API_BASE_URL}/client/plant/get/${id}`
  }),
  getAllPlants: {
    method: "GET",
    url: `${API_BASE_URL}/client/plant/get-all`
  },
  getAllPlantsByClient: (id) => ({
    method: "GET",
    url: `${API_BASE_URL}/client/plant/getallbyclient/${id}`
  }),
  deletePlant: (id) => ({
    method: "DELETE",
    url: `${API_BASE_URL}/client/plant/delete/${id}`
  }),
  createLocation: {
    method: "POST",
    url: `${API_BASE_URL}/client/plant/location/create`
  },
  getLocationById: (id) => ({
    method: "GET",
    url: `${API_BASE_URL}/client/plant/location/get/${id}`
  }),
  getAllLocations: {
    method: "GET",
    url: `${API_BASE_URL}/client/plant/location/get-all`
  },
  getAvailableLocations: (id) => ({
    method: "GET",
    url: `${API_BASE_URL}/client/plant/location/available-locations/${id}`
  }),
  deleteLocation: (id) => ({
    method: "DELETE",
    url: `${API_BASE_URL}/client/plant/location/delete/${id}`
  }),
  getLocationByPlant: (id) => ({
    method: "GET",
    url: `${API_BASE_URL}/client/plant/location/getallbyplant/${id}`
  }),
  createPlantLocationsBlock: (id) => ({
    method: "POST",
    url: `${API_BASE_URL}/client/plant/location/block-locations/${id}`
  }),
  updateLocationStatus: (id) => ({
    method: "PUT",
    url: `${API_BASE_URL}/client/plant/location/update-locations`
  }),
  getAllPendingItems: {
    method: "GET",
    url: `${API_BASE_URL}/request/get-pending`
  },
  createItemType: {
    method: "POST",
    url: `${API_BASE_URL}/item-type/create`
  },
  getAllItemType: {
    method: "GET",
    url: `${API_BASE_URL}/item-type/get-all`
  },
  updateItemType: (id) => ({
    method: "PUT",
    url: `${API_BASE_URL}/item-type/update/${id}`
  }),
  deleteItemType: (id) => ({
    method: "DELETE",
    url: `${API_BASE_URL}/item-type/delete/${id}`
  }),
  getRequestedItemsWithLocation: (id) => ({
    method: "GET",
    url: `${API_BASE_URL}/client/plant/location/item-locations/${id}`
  }),
  createCheckOut: {
    method: "POST",
    url: `${API_BASE_URL}/request/create-request`
  },
  createAppUser: {
    method: "POST",
    url: `${API_BASE_URL}/account/create-user`
  },
  deleteAppUser: (userId) => ({
    method: "DELETE",
    url: `${API_BASE_URL}/account/delete-user/${userId}`
  }),
  updateAppUser: (userId) => ({
    method: "PUT",
    url: `${API_BASE_URL}/account/update-user/${userId}`
  })
};

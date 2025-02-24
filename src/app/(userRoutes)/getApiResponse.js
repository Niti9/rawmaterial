"use client";
import { useState } from "react";
import useApiFetcher from "../_customHooks/useApiFetcher";

const useClients = () => {
  const [refetch, setFetch] = useState(false);

  const { data, loading, error } = useApiFetcher(
    "getAllClients",
    {},
    {},
    refetch
  );

  return {
    allClients: data || [],
    // allClients,
    loading,
    error,
    refetch: () => setFetch((prev) => !prev)
  };
};

const usePlants = () => {
  const [refetch, setFetch] = useState(false);

  const { data, loading, error } = useApiFetcher(
    "getAllPlants",
    {},
    {},
    refetch
  );

  return {
    allPlants: data || [],
    loading,
    error,
    refetch: () => setFetch((prev) => !prev)
  };
};
const getAllPendingItems = () => {
  const [refetch, setFetch] = useState(false);

  const { data, loading, error } = useApiFetcher(
    "getAllPendingItems",
    {},
    {},
    refetch
  );

  return {
    allPendingItems: data || [],
    loading,
    error,
    refetch: () => setFetch((prev) => !prev)
  };
};
const getPlantsDetails = (id) => {
  const [refetch, setFetch] = useState(false);

  const { data, loading, error } = useApiFetcher(
    "getPlantById",
    {},
    id,
    refetch
  );

  return {
    plantDetails: data || [],
    // allPlants,
    loading,
    error,
    refetch: () => setFetch((prev) => !prev)
  };
};
const getLocationByPlant = (id) => {
  const [refetch, setFetch] = useState(false);

  const { data, loading, error } = useApiFetcher(
    "getLocationByPlant",
    {},
    id,
    refetch
  );

  return {
    locationByPlant: data || [],
    // allPlants,
    loading,
    error,
    refetch: () => setFetch((prev) => !prev)
  };
};

const getClientDetails = (id) => {
  const [refetch, setFetch] = useState(false);

  const { data, loading, error } = useApiFetcher(
    "getClientById",
    {},
    id,
    refetch
  );

  return {
    clientDetails: data || [],
    loading,
    error,
    refetch: () => setFetch((prev) => !prev)
  };
};
const getAllPlantsByClient = (id) => {
  const [refetch, setFetch] = useState(false);

  const { data, loading, error } = useApiFetcher(
    "getAllPlantsByClient",
    {},
    id,
    refetch
  );

  return {
    allPlantsByClient: data || [],
    loading,
    error,
    refetch: () => setFetch((prev) => !prev)
  };
};
const getLocationDetails = (id) => {
  const [refetch, setFetch] = useState(false);

  const { data, loading, error } = useApiFetcher(
    "getLocationById",
    {},
    id,
    refetch
  );

  return {
    locationDetails: data || [],
    loading,
    error,
    refetch: () => setFetch((prev) => !prev)
  };
};

const useLocations = () => {
  const [refetch, setFetch] = useState(false);

  const { data, loading, error } = useApiFetcher(
    "getAllLocations",
    {},
    {},
    refetch
  );

  return {
    allLocations: data || [],
    loading,
    error,
    refetch: () => setFetch((prev) => !prev)
  };
};
const getAllItemType = () => {
  const [refetch, setFetch] = useState(false);

  const { data, loading, error } = useApiFetcher(
    "getAllItemType",
    {},
    {},
    refetch
  );

  return {
    allItemType: data || [],
    loading,
    error,
    refetch: () => setFetch((prev) => !prev)
  };
};
export {
  useClients,
  usePlants,
  useLocations,
  getPlantsDetails,
  getClientDetails,
  getAllPlantsByClient,
  getLocationDetails,
  getLocationByPlant,
  getAllPendingItems,
  getAllItemType
};

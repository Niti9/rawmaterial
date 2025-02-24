import { FaBuilding, FaInfoCircle, FaRegListAlt } from "react-icons/fa";
import { HiColorSwatch } from "react-icons/hi";
import { GoShieldLock } from "react-icons/go";
import { SiProgress } from "react-icons/si";
import { IoIosCalendar } from "react-icons/io";
import { FaSignsPost } from "react-icons/fa6";
import { IoPeopleCircle } from "react-icons/io5";
import { BsBuildingsFill } from "react-icons/bs";
import { RiAlignItemHorizontalCenterFill } from "react-icons/ri";
import { RiNumbersFill } from "react-icons/ri";
import { AiFillProduct } from "react-icons/ai";
export const ClientForm = {
  heading: "Add Client",
  ClientFromMapping: {
    fields: [
      {
        label: "Client Name",
        field: "clientName",
        mandatory: true,
        placeholder: "Name",
        icon: <IoPeopleCircle className="text-xl mr-1 text-blue-500" />
      }
    ]
  }
};
export const updateClientForm = {
  heading: "Edit Client Details",
  ClientFromMapping: {
    fields: [
      {
        label: "Client Name",
        field: "clientName",
        mandatory: true,
        placeholder: "Name",
        icon: <IoPeopleCircle className="text-xl mr-1 text-blue-500" />
      }
    ]
  }
};
export const ItemTypeForm = {
  heading: "Add Item Details",
  ItemFormMapping: {
    fields: [
      {
        label: "Item Name",
        field: "itemTypeName",
        mandatory: true,
        placeholder: "Name",
        icon: <AiFillProduct className="text-lg mr-1 text-blue-500" />
      },
      {
        label: "Item Description",
        field: "itemTypeDescription",
        // mandatory: true,
        placeholder: "Description",
        icon: <FaInfoCircle className="text-base mr-1 text-blue-500" />
      }
    ]
  }
};

export const PlantForm = {
  heading: "Create New Plant",
  PlantsFromMapping: {
    fields: [
      {
        label: "Select Client",
        field: "clientId",
        mandatory: true,
        placeholder: "Select Client Name",
        type: "dynamicSelect",
        getData: {
          service: "getAllClients",
          valueKey: "_id",
          labelKey: "clientName"
        }
      },
      {
        label: "Plant Name",
        field: "plantName",
        mandatory: true,
        placeholder: "Your Plant Name",
        icon: <FaBuilding className="text-blue-500" />
      },
      {
        label: "Plant Address",
        field: "plantAddress",
        icon: <FaInfoCircle className="text-blue-500" />,
        mandatory: true,
        placeholder: "Enter Plant Address"
      }
    ]
  }
};
export const updatePlantForm = {
  heading: "Edit Plant Details",
  PlantsFromMapping: {
    fields: [
      {
        label: "Select Client",
        field: "clientId",
        mandatory: true,
        placeholder: "Select Client Name",
        type: "dynamicSelect",
        getData: {
          service: "getAllClients",
          valueKey: "_id",
          labelKey: "clientName"
        }
      },
      {
        label: "Plant Name",
        field: "plantName",
        mandatory: true,
        placeholder: "Your Plant Name",
        icon: <FaBuilding />
      },
      {
        label: "Plant Address",
        field: "plantAddress",
        icon: <FaInfoCircle />,
        mandatory: true,
        placeholder: "Enter Plant Address"
      }
    ]
  }
};
export const LocationForm = {
  heading: "Create New Location",
  LocationFromMapping: {
    fields: [
      {
        label: "Select Client",
        field: "clientId",
        mandatory: true,
        placeholder: "Select Client Name",
        type: "dynamicSelect",
        getData: {
          service: "getAllClients",
          valueKey: "_id",
          labelKey: "clientName"
        }
      },
      {
        label: "Select Plant",
        field: "plantId",
        mandatory: true,
        placeholder: "Select Plant Name",
        type: "dynamicSelect",
        getData: {
          service: "getAllPlantsByClient",
          // service: "getAllPlants",
          valueKey: "_id",
          labelKey: "plantName",
          dynamicFieldId: "clientId"
        }
      },
      {
        label: "Location Name",
        field: "locationName",
        mandatory: true,
        placeholder: "Your Location Name",
        icon: <FaBuilding />
      },
      {
        label: "Total Capacity",
        field: "totalCapacity",
        icon: <FaInfoCircle />,
        mandatory: true,
        placeholder: "Enter Total Capacity"
      }
      // {
      //   label: "Available Capacity",
      //   field: "availableCapacity",
      //   icon: <FaInfoCircle />,
      //   mandatory: true,
      //   placeholder: "Enter Available Capacity"
      // }
    ]
  }
};
export const updateLocationForm = {
  heading: "Edit Location",
  LocationFromMapping: {
    fields: [
      {
        label: "Select Client",
        field: "clientId",
        mandatory: true,
        placeholder: "Select Client Name",
        type: "dynamicSelect",
        getData: {
          service: "getAllClients",
          valueKey: "_id",
          labelKey: "clientName"
        }
      },
      {
        label: "Select Plant",
        field: "plantId",
        mandatory: true,
        placeholder: "Select Plant Name",
        type: "dynamicSelect",
        getData: {
          service: "getAllPlantsByClient",
          // service: "getAllPlants",
          valueKey: "_id",
          labelKey: "plantName",
          dynamicFieldId: "clientId"
        }
      },
      {
        label: "Location Name",
        field: "locationName",
        mandatory: true,
        placeholder: "Your Location Name",
        icon: <FaBuilding />
      },
      {
        label: "Total Capacity",
        field: "totalCapacity",
        icon: <FaInfoCircle />,
        mandatory: true,
        placeholder: "Enter Total Capacity"
      }
    ]
  }
};

export const updateItemType = {
  heading: "Edit Item Details",
  DataFromMapping: {
    fields: [
      {
        label: "Item Name",
        field: "itemTypeName",
        mandatory: true,
        placeholder: "Enter Item Name",
        icon: <AiFillProduct className="text-base text-blue-500" />
      },
      {
        label: "Item Description",
        field: "itemTypeDescription",
        mandatory: true,
        placeholder: "Enter Description",
        icon: <FaInfoCircle className="text-base  text-blue-500" />
      }
    ]
  }
};

export const UserForm = {
  heading: "Select Item ",
  PlantsFromMapping: {
    fields: [
      {
        label: "Client Name",
        field: "clientName",
        mandatory: true,
        placeholder: "Select Client Name",
        type: "dynamicSelect",
        getData: {
          service: "getAllClients",
          valueKey: "_id",
          labelKey: "clientName"
        }
      },
      {
        label: "Select Plant",
        field: "plantId",
        mandatory: true,
        placeholder: "Select Plant Name",
        type: "dynamicSelect",
        getData: {
          service: "getAllPlantsByClient",
          // service: "getAllPlants",
          valueKey: "_id",
          labelKey: "plantName",
          dynamicFieldId: "clientName"
        }
      },
      {
        label: "Item Name",
        field: "itemTypeId",
        mandatory: true,
        type: "dynamicSelect",
        icon: <RiAlignItemHorizontalCenterFill />,
        placeholder: "Enter Item Name",
        getData: {
          service: "getAllItemType",
          valueKey: "_id",
          labelKey: "itemTypeName"
          // dynamicFieldId: "clientName"
        }
      },
      // {
      //   label: "Item Description",
      //   field: "itemDetails",
      //   icon: <FaInfoCircle />,
      //   placeholder: "Enter Item Description"
      // },
      {
        label: "Item Size",
        field: "itemSize",
        icon: <RiNumbersFill />,
        mandatory: true,
        placeholder: "Enter Item Size"
      }
    ]
  }
};
export const UserCheckoutForm = {
  heading: "Select Item ",
  CheckoutMapping: {
    fields: [
      {
        label: "Item Name",
        field: "itemTypeId",
        mandatory: true,
        type: "dynamicSelect",
        icon: <RiAlignItemHorizontalCenterFill />,
        placeholder: "Enter Item Name",
        getData: {
          service: "getAllItemType",
          valueKey: "_id",
          labelKey: "itemTypeName"
          // dynamicFieldId: "clientName"
        }
      },
      {
        label: "Item Size",
        field: "totalSize",
        icon: <RiNumbersFill />,
        mandatory: true,
        placeholder: "Enter Item Size"
      }
    ]
  }
};
export const mockUserData = [
  {
    _id: "67b58db5ad18d5edc15b47ae",
    locationName: "kustocom location-1",
    availableCapacity: 50
  },
  {
    _id: "67b58dbcad18d5edc15b47b0",
    locationName: "kustocom location-2",
    availableCapacity: 50
  },
  {
    _id: "67b58dc3ad18d5edc15b47b2",
    locationName: "kustocom location-3",
    availableCapacity: 50
  },
  {
    _id: "67b58dc7ad18d5edc15b47b4",
    locationName: "kustocom location-4",
    availableCapacity: 50
  },
  {
    _id: "67b58dccad18d5edc15b47b6",
    locationName: "kustocom location-5",
    availableCapacity: 50
  }
];

export const dummyRequests = {
  code: 0,
  data: [
    {
      _id: "67b343ea66e9f1e53046849f",
      itemName: "Dell Mouse",
      itemDescription: "Great Item and most required",
      totalSize: 100,
      itemStatus: "Pending",
      // itemStatus: "Pending",
      CheckOutStatus: "Pending",
      plantId: "67b47e30f44ba30de6fae046",
      appusergroupid: "67b373ccf44ba30de6fadf"
    },
    {
      _id: "67b343ea66e9f1e53049f",
      itemName: "Hp Laptop",
      itemDescription: "Great Item and mostly demand by youth",
      totalSize: 200,
      itemStatus: "Pending",
      plantId: "67b47e30f44ba3e046",
      appusergroupid: "644ba30de6fadf"
    },
    {
      _id: "67b343ea66e9f1e53049fdddd",
      itemName: "Hp Laptop",
      itemDescription: "Great Item and mostly demand by youth",
      totalSize: 200,
      CheckOutStatus: "Pending",
      // itemStatus: "Pending",
      plantId: "67b47e30f44ba3e046",
      appusergroupid: "644ba30de6fadf"
    }
  ],
  message: "All Locations"
};
export const dummyLocations = {
  code: 0,
  data: [
    {
      _id: "67b343ea66e9f1e53046849f",
      locationName: "kustocom location-1",
      totalCapacity: 50,
      availableCapacity: 30,
      clientId: "67b087b38b0c008ff258557f",
      plantId: "67b243d49fadd954db54ca02"
    },
    {
      _id: "67b343ea66e9f1e530468500",
      locationName: "kustocom location-2",
      totalCapacity: 75,
      availableCapacity: 50,
      clientId: "67b085e7d494d93ce902aca9",
      plantId: "67b246979fadd954db54ca06"
    }
  ],
  message: "All Locations"
};

export const dummyClients = {
  code: 0,
  data: [
    {
      _id: "67b085e7d494d93ce902aca9",
      clientName: "dummy new"
    },
    {
      _id: "67b087b38b0c008ff258557f",
      clientName: "dummy Client"
    }
  ],
  message: "All Clients"
};

export const dummyPlants = {
  code: 0,
  data: [
    {
      _id: "67b243d49fadd954db54ca02",
      plantName: "Kustocom",
      plantAddress: "Noida 18",
      clientId: "67b087b38b0c008ff258557f"
    },
    {
      _id: "67b246979fadd954db54ca06",
      plantName: "Kustocom test",
      plantAddress: "Noida 18 test",
      clientId: "67b087b38b0c008ff258557f"
    }
  ],
  message: "All Plants"
};

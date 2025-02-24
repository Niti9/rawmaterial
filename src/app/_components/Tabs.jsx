// 'use client'
// import React, { useState } from "react";

// const Tabs = ({ tabData, component ,TabCss,activeTabCss}) => {
//   // const [clicked, setClicked] = useState({});
//   const [activeTab, setActiveTab] = useState(0);

//   // const handleClick = (index, method) => {
//   // if (!clicked[index] && method) {
//   // method();
//   // setClicked((prevState) => ({ ...prevState, [index]: true }));
//   // }
//   // };

//   const changeTabs = (index) => {
//     setActiveTab(index);
//     // handleClick(index, method);
//   };

//   return (
//     <div className={`flex flex-col flex-1 h-full pt-16 ${TabCss}`}>
//       <div
//         className="border-b-2 border-gray-200 dark:border-neutral-700"
//         id="fp_tabs">
//         <div className="flex justify-between">
//           <nav
//             className="flex gap-x-2"
//             aria-label="Tabs"
//             role="tablist"
//             aria-orientation="horizontal">
//             {tabData.map((item, index) => {
//               const { title } = item;
//               return (
//                 // <button
//                 //   key={index}
//                 //   type="button"
//                 //   className={`cursor-pointer text-primary py-2 px-[28px] text-sm font-medium text-center ${
//                 //     index === activeTab ? "active" : ""
//                 //   }`}
//                 //   onClick={() => changeTabs(index)}>
//                 //   {title}
//                 // </button>

//                 <button
//                 key={index}
//                 type="button"
//                 className={`cursor-pointer  py-2 px-[28px] text-sm font-medium text-center ${
//                   index === activeTab ? `active  ${activeTabCss} text-primary dark:text-navy-100 ` : " text-gray-600 dark:text-gray-400"
//                 }`}
//                 onClick={() => changeTabs(index)}>
//                 {title}
//               </button>
//               );
//             })}
//           </nav>
//           {component}
//         </div>
//       </div>
//       <div className="tab-content pt-3 flex-1">
//         {tabData.map((item, index) => {
//           if (index === activeTab) {
//             return (
//               <div key={index} className="block h-full">
//                 {item.tabBody}
//               </div>
//             );
//           }
//           return null;
//         })}
//       </div>
//     </div>
//   );
// };

// export default Tabs;












"use client";
import React, { useState, useEffect } from "react";

const Tabs = ({ tabData, defaultActiveTab = 0, component, TabCss, activeTabCss }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const changeTabs = (index) => {
    setActiveTab(index);
  };

  return (
    <div className={`flex flex-col flex-1 h-full pt-16 ${TabCss}`}>
      <div
        className="border-b-2 border-gray-200 dark:border-neutral-700"
        id="fp_tabs"
      >
        <div className="flex justify-between">
          <nav
            className="flex gap-x-2"
            aria-label="Tabs"
            role="tablist"
            aria-orientation="horizontal"
          >
            {tabData.map((item, index) => {
              const { title } = item;
              return (
                <button
                  key={index}
                  type="button"
                  className={`cursor-pointer py-2 px-[28px] text-sm font-medium text-center ${
                    index === activeTab
                      ? `active ${activeTabCss} text-primary dark:text-navy-100`
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                  onClick={() => changeTabs(index)}
                >
                  {title}
                </button>
              );
            })}
          </nav>
          {component}
        </div>
      </div>
      <div className="tab-content pt-3 flex-1">
        {tabData.map((item, index) => {
          if (index === activeTab) {
            return (
              <div key={index} className="block h-full">
                {item.tabBody}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Tabs;

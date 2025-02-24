import Image from "next/image";
import React from "react";

const Avatar = ({
  image,
  name,
  color,
  className,
  avatarClassName,
  textClassName = ""
}) => {
  const getInitials = (name) => {
    if (!name) return "";
    const nameParts = name.split(" ");
    if (nameParts.length === 1) {
      return nameParts[0].slice(0, 2).toUpperCase();
    } else {
      return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    }
  };
  if (image)
    return (
      <div className={`${className ? className : "avatar size-20"}`}>
        <Image
          className="rounded-full"
          src={image ? image : "/avatar-12.jpg"}
          height={100}
          width={100}
          alt="avatar"
        />
      </div>
    );
  return (
    <div className={`${avatarClassName ? avatarClassName : "avatar size-12"}`}>
      <div
        className={`h-full is-initial rounded-full bg-${color} text-lg !leading-10 uppercase text-white bg-[#103f8e] dark:text-white font-medium ${textClassName}`}
        // className={`h-full is-initial rounded-full bg-${color} text-lg !leading-10 uppercase text-white dark:bg-navy-500 dark:text-navy-100 ${textClassName}`}
      >
        {getInitials(name)}
      </div>
    </div>
  );
};

export default Avatar;

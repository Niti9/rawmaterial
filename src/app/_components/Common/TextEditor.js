"use client";
import React, { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill-new";

export const TextEditor = ({ initialValue, functionOnContentChange }) => {
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }]
      // ["link", "image", "video"],
      // ["clean"],
    ]
  };

  const formats = [
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "link",
    "image",
    "video"
  ];

  return (
    <ReactQuill
      theme="snow"
      value={initialValue}
      onChange={functionOnContentChange}
      modules={modules}
      formats={formats}
    />
  );
};

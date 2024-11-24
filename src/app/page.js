"use client";
import Image from "next/image";
import React, { useState } from "react";

const Page = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [textResult, setTextResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  var myHeaders = new Headers();
  myHeaders.append("apikey", "Tn0TYjIRfsPJVj6j98QvwWM5ZlsBQqVs");

  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  const handleImageProcessing = async () => {
    if (!imageUrl) return;
    setIsLoading(true);
    try {
      const URL = `https://api.apilayer.com/image_to_text/url?url=${encodeURIComponent(imageUrl)}`;
      const response = await fetch(URL, requestOptions);
      if (!response.ok) throw new Error("Failed to fetch OCR result");
      const data = await response.json();
      setTextResult(data?.all_text);
    } catch (error) {
      setTextResult("Something went wrong during OCR processing.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeUrl = (e) => {
    setImageUrl(e.target.value);
    setTextResult("");
  };

  return (
    <div className="p-8">
      <div className="border bg-blue-500 rounded w-full p-6">
        <h1 className="text-center font-bold text-white text-2xl">
          IMAGE TO TEXT CONVERTER
        </h1>
        <div className="flex flex-col rounded h-24 justify-center items-center bg-[#092045] text-white mx-auto mt-6">
          <label className="font-bold mt-4 text-xl" htmlFor="imageUrl">
            Enter Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            placeholder="Input image URL here"
            value={imageUrl}
            onChange={handleChangeUrl}
            className="mt-8 p-2 rounded text-black  border w-full"
          />
        </div>

        <div className="md:flex md:justify-evenly md:space-x-4 mt-6">
          <div className="border rounded w-full md:w-[600px] min-h-[250px] p-2">
            {imageUrl ? (
              <Image src={imageUrl} height={300} width={300} alt="Uploaded Image" />
            ) : (
              <p>Image will preview here</p>
            )}
          </div>

          <div className="border mt-4 rounded text-justify w-full min-h-[250px] p-4 bg-white">
            {isLoading ? (
              <p>Processing...</p>
            ) : (
              <p>{textResult || "Upload an image to extract text."}</p>
            )}
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleImageProcessing}
            className="px-4 py-2 bg-[#003566] text-white rounded font-bold hover:bg-[#00204a] transition"
            disabled={!imageUrl || isLoading}
          >
            {isLoading ? "Processing..." : "Extract Text"}
          </button>
        </div>
        <p className="text-black float-right">@matthew</p>
      </div>
    </div>
  );
};

export default Page;

'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState('');

  const [textResult, setTextResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (file) {
      setPreviewImageUrl(URL.createObjectURL(file));
    } else if (imageUrl) {
      setPreviewImageUrl(imageUrl);
    } else {
      setPreviewImageUrl('');
    }
  }, [file, imageUrl]);

  const handleImageProcessing = async () => {
    if (!imageUrl && !file) return;

    try {
      // Set loading to true at start of image processing
      setIsLoading(true);

      const myHeaders = new Headers();
      myHeaders.append('apikey', 'Tn0TYjIRfsPJVj6j98QvwWM5ZlsBQqVs');

      const requestOptions = {
        method: file ? 'POST' : 'GET',
        redirect: 'follow',
        headers: myHeaders,
        body: file ?? undefined,
      };

      const urlRoute = `https://api.apilayer.com/image_to_text/url?url=${encodeURIComponent(
        imageUrl
      )}`;
      const uploadRoute = `https://api.apilayer.com/image_to_text/upload`;
      const response = await fetch(
        file ? uploadRoute : urlRoute,
        requestOptions
      );

      if (!response.ok) throw new Error('Failed to fetch OCR result');

      const data = await response.json();

      setTextResult(data?.all_text);
    } catch (error) {
      setTextResult('Something went wrong during OCR processing.');
    } finally {
      // Set loading to false after image processing
      setIsLoading(false);
    }
  };

  const handleChangeUrl = (e) => {
    setFile(null);
    setTextResult('');

    setImageUrl(e.target.value);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageUrl('');
      setTextResult('');

      setFile(file);
    }
  };

  return (
    <div className='p-8'>
      <div className='border bg-blue-500 rounded w-full p-6'>
        <h1 className='text-center font-bold text-white text-2xl'>
          IMAGE TO TEXT CONVERTER
        </h1>

        {/* Enter Image URL */}
        <div className='flex flex-col rounded h-24 justify-center items-center bg-[#092045] text-white mx-auto mt-6'>
          <label className='font-bold mt-4 text-xl' htmlFor='imageUrl'>
            Enter Image URL
          </label>
          <input
            type='text'
            id='imageUrl'
            placeholder='Input image URL here'
            value={imageUrl}
            onChange={handleChangeUrl}
            className='mt-8 p-2 rounded text-black  border w-full'
          />
        </div>

        <div className='text-center font-bold text-3xl pt-8'>OR</div>

        {/* Upload Image */}
        <div className='flex flex-col rounded h-24 justify-center items-center bg-[#092045] text-white mx-auto mt-6'>
          <label className='font-bold mt-4 text-xl' htmlFor='imageUrl'>
            Upload an image from your device
          </label>
          <input
            type='file'
            accept='image/png, image/jpg, image/jpeg'
            id='imageUrl'
            placeholder='Upload an image'
            onChange={handleFileUpload}
            className='mt-8 p-2 rounded text-black  border w-full'
          />
        </div>

        {/* Preview Image */}
        <div className='md:flex md:justify-evenly md:space-x-4 mt-6'>
          <div className='border rounded w-full md:w-[600px] min-h-[250px] p-2'>
            {previewImageUrl ? (
              <Image
                src={previewImageUrl}
                height={300}
                width={300}
                alt='Uploaded Image'
              />
            ) : (
              <p>Image will preview here</p>
            )}
          </div>

          <div className='border mt-4 rounded text-justify w-full min-h-[250px] p-4 bg-white'>
            {isLoading ? (
              <p>Processing...</p>
            ) : (
              <p>{textResult || 'Upload an image to extract text.'}</p>
            )}
          </div>
        </div>

        {/* Render Processed Text */}
        <div className='mt-6 text-center'>
          <button
            onClick={handleImageProcessing}
            className='px-4 py-2 bg-[#003566] text-white rounded font-bold hover:bg-[#0020aa] hover:cursor-pointer transition'
            disabled={(!imageUrl && !file) || isLoading}>
            {isLoading ? 'Processing...' : 'Extract Text'}
          </button>
        </div>

        {/* Credit */}
        <p className='text-black float-right'>@matthew</p>
      </div>
    </div>
  );
};

export default Page;

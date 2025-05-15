'use client';

import { useState } from 'react';

export default function Studio() {
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  return (
    <main className="min-h-screen p-8 bg-neutral-950 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Studio</h1>

      <div className="flex gap-5 justify-evenly">
        <form action="" method="post" className="flex flex-col gap-4 max-w-xl">
          {[
            { name: 'title', placeholder: 'Title' },
            { name: 'Description', placeholder: 'Description' },
            { name: 'ShorDescription', placeholder: 'Short Description' },
          ].map((field) => (
            <label key={field.name} className="flex flex-col gap-1">
              {field.name}
              <input
                type="text"
                name={field.name}
                placeholder={field.placeholder}
                className="px-4 py-2 rounded-md bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          ))}

          {/* Course Level */}
          <label className="flex flex-col gap-1">
            Level
            <select
              name="level"
              className="px-4 py-2 rounded-md bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </label>

          {/* FrontPage Image */}
          <label
            htmlFor="frontPageInput"
            className="border-2 border-dashed border-neutral-600 p-6 rounded-lg text-center cursor-pointer hover:bg-neutral-800 transition-colors"
          >
            {frontImage
              ? `Image uploaded: ${frontImage.name}`
              : 'Click or drag an image to upload as cover'}
            <input
              id="frontPageInput"
              name="FrontPage"
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setFrontImage(file);
              }}
            />
          </label>

          {/* Video Upload */}
          <label
            htmlFor="videoInput"
            className="border-2 border-dashed border-neutral-600 p-6 rounded-lg text-center cursor-pointer hover:bg-neutral-800 transition-colors"
          >
            {videoFile
              ? `Video uploaded: ${videoFile.name}`
              : 'Click or drag a video to upload'}
            <input
              id="videoInput"
              name="Video"
              type="file"
              accept="video/*"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setVideoFile(file);
              }}
            />
          </label>
          <button
            type="submit"
            className="bg-topHeader p-6 rounded-lg text-center hover:bg-greenIn transition-colors"
          >
            Upload
          </button>
        </form>

        {(frontImage || videoFile) && (
          <div className="mt-8 space-y-6">
            {frontImage && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Image Preview:</h2>
                <img
                  src={URL.createObjectURL(frontImage)}
                  alt="Preview"
                  className="max-w-sm rounded-lg border border-neutral-700"
                />
              </div>
            )}

            {videoFile && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Video Preview:</h2>
                <video
                  controls
                  src={URL.createObjectURL(videoFile)}
                  className="max-w-md rounded-lg border border-neutral-700"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

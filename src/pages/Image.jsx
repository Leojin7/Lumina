import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ImageAnalysis() {
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [objectsDetected, setObjectsDetected] = useState([]);
  const [imageDescription, setImageDescription] = useState("");
  const [error, setError] = useState("");

  const handleImageUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      setError("");
      setAnalysisResults(null);
      setObjectsDetected([]);
      setImageDescription("");
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file));

      // Convert image to base64 for API
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64data = reader.result.split(",")[1];
        try {
          const response = await fetch("http://localhost:8000/analyze-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image_base64: base64data }),
          });

          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            setAnalysisResults(data);

            if (data.responses && data.responses.length > 0) {
              const firstResponse = data.responses[0];

              if (firstResponse.labelAnnotations) {
                const labels = firstResponse.labelAnnotations.map(
                  (label) => label.description
                );
                setObjectsDetected(labels);
              } else {
                setObjectsDetected([]);
              }

              if (firstResponse.labelAnnotations) {
                const topLabels = firstResponse.labelAnnotations
                  .slice(0, 3)
                  .map((label) => label.description)
                  .join(", ");
                setImageDescription(`This image contains: ${topLabels}`);
              } else {
                setImageDescription("No labels detected");
              }
            } else {
              setObjectsDetected([]);
              setImageDescription("No analysis available");
            }
          } else {
            setError("Non-JSON response received from backend.");
            setObjectsDetected(["Analysis failed"]);
            setImageDescription("Could not analyze image. Please try again.");
          }
        } catch (err) {
          setError("Error analyzing image: " + err.message);
          setObjectsDetected(["Analysis failed"]);
          setImageDescription("Could not analyze image. Please try again.");
        }
        setIsUploading(false);
      };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center pt-10 max-w-4xl mx-auto"
    >
      <motion.h2
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
      >
        Upload and Analyze Images
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-500 mb-8 text-center"
      >
        Upload an image to analyze its content and extract relevant information.
      </motion.p>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="w-full p-8 bg-white rounded-xl shadow-xl mb-8"
      >
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-12 cursor-pointer hover:border-blue-400 transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            disabled={isUploading}
          />

          {isUploading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full mb-4"
            />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          )}

          <p className="text-lg font-medium mb-2">
            {isUploading ? "Analyzing your image..." : "Click to upload or drag and drop"}
          </p>
          <p className="text-gray-500">
            PNG, JPG, GIF up to 10MB
          </p>
        </label>
      </motion.div>

      {error && (
        <div className="mb-4 text-red-500 font-semibold">{error}</div>
      )}

      {image && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full bg-white rounded-xl shadow-xl p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <motion.img
                src={image}
                alt="Uploaded"
                className="w-full h-auto rounded-lg shadow-lg"
                whileHover={{ scale: 1.03 }}
              />
            </div>

            <div className="md:w-1/2">
              <motion.h3
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                className="text-2xl font-bold mb-4"
              >
                Analysis Results
              </motion.h3>

              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-4 bg-blue-50 rounded-lg"
                >
                  <h4 className="font-bold text-blue-700">Objects Detected</h4>
                  <p>
                    {objectsDetected.length > 0
                      ? objectsDetected.join(", ")
                      : "No objects detected"}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="p-4 bg-purple-50 rounded-lg"
                >
                  <h4 className="font-bold text-purple-700">Description</h4>
                  <p>{imageDescription}</p>
                </motion.div>

                {analysisResults?.responses &&
                  analysisResults.responses[0]?.safeSearchAnnotation && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="p-4 bg-green-50 rounded-lg"
                    >
                      <h4 className="font-bold text-green-700">Safety Rating</h4>
                      <p>
                        Adult:{" "}
                        {analysisResults.responses[0].safeSearchAnnotation.adult}
                      </p>
                      <p>
                        Spoof:{" "}
                        {analysisResults.responses[0].safeSearchAnnotation.spoof}
                      </p>
                      <p>
                        Violence:{" "}
                        {analysisResults.responses[0].safeSearchAnnotation.violence}
                      </p>
                    </motion.div>
                  )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

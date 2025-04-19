import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import Goback from "../Goback";

const QRScanner = () => {
  const [scannedData, setScannedData] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });

    scanner.render(
      (decodedText) => {
        setScannedData(decodedText);
        setError("");

        if (decodedText.startsWith("http")) {
          window.location.href = decodedText; // Navigate to absolute URLs directly
        } else {
          navigate(decodedText); // Navigate relative paths within the app
        }
      },
      (scanError) => setError("QR Scan Failed! Please try again.")
    );

    return () => scanner.clear(); // Cleanup on unmount
  }, [navigate]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(scannedData);
    alert("Copied to clipboard!");
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-black text-white min-h-screen">
      {/* Go Back Button */}
      <div className="sm: mr-60">
        <Goback />
      </div>

      <h2 className="text-2xl font-bold mb-4">Scan QR Code</h2>
      <p>Click to grant Permission --- Request_camera_permission 👇</p>
      <p>Click to upload QR --- Request_camera_permission 👇</p>

      {/* QR Scanner Box */}
      <div id="reader" className="w-full m-5 max-w-sm border border-gray-600 p-2 rounded-lg bg-gray-800">
        
      </div>

      {/* Status Message */}
      {scannedData && (
        <div className="mt-4 p-4 w-full max-w-sm bg-gray-800 border border-green-500 rounded-lg text-center">
          <p className="text-green-400 text-sm">✅ Scan Successful!</p>
          <p className="text-xs break-all mt-2">{scannedData}</p>

          {/* Buttons */}
          <div className="flex justify-center gap-3 mt-3">
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
            >
              Copy Link
            </button>
            <a
              href={scannedData}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition"
            >
              Open Link
            </a>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-red-400 mt-4">{error}</p>}
    </div>
  );
};

export default QRScanner;

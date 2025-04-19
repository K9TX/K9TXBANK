import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { IoMdDownload, IoMdShare } from "react-icons/io";
import { PiBracketsCurly } from "react-icons/pi";
import { Clipboard, ClipboardCheck } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link

const QRCodeComponent = ({ accountNumber }) => {
  const [base64QR, setBase64QR] = useState("");
  const qrRef = useRef(null);
  const [copied, setCopied] = useState(null);
  const [open, setOpen] = useState(false);

  const generateBase64QR = () => {
    setOpen(!open);
    const canvas = qrRef.current.querySelector("canvas");
    if (canvas) {
      const base64 = canvas.toDataURL("image/png");
      setBase64QR(base64);
    }
  };

  const downloadQRCode = () => {
    const canvas = qrRef.current.querySelector("canvas");
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = `QRCode-${accountNumber}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const shareQRCode = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Send Money via QR Code",
          text: `Scan this QR to send money to account: ${accountNumber}`,
          url: `${window.location.origin}/transfer?account=${accountNumber}`,
        });
      } catch (error) {
        console.error("Error sharing QR Code:", error);
      }
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  const handleCopy = async (base64QR) => {
    try {
      await navigator.clipboard.writeText(base64QR);
      setCopied(base64QR);
      setTimeout(() => setCopied(null), 1000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-3 bg-black p-6 text-white rounded-lg">
      <p className="text-gray-300 text-sm">Scan this QR to send money</p>

      {/* QR Code */}
      <div
        ref={qrRef}
        className="border border-gray-400 p-4 bg-white rounded-lg"
      >
        <QRCodeCanvas
          value={`${window.location.origin}/transfer?account=${accountNumber}`}
          size={150}
        />
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-4">
        <button
          onClick={downloadQRCode}
          className="border-2 hover:bg-blue-500 border-gray-700 px-4 py-2 cursor-pointer rounded-lg"
        >
          <IoMdDownload />
        </button>
        <button
          onClick={shareQRCode}
          className="px-4 py-2 hover:bg-blue-500 rounded-lg border-2 cursor-pointer border-gray-700"
        >
          <IoMdShare />
        </button>
        <button
          onClick={generateBase64QR}
          className="border-2 hover:bg-blue-500 border-gray-700 cursor-pointer px-4 py-2 rounded"
        >
          <PiBracketsCurly />
        </button>
      </div>

      {/* Redirect to Transfer Page */}
      <Link
        to={`/transfer?account=${accountNumber}`}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hidden hover:bg-blue-600 transition"
      >
        Go to Transfer Page
      </Link>

      {/* Display Base64 QR Code */}
      {base64QR && (
        <div>
          <textarea
            className="mt-4 p-4 text-gray-300 w-full max-w-sm border border-gray-500 rounded-lg"
            value={base64QR}
            readOnly
          />
          <div className="flex items-center justify-end">
            <button
              onClick={() => handleCopy(base64QR)}
              className="text-gray-300 cursor-copy hover:text-blue-400 transition duration-200"
            >
              {copied === base64QR ? (
                <div className="flex items-center">
                  <ClipboardCheck className="w-5 h-5 text-green-400" /> Copy
                  base64
                </div>
              ) : (
                <div className="flex items-center">
                  <Clipboard className="w-5 h-5" /> Copy base64
                </div>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodeComponent;

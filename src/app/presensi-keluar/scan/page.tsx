// @ts-nocheck
"use client";

import { Html5QrcodeScanner } from "html5-qrcode";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const QrScanner = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [data, setData] = useState("kosong");

  const router = useRouter();

  const session = useSession()

  useEffect(() => {
    var scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: { height: 200, width: 200 },
    });

    function onScanSuccess(decodedText, decodedResult) {
      // Handle on success condition with the decoded text or result.
      setData(decodedText);

      console.log(`Scan result: ${decodedText}`, decodedResult);

      // ...
      scanner.clear();

      router.push(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/qr-code-pulang/${decodedText}/?email=${session.data?.user?.email}&code=${decodedText}`
      );

      // ^ this will stop the scanner (video feed) and clear the scan area.
    }

    function onScanError(errorMessage) {
      // handle on error condition, with error message
      console.log(errorMessage);
    }

    scannerRef.current = scanner;

    // scanner.render(success, error);
    scanner.render(onScanSuccess, onScanError);

    console.log('scan')

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
      }
    };
  }, [session]);

  return (
    <div className="container mt-8">
      <h1>QR Code Scanner</h1>
      {scanResult ? (
        <div>Success: {scanResult}</div>
      ) : (
        <div id="reader" style={{ width: "100%" }}></div>
      )}
    </div>
  );
};

export default QrScanner;

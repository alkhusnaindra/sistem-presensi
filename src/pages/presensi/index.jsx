import React, { useEffect, useState } from "react";
import Footer from "@/components/footer";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useRouter } from "next/router";

const ScanPresensi = () => {
  const [scanResult, setScanResult] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 300,
        height: 300,
      },
      fps: 5,
    });

    const success = (result) => {
      setScanResult(result);
      setTimeout(() => {
        scanner.clear();
        setScanResult(null);
        scanner.render(success, error);
      }, 2000);
    };

    const error = (err) => {
      console.warn(err);
    };

    scanner.render(success, error);

    // Clean up the scanner on component unmount
    return () => {
      scanner.clear();
    };
  }, []);

  return (
    <div>
      <div>
        <div className="flex h-[93vh] flex-col items-center justify-between">
          <div className="flex flex-row items-center justify-between w-full px-10 py-5">
            <p className="text-xl">Presensi Siswa Berbasis QR Code</p>
            <button
              onClick={() => router.push("/presensi")}
              href="#"
              className="inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
            >
              LOGOUT
            </button>
          </div>
          <div className="m-auto">
            {/* card */}
            <div className="w-[500px] bg-white border border-gray-200 rounded-lg shadow relative ">
              <div className="p-10">
                <div className="flex flex-row justify-between bg-white border p-5 rounded-lg absolute top-[-40px] w-[415px] mx-auto ">
                  <div>
                    <p className="font-bold">Presensi Masuk</p>
                    <p className="text-[12px]">Tunjukan QR Code ke Kamera</p>
                  </div>
                  <button
                    onClick={() => router.push("/presensi")}
                    href="#"
                    className="inline-flex items-center px-3 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg cursor-pointer"
                  >
                    PRESENSI PULANG
                  </button>
                </div>

                {/* qr scanner */}
                <div className="w-full h-[250px] bg-gray-50 mt-10 mx-auto">
                  {scanResult ? (
                    <div>
                      Success: <p>{scanResult}</p>
                    </div>
                  ) : (
                    <div id="reader"></div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <button
            href="#"
            className="inline-flex items-center px-5 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg cursor-pointer mb-24"
          >
            PRESENSI LAGI
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ScanPresensi;

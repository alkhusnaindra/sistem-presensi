import Footer from "@/components/footer";
import { useRouter } from "next/router";
import React from "react";

const Login = () => {
  const router = useRouter();

  return (
    <div>
      <div
        className="flex h-[93vh] flex-col items-center justify-between"
        style={{
          backgroundImage: "url('/images/bg-login.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="m-auto">
          {/* card */}
          <div className="w-[500px] bg-white border border-gray-200 rounded-lg shadow">
            <a href="#">
              <img
                className="rounded-t-lg h-[200px] w-full object-cover"
                src="/images/login-img.jpg"
                alt="login-image"
              />
            </a>
            <div className="p-5 flex flex-col items-center justify-center">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center">
                  Login Untuk Presensi
                </h5>
              </a>
              <div className="w-[350px]">
                <div>
                  <form className="mx-auto">
                    <div className="mb-5">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Masukkan Email"
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        placeholder="Masukkan Password"
                      />
                    </div>
                  </form>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => router.push("/presensi")}
                    href="#"
                    className="inline-flex items-center px-5 py-2
                    text-sm font-medium text-center text-white bg-blue-700
                    rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none
                    focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700
                    dark:focus:ring-blue-800"
                  >
                    {" "}
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

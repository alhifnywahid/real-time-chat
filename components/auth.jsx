import { signIn } from "next-auth/react";
import { Inter } from "next/font/google";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
const inter = Inter({ subsets: ["latin"] });

export default function Masuk() {
  return (
    <div
      className={`bg-[#0b141a] h-screen w-screen flex items-center justify-center ${inter.className} text-white`}
    >
      <div className="border border-gray-600 p-4 w-80 rounded-xl flex flex-col gap-3 items-center justify-center">
        <button
          onClick={() => {
            signIn("google");
          }}
          className="w-full bg-gray-600 rounded py-2 text-center flex justify-center items-center gap-2"
        >
          <FaGoogle className="text-2xl" />
          Masuk dengan google
        </button>
        <button
          onClick={() => {
            alert("Fitur ini belum tersedia🙏");
          }}
          className="w-full bg-gray-600 rounded py-2 text-center flex justify-center items-center gap-2"
        >
          <FaFacebookF className="text-2xl" />
          Masuk dengan facebook
        </button>
        <button
          onClick={() => {
            alert("Fitur ini belum tersedia🙏");
          }}
          className="w-full bg-gray-600 rounded py-2 text-center flex justify-center items-center gap-2"
        >
          <FaGithub className="text-2xl" />
          Masuk dengan github
        </button>
      </div>
    </div>
  );
}

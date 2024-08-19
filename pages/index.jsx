"use client";

import { signOut, useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Auth from "../components/auth";
import { supabase } from "../lib/database/supabase";
import { getDateTime } from "../utils/function";
const inter = Inter({ subsets: ["latin"] });
const scrollBottom = (selector) => {
  const element = document.querySelector(selector);
  element.scrollTo({
    top: element.scrollHeight,
    behavior: "smooth",
  });
};

export default function Home() {
  const [messageValue, setMessageValue] = useState("");
  const scrollRef = useRef(null);
  const [message, setMessage] = useState([]);
  const { status, data } = useSession();

  useEffect(() => {
    fetch("/api/chats")
      .then((res) => res.json())
      .then((data) => setMessage(data));
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("chat-room")
      .on(
        "postgres_changes",
        { schema: "public", table: "chats", event: "INSERT" },
        (payload) => {
          setMessage((prev) => [...prev, payload.new]);
          setMessageValue("");
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const notReady = () => {
    toast.error("Fitur ini belum tersedia🙏");
  };

  const submitMessage = async (e) => {
    e.preventDefault();
    const msg = e.target.message.value.trim();
    if (msg) {
      fetch("/api/chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.user.name,
          message: msg,
          datetime: getDateTime(),
          email: data.user.email,
          image: data.user.image,
        }),
      });
      scrollBottom("#chat");
    }
  };

  return (
    <div className="w-full h-screen fixed inset-0 z-[-1] bg-gradient-to-r from-darkGray via-darkBlue to-darkPurple animate-mesh bg-[length:200%_200%]">
      <div className="w-full-h-full backdrop-blur-xl">
        {status == "authenticated" ? (
          <div
            className={`max-w-4xl mx-auto bg-[#0b141a] h-screen w-screen bg-repeat ${inter.className} flex flex-col relative`}
          >
            <div className="bg-pattern bg-fixed opacity-10 absolute w-full h-full left-0 top-0"></div>
            <div className="bg-[#202c33] z-10 w-full flex px-4 py-2 gap-3 items-center text-white font-bold justify-between">
              <div className="flex flex-col">
                <h1 className="">{data.user.name}</h1>
                <p className="text-xs font-medium flex gap-2 items-center"><span className="bg-green-500 w-2 h-2 block rounded-full"></span> ... online</p>
              </div>
              <Image
                src={data.user.image}
                onClick={signOut}
                className="w-10 h-10 rounded-full cursor-pointer"
                alt="logo"
                width={50}
                height={50}
              />
            </div>
            <div
              id="chat"
              ref={scrollRef}
              className="w-full h-full mx-auto relative flex flex-col gap-3 py-3 overflow-y-auto"
            >
              {message.map((data, i) => (
                <Fragment key={i}>
                  <ChatItem
                    data={data}
                    position={
                      data.email === data?.user?.email ? "left" : "right"
                    }
                  />
                </Fragment>
              ))}
            </div>
            <div className="bg-[#202c33] w-full flex p-4 gap-3 items-center z-10">
              <span onClick={notReady} className="text-gray-500 cursor-pointer">
                <EmotIcon />
              </span>
              <span onClick={notReady} className="text-gray-500 cursor-pointer">
                <AddIcon />
              </span>
              <form
                onSubmit={submitMessage}
                className="w-full flex justify-center items-center gap-3"
              >
                <input
                  className="w-full bg-transparent border rounded border-gray-600 p-2 focus:outline-none text-white"
                  type="text"
                  name="message"
                  value={messageValue}
                  onChange={(e) => setMessageValue(e.target.value)}
                  autoComplete="off"
                />
                {messageValue.trim() ? (
                  <button
                    type="submit"
                    className="text-gray-500 cursor-pointer"
                  >
                    <SendIcon />
                  </button>
                ) : (
                  <span
                    onClick={notReady}
                    className="text-gray-500 cursor-pointer"
                  >
                    <AudioIcon />
                  </span>
                )}
              </form>
            </div>
          </div>
        ) : (
          <Auth />
        )}
      </div>
    </div>
  );
}

function EmotIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      height="24"
      width="24"
      preserveAspectRatio="xMidYMid meet"
      version="1.1"
      x="0px"
      y="0px"
      enableBackground="new 0 0 24 24"
    >
      <title>smiley</title>
      <path
        fill="currentColor"
        d="M9.153,11.603c0.795,0,1.439-0.879,1.439-1.962S9.948,7.679,9.153,7.679 S7.714,8.558,7.714,9.641S8.358,11.603,9.153,11.603z M5.949,12.965c-0.026-0.307-0.131,5.218,6.063,5.551 c6.066-0.25,6.066-5.551,6.066-5.551C12,14.381,5.949,12.965,5.949,12.965z M17.312,14.073c0,0-0.669,1.959-5.051,1.959 c-3.505,0-5.388-1.164-5.607-1.959C6.654,14.073,12.566,15.128,17.312,14.073z M11.804,1.011c-6.195,0-10.826,5.022-10.826,11.217 s4.826,10.761,11.021,10.761S23.02,18.423,23.02,12.228C23.021,6.033,17.999,1.011,11.804,1.011z M12,21.354 c-5.273,0-9.381-3.886-9.381-9.159s3.942-9.548,9.215-9.548s9.548,4.275,9.548,9.548C21.381,17.467,17.273,21.354,12,21.354z  M15.108,11.603c0.795,0,1.439-0.879,1.439-1.962s-0.644-1.962-1.439-1.962s-1.439,0.879-1.439,1.962S14.313,11.603,15.108,11.603z"
      ></path>
    </svg>
  );
}

function AddIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="30"
      preserveAspectRatio="xMidYMid meet"
      shapeRendering="crispEdges"
    >
      <title>plus</title>
      <path fill="currentColor" d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z"></path>
    </svg>
  );
}

function AudioIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      height="24"
      width="24"
      preserveAspectRatio="xMidYMid meet"
      version="1.1"
      x="0px"
      y="0px"
      enableBackground="new 0 0 24 24"
    >
      <title>ptt</title>
      <path
        fill="currentColor"
        d="M11.999,14.942c2.001,0,3.531-1.53,3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531 S8.469,2.35,8.469,4.35v7.061C8.469,13.412,9.999,14.942,11.999,14.942z M18.237,11.412c0,3.531-2.942,6.002-6.237,6.002 s-6.237-2.471-6.237-6.002H3.761c0,4.001,3.178,7.297,7.061,7.885v3.884h2.354v-3.884c3.884-0.588,7.061-3.884,7.061-7.885 L18.237,11.412z"
      ></path>
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      height="24"
      width="24"
      preserveAspectRatio="xMidYMid meet"
      version="1.1"
      x="0px"
      y="0px"
      enableBackground="new 0 0 24 24"
    >
      <title>send</title>
      <path
        fill="currentColor"
        d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"
      ></path>
    </svg>
  );
}

function ChatItem({ data }) {
  const { data: user } = useSession();
  const some = data.email == user.user.email;
  return (
    <div
      className={`text-white px-2 flex gap-2 ${
        some && "justify-start flex-row-reverse"
      }`}
    >
      <Image
        className={`rounded-full w-10 h-10 ${some && "hidden"}`}
        src={data.image}
        width={50}
        height={50}
        alt="logo"
      />
      <div
        className={`bg-[#202c33] p-2 px-3 rounded-xl w-[75%] flex flex-col gap-2`}
      >
        <div className="flex justify-between items-center">
          {!some && (
            <span className="text-sm cursor-pointer hover:underline text-blue-400">
              ~ {data.name}
            </span>
          )}
          <span className="text-xs text-gray-400">{data.datetime}</span>
        </div>
        <div>
          <p>{data.message}</p>
        </div>
      </div>
    </div>
  );
}

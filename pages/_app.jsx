import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import "tailwindcss/tailwind.css";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontSize: "1rem",
          },
          className: "bg-gray-600 text-white flex gap-2 items-center py-3 px-5 w-fit rounded-md border-gray-500 border",
        }} 
      />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

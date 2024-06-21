"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Products from "./component/Ecomm Layout/Products";
// import Posts from "./component/Posts";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);

  if (session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
          <p className="text-xl font-semibold mb-4">Signed in as {session.user.email}</p>
          {session.user.image && (
            <img
              src={session.user.image}
              alt={session.user.name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
          )}
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Sign out
          </button>
        </div>
        <div className="mt-8 w-full max-w-3xl">
        <Products userId={session.user.id}/>
          {/* <Posts userId={session.user.id} /> */}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-4">Welcome Back!</h1>
        <p className="mb-6">Please sign in to continue</p>
        <button
          onClick={() => signIn()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

"use client";
import { useState, FormEvent, ChangeEvent } from "react";

interface LoginData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login submitted:", loginData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-stone-800 p-6 shadow-md">
        <h1 className="text-3xl font-extrabold text-center text-white">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-stone-300"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-stone-700 border border-stone-600 text-white placeholder-stone-400 focus:outline-none focus:ring-white focus:border-white"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-stone-300"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-stone-700 border border-stone-600 text-white placeholder-stone-400 focus:outline-none focus:ring-white focus:border-white"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-white focus:ring-white border-stone-600 bg-stone-700"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-stone-300"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-white hover:text-stone-300"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-stone-900 bg-white hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

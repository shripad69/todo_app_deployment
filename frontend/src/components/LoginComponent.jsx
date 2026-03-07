// "use client"
import axios from "axios"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BASEURL } from "../../config"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function updateUsername(e) {
    setUsername(e.target.value)
  }

  function updatePassword(e) {
    setPassword(e.target.value)
  }

  const sendInfo = async () => {
    setLoading(true)
    try {
      const responce = await axios.post(`${BASEURL}/signin`, {
        username: username,
        password: password,
      })
      console.log(responce.data.userId)

      if (responce.data.message == "loggged in") {
        localStorage.setItem("userId", responce.data.userId)
        localStorage.setItem("token", responce.data.token)
        alert("you are logged in...")
        navigate("/home")
      } else if (responce.data.message == "invalid credentials") {
        alert("invalid credentials")
      } else if (responce.data.message == "internal server error") {
        alert("internal server error")
      } else {
        alert("Enter all the details")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl"></div>

      <div className="animate-fade-in max-w-md w-full mx-4">
        <div className="glass-card rounded-2xl p-8 shadow-2xl">
          {/* Logo / Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-bg shadow-lg mb-4">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">Welcome back</h2>
            <p className="text-gray-500">Sign in to continue to TaskFlow</p>
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  onChange={updateUsername}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  onChange={updatePassword}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            <button
              onClick={sendInfo}
              disabled={loading}
              className="w-full gradient-bg text-white py-3.5 px-4 rounded-xl font-semibold hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg shadow-indigo-500/25"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="text-center pt-2">
              <p className="text-gray-500">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors duration-200">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

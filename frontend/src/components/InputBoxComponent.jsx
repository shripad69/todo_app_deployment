"use client"

import axios from "axios"
import { BASEURL } from "../../config"

export default function InputBoxComponent({ title, setTitle, description, setDescription, fetchData, setFetchData }) {
  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleDescription = (e) => {
    setDescription(e.target.value)
  }

  const sendData = async () => {
    try {
      const tok = localStorage.getItem("token")
      console.log(tok)

      const response = await axios.post(
        `${BASEURL}/add-todo`,
        {
          title: title,
          description: description,
        },
        {
          headers: {
            token: tok,
          },
        },
      )

      if (response.data.message == "added-todo") {
        alert("todo added successfully")
        setTitle("")
        setDescription("")
        setFetchData(!fetchData)
      } else if (response.data.message == "token missing") {
        alert("invalid token, please login again")
      } else {
        alert("internal server error")
      }
    } catch (e) {
      alert("server busy")
    }

    setFetchData(!fetchData)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-md shadow-indigo-500/20">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Add New Task</h2>
          <p className="text-sm text-gray-500">Create a new task to stay organized</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="todo-title" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Title
          </label>
          <input
            id="todo-title"
            type="text"
            placeholder="What needs to be done?"
            onChange={handleTitle}
            value={title}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
          />
        </div>

        <div>
          <label htmlFor="todo-desc" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Description
          </label>
          <textarea
            id="todo-desc"
            placeholder="Add some details about this task..."
            value={description}
            onChange={handleDescription}
            rows={3}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 resize-none"
          />
        </div>

        <button
          onClick={sendData}
          className="w-full sm:w-auto gradient-bg text-white py-3 px-8 rounded-xl font-semibold hover:opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg shadow-indigo-500/25 inline-flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Task
        </button>
      </div>
    </div>
  )
}

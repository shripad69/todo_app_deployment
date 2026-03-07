import axios from "axios";
import InputBoxComponent from "../components/InputBoxComponent";
import TodoComponent from "../components/TodoComponent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../../config";

export default function Home() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [fetchData, setFetchData] = useState(false);
    const [todos, setTodos] = useState([]); 
    const navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            try {
                const tok = localStorage.getItem("token");
                const response = await axios.get(`${BASEURL}/get-todos`, {
                    headers: {
                        token: tok
                    }
                });
                console.log(response.data.data);
                setTodos(response.data.data);
            } catch (error) {
                console.error("Failed to fetch todos:", error);
            }
        }
        getData();
    }, [fetchData]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/");
    };

    return (
        <div className="min-h-screen gradient-bg-subtle">
            {/* Header / Navbar */}
            <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-md shadow-indigo-500/20">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                </svg>
                            </div>
                            <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700">
                                {todos.length} {todos.length === 1 ? "task" : "tasks"}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="animate-fade-in">
                    <InputBoxComponent
                        title={title}
                        setTitle={setTitle}
                        description={description}
                        setDescription={setDescription}
                        fetchData={fetchData}
                        setFetchData={setFetchData}
                    />
                </div>

                <div className="animate-slide-up mt-8">
                    <TodoComponent todos={todos} fetchData={fetchData} setFetchData={setFetchData} />
                </div>
            </main>
        </div>
    );
}

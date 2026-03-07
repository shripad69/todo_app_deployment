import axios from "axios";
import { BASEURL } from "../../config";

export default function TodoComponent({ todos, fetchData, setFetchData }) {

  const handleDelete = async (title, description) => {
    try {
      const tok = localStorage.getItem("token");
      await axios.delete(`${BASEURL}/delete-todo`, {
        headers: {
          token : tok
        },
        data: {
          title,
          description
        }
      });
      setFetchData(!fetchData);
      alert("Todo deleted successfully..");
    } catch (error) {
      alert("server busy");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Tasks</h2>
          <p className="text-sm text-gray-500 mt-1">
            {todos.length === 0
              ? "No tasks yet — add one above!"
              : `You have ${todos.length} ${todos.length === 1 ? "task" : "tasks"}`}
          </p>
        </div>
      </div>

      {todos.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <div className="animate-float inline-block mb-4">
            <svg className="w-16 h-16 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-400 mb-1">No tasks yet</h3>
          <p className="text-gray-400 text-sm">Add your first task to get started!</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {todos.map((todo, index) => (
            <div
              key={todo.id || index}
              className="todo-card-hover bg-white rounded-2xl p-5 border border-gray-100 shadow-sm group"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full gradient-bg flex-shrink-0"></div>
                    <h3 className="text-base font-semibold text-gray-900 truncate">{todo.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 pl-4">
                    {todo.description}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(todo.title, todo.description)}
                  className="flex-shrink-0 p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all duration-200"
                  title="Delete task"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

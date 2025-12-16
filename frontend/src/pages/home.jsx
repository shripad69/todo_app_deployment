import axios from "axios";
import InputBoxComponent from "../components/InputBoxComponent";
import TodoComponent from "../components/TodoComponent";
import { useEffect, useState } from "react";
import { BASEURL } from "../../config";

export default function Home() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [fetchData, setFetchData] = useState(false);
    const [todos, setTodos] = useState([]); 

    useEffect(() => {
        async function getData() {
            const tok = localStorage.getItem("token");
            const response = await axios.get(`${BASEURL}/get-todos`, {
                headers: {
                    token: tok
                }
            });
            console.log(response.data.data);
            setTodos(response.data.data);
        }
        getData();
    }, [fetchData]);

    return (
        <div className="flex flex-col gap-[0px]">

            <InputBoxComponent
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                fetchData={fetchData}
                setFetchData={setFetchData}
            />

            <TodoComponent todos={todos} fetchData={fetchData} setFetchData={setFetchData} />
        </div>
    );
}

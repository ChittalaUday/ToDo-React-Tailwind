import { useState } from "react";
import "./App.css";
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import Draggable from "react-draggable";

export default function App() {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);

  const addTodo = () => {
    if (text === "") {
      return;
    }
    setData([
      ...data,
      {
        id: Date.now(),
        message: text,
        isMarked: false,
      },
    ]);
  };

  const markTodo = (id) => {
    setData(
      data.map((d) => {
        return d.id === id ? { ...d, isMarked: !d.isMarked } : d;
      })
    );
  };

  const deleteTodo = (id) => {
    setData(data.filter((d) => d.id != id));
  };

  return (
    <>
      <div className="mx-auto flex flex-col min-w-70 max-w-sm gap-0.5 mt-10 p-4 rounded-md border-2 w-fit">
        <h1 className="font-medium mb-2 text-2xl">ToDo App</h1>
        <div className="flex gap-1">
          <input
            type="text"
            placeholder="Enter your text here..."
            onChange={(e) => setText(e.target.value)}
            className="border-2 rounded-md max-h-full ps-1"
            required
          />
          <button
            className="bg-sky-500 hover:bg-sky-600 p-1.5 rounded-md text-white border-black border-2"
            onClick={addTodo}
          >
            Add
          </button>
        </div>
      </div>
      <div className="border-2 mx-auto mt-4 min-w-70 w-fit rounded-md p-4">
        <h1 className="font-medium pb-2 flex justify-center mb-2 text-xl">
          Your ToDo List
        </h1>
        <hr></hr>
        {/* <span className="w-full border-2 "></span> */}
        <ol className="list-decimal p-3">
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className="flex justify-between items-center gap-2 "
              >
                <li
                  key={index}
                  className={`${item.isMarked ? "line-through" : "none"} p-1 `}
                >
                  {item.message}
                </li>

                <div className="flex gap-2">
                  <button
                    className="border-2 rounded-sm "
                    onClick={() => markTodo(item.id)}
                    title=""
                  >
                    {!item.isMarked ? (
                      <FaCheck color="green" />
                    ) : (
                      <IoMdClose color="red" />
                    )}
                  </button>

                  <button
                    className="border-2 rounded-sm bg-red-600"
                    onClick={() => deleteTodo(item.id)}
                  >
                    <MdOutlineDelete color="white" />
                  </button>
                </div>
              </div>
            );
          })}
        </ol>
      </div>
      <Draggable>
        <div
          style={{
            border: "1px solid black",
            padding: "20px",
            backgroundColor: "lightgray",
            cursor: "grab",
          }}
        >
          Drag me around!
        </div>
      </Draggable>
    </>
  );
}

"use client"; // Assume this is a custom directive for the client-side

import { useState } from "react";
import { format } from "date-fns"; // Importing date formatting function from date-fns library
import { FaPlus } from "react-icons/fa"; // Importing Plus icon from react-icons/fa
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable
} from "react-beautiful-dnd"; // Importing drag and drop components from react-beautiful-dnd library

// Define interface for TodoItem
interface TodoItem {
  id: string;
  content: string;
}

// Define the Home component
export default function Home() {
  const [todo, setTodo] = useState<TodoItem[]>([]); // State for todo list
  const [newTodo, setNewTodo] = useState(""); // State for new todo item

  // Generate a random number
  const getRandomNumber = () => {
    return Math.floor(Math.random() * 9999);
  };

  // Handler for key up event (e.g., Enter key)
  const handleKeyUp = (key: string) => {
    if (key === "Enter" && newTodo) {
      const randomNumber = getRandomNumber();

      // Create a new todo item
      const newItem = {
        id: `item-${randomNumber}`,
        content: newTodo
      };

      // Add the new todo item to the todo list
      setTodo(todo.concat(newItem));

      // Clear the input field
      setNewTodo("");
    }
  };

  // Handler for deleting a todo item
  const handleDelete = (id: number) => {
    if (id > -1) {
      // Remove the todo item with the given index from the list
      setTodo(todo.slice(0, id).concat(todo.slice(id + 1)));
    }
  };

  // Function to reorder todo items
  const reorder = (
    list: TodoItem[],
    startIndex: number,
    endIndex: number
  ): TodoItem[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  // Handler for drag end event
  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    // Reorder the todo items
    const items: TodoItem[] = reorder(todo, source.index, destination.index);

    // Update the todo list with the reordered items
    setTodo(items);
  };

  // Render the Home component
  return (
    <div className="flex justify-center pt-40">
      <div className="max-w-sm w-full shadow-lg bg-white p-8 rounded-xl opacity-90">
        {/* Main Container */}
        <div className="flex justify-center cursor-default bg-gray-200 rounded-3xl px-4 py-1 color-gray hover:scale-110 transition-all">
          <img
            className="object-cover rounded-full w-16 h-16 m-2"
            src="https://avatars.githubusercontent.com/u/121833156?v=4"
            alt="adam-kowalczuk"
          />
          <div className="flex flex-col items-center w-full p-3">
            <p className="text-3xl text-gray-600">Todo List</p>
            <p className="text-sm">{format(new Date(), "MMMM d, yyyy")}</p>
          </div>
        </div>
        {/* New Todo Item */}
        <div className="relative mt-10">
          <div className="absolute inset-y-0 left-2 flex items-center pl-3 pointer-events-none">
            <FaPlus size={16} />
          </div>
          <input
            type="text"
            id="newTodo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyUp={(e) => handleKeyUp(e.key)}
            className="black w-full pl-10 p-2 border-4 rounded-full bg-gray-600 text-white"
            placeholder="new todo item"
          />
        </div>
        {/* Todo Item */}
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="droppable">
            {(droppableProvided) => (
              <div
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                <ul className="block w-full pt-6">
                  {/* Mapping through todo list and rendering each item */}
                  {todo?.map((item, index) => {
                    return (
                      <Draggable
                        draggableId={item.id}
                        key={item.id}
                        index={index}
                      >
                        {(draggableProvided) => (
                          <div
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                            ref={draggableProvided.innerRef}
                          >
                            <li
                              key={item.id}
                              className="w-full border-2 rounded-xl mt-2 hover:border-blue-300"
                            >
                              <input
                                id={index.toString()}
                                type="checkbox"
                                className="float-left block w-6 h-6 m-3"
                              />
                              <button
                                id={index.toString()}
                                onClick={() => handleDelete(index)}
                                className="float-right w-7 h-7 m-2.5 rounded-2xl bg-red-700 text-gray-200 shadow-md hover:bg-red-500 hover:scale-105"
                              >
                                x
                              </button>
                              <label
                                htmlFor={index.toString()}
                                className="block w-full p-3"
                              >
                                {item.content}
                              </label>
                            </li>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                </ul>
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

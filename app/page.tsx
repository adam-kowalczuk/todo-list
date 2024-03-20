import { format } from "date-fns";

export default function Home() {
  return (
    <div className="flex justify-center pt-40">
      <div className="max-w-sm w-full shadow-lg bg-white p-8 rounded-xl opacity-90">
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
      </div>
    </div>
  );
}

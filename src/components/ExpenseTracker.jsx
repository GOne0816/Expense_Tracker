import React, { useEffect, useRef, useState } from "react";

export default function ExpenseTracker() {
  let [names, setNames] = useState(localStorage.getItem("namesList")
  ? JSON.parse(localStorage.getItem("namesList"))
  : [],);
  let [price, setPrice] = useState(
    localStorage.getItem("prices")
      ? JSON.parse(localStorage.getItem("prices"))
      : [],
  );
  let [add, setAdd] = useState(localStorage.getItem("SpendStorage")
  ? JSON.parse(localStorage.getItem("SpendStorage"))
  : 0,);
  const Amount = useRef();
  const Items = useRef();

  const handleAmount = (e) => {
    e.preventDefault();
    const value = Amount.current.value;
    const naam = Items.current.value;
    const num = Number(value);
    setAdd((prev) => prev + num);
    setPrice((prev) => {
      return [...prev, value];
    });
    setNames((prev) => {
      return [...prev, naam];
    });
    Amount.current.value = "";
    Items.current.value = "";
  };
  useEffect(() => {
    localStorage.setItem("namesList", JSON.stringify(names));
    localStorage.setItem("prices", JSON.stringify(price));
    localStorage.setItem("SpendStorage", JSON.stringify(add));

  }, [names] [price], add);
  const handleReset = () => {
    localStorage.clear()
    window.location.reload()
  }
  return (
    <div className="flex h-dvh w-full items-center justify-center flex-col bg-gray-50">
      <div className="h-[550px] w-11/12 max-w-sm rounded-3xl px-10 py-12 shadow-2xl bg-white">
        <h1 className="text-center text-2xl font-bold">Expense Tracker</h1>
        <div>
          <h1 className="my-5 text-xl font-bold">Spend: {add} /-</h1>
          <form
            onSubmit={handleAmount}
            className="my-3 flex flex-col items-center justify-center gap-4"
          >
            <div className="flex w-full flex-col gap-5">
              <div className="flex flex-col">
                <label className="text-sm pb-1 font-bold" htmlFor="text">
                  Name:
                </label>
                <input
                  className="rounded-md px-2 py-1 shadow-inner ring-2 ring-gray-500 focus:outline-gray-800"
                  type="text"
                  name="text"
                  id="text"
                  required
                  ref={Items}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm pb-1 font-bold" htmlFor="number">
                  Amount:
                </label>
                <input
                  className="rounded-md px-2 py-1 shadow-inner ring-2 ring-gray-500 focus:outline-gray-800"
                  type="number"
                  name="number"
                  id="number"
                  required
                  ref={Amount}
                />
              </div>
            </div>
            <button type="submit" className="btn-AltDark w-full">
              Add
            </button>
          </form>
          <div className="no-scrollbar my-6 h-40 overflow-scroll">
            <h1 className="mx-2 text-xl font-bold">List:</h1>
            <div className="mx-6 flex justify-between underline">
              <div>
                {names.map((item) => (
                  <div>{item}</div>
                ))}
              </div>
              <div>
                {price.map((item) => (
                  <div>₹{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="btn-AltDark mt-10" onClick={handleReset}>Reset</button>
    </div>
  );
}

import React from "react";
import { useState, useCallback, useEffect, useRef } from "react";

function App() {

  let [password, setPassword] = useState('');
  let [length, setLength] = useState(6);
  let [chars, setChars] = useState(false);
  let [number, setNumber] = useState(false);
  let password_ref = useRef(null);

  let password_generator = useCallback(() => {
    let password = "";
    let alphabeticPassword = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let numbers = "1234567890";
    let specialChars = '!@#%&*()_+=-';
    if (chars) {
      alphabeticPassword = alphabeticPassword + specialChars;
    }
    if (number) {
      alphabeticPassword = alphabeticPassword + numbers;
    }
    let strLen = alphabeticPassword.length;
    let randomNumber = Number();
    console.log(randomNumber);
    for (let i = 0; i < length; i++) {
      randomNumber = Math.floor(Math.random() * strLen);
      password = alphabeticPassword[randomNumber] + password;
    }
    setPassword(password);

  },
    [setPassword, length, chars, number]);

  useEffect(() => {
    password_generator();
  },
    [length, chars, number, setPassword])

    let copyPassword = () => {
      password_ref.current?.select();
      password_ref.current?.setSelectionRange(0,length);
      window.navigator.clipboard.writeText(password);
    }
  return (
    <div className=" w-screen h-full flex flex-col items-center">
      <h1 className="text-center">Password Generator</h1>
      <div className="w-1/3">
        <input className="w-2/3 h-full rounded-l-xl text-center"
          placeholder="Your Password"
          readOnly
          ref={password_ref}
          value={password}
        />
        <button className="w-1/3 rounded-l-none"
          onClick={copyPassword}
        >
          Copy
        </button>
      </div>

      <div className="flex flex-row gap-2 mt-2">
        <div className="flex flex-col">
          <input
            className="w-28"
            id="length"
            type="range"
            min="5" max="60"
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label htmlFor="length">Length: {length}</label>
        </div>
        <div className="flex flex-col">
          <input
            id="chars"
            type="checkbox"
            value={chars}
            onChange={() => {
              setChars((prevChar => !prevChar))
            }}
          />
          <label htmlFor="chars">Characters</label>
        </div>
        <div className="flex flex-col">
          <input
            id="num"
            type="checkbox"
            value={number}
            onChange={() => {
              setNumber((prevValue => !prevValue))
            }}
          />
          <label htmlFor="num">Numbers</label>
        </div>
      </div>
    </div>
  )
}

export default App;
import './App.css'
import {useEffect, useState, useRef} from "react";
import {useCallback} from 'react';


// when we have to take reference of a thing then we use useRef hook
function App() {
  let [length, setLength] = useState(8); // for length of pass
  let [useNums, setUseNum] = useState(false);// if to use nums or not
  let [useChars, setUseChars] = useState(false);// it to use chars or not
  let [password, setPassword] = useState('');

  //below is the function to generate password
  //in this we will be using (callBack) hook as below
  // in useCallback we pass a function and some dependencies with it, which are
  // in array

    let password_ref = useRef(null);
    // a reference of the password
    // you can pass this reference variable to any input


    // in the below we have used reference only to give user a good
    // experience else the password would have also been copied without that
    let copy_pass = useCallback(() => {
        password_ref.current?.select(); // this will select the password
            // when the copy button is being clicked
        password_ref.current?.setSelectionRange(0,length) // this will
            // select the password or the field within the given range
        window.navigator.clipboard.writeText(password);
        },
        [password]);
    // in this we have given dependency only password as we will only copy
    // when there is a password change.

  let password_generator = useCallback(function (){
    let password = '';
    let str =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (useNums)
    {
      str += '0123456789';
    }
    if (useChars)
    {
      str += "!@#$%^&*()_{}[]`~";
    }

    for (let i = 0; i < length; i++){
      let char = Math.floor(Math.random() * str.length + 1);
      password = password + str.charAt(char);
    }
    setPassword(password);
  },
  [length, useNums, useChars, setPassword])
  //in the above we have used useCallBack as a hook, and it's syntax ia as above
  //
  //we have function in it, and some dependencies in an array
    // we only take those dependencies which we will be using or will have a
    // change in them in the useCallBack
    // now we will use one more hook that is useEffect,it is below:
    useEffect(() => {
        password_generator();
    }, [length, useChars, useChars, password_generator]);
  // useEffect will run the function once and then everytime when the
    // dependencies change.


  return (
    <div className='w-full shadow-md rounded-lg'>
      <h1 className='text-3xl text-green-950 bg-purple-500 p-3 rounded-2xl'>
        Password Generator in react
      </h1>
      <div className='text-center flex justify-center align-baseline'>
        <input
        type='text' value={password}
        readOnly ref={password_ref}
        className=' text-center w-full shadow-md rounded-bl-xl
         rounded-tl-xl mt-4 h-10'
        placeholder='Password'
        />
        <button
            onClick={copy_pass}
            className='bg-purple-500 text-white flex h-10 mt-4 rounded-br-xl
        rounded-tr-xl rounded-bl-none rounded-tl-none justify-center
        align-middle py-1'>
          copy
        </button>
      </div>
      <div className='flex justify-center gap-2'>
        <input id='range'
               type='range' min={6} max={100} value={length}
               onChange={(e) => {
                 setLength(e.target.value)
               }}/>
        {/*onchange is an event attribute used in HTML. It triggers JavaScript code
        whenever the value of a specific element changes. */}
        <label htmlFor='range'>
          length: {length}
        </label>

        <input id='nums'
               type='checkbox' defaultChecked={useNums}
               onChange={() => {
                 // console.log(useNums);
                 setUseNum((prev) => !prev)
                 // in the above's arguments we have the previous value, and
                 // we can manipulate it as we like
                 // console.log(useNums);
               }}
        />
        <label htmlFor='nums'>Numbers</label>

        <input id='chars'
               type='checkbox' defaultChecked={useChars}
               onChange={() => {
                 // console.log(useNums);
                 setUseChars((prev => !prev))
                 // the above can also be written as :
                 // setUseNum(!useNums);
                 // console.log(useNums);
               }}
        />
        <label htmlFor='chars'>Characters</label>
      </div>
    </div>
  )
}

export default App

//hello this is to test the indentation of the ide so that it does not
// extend the width of the application and yes l;ooks like it is working
// pretty good
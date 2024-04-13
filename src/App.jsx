import { useState, useCallback,useEffect,useRef } from 'react'
function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("");
  // useRef hook
  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str  = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()-_=+[{]}\|:',<>/?"
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed,setPassword])

  const copyPassword = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllowed, charAllowed,passwordGenerator])
  return (
    <>
      <div className='w-full fixed top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[100%] max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
        <h1 className='
    text-center my-6 text-3xl text-white
    '>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={password}
            className='outline-none w-full px-3 py-1'
            placeholder='Password'
            readOnly
            ref = {passwordRef}
            />
            <button
            onClick={copyPassword} 
            className='outline-none bg-blue-700 text-white px-6 py-0.5 shrink-0'>Copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
             type="range"
             min={6}
             max={20}
             value={length} 
             className='cursor-pointer'
             onChange={(e)=>{setLength(e.target.value)}}/>
             <label htmlFor="">Length : {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
          <input
             type="checkbox"
             defaultChecked={numberAllowed}
             id = "numberInput"
             onChange={()=>{
              setNumberAllowed((prev)=>!prev)
             }}/>
             <label htmlFor="">Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
             <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id='characterInput'
              onChange={()=>{
                setCharAllowed((prev)=>!prev);
              }} />
              <label htmlFor="CharacterInput">Character</label>
          </div>
        </div>
      </div>
    </>
  )
}
export default App


import { useState, useCallback , useEffect, useRef} from 'react'


function App() {
  const [length, setLength] = useState(8);

  const [num, setNum] = useState(false);

  const [char, setChar] = useState(false);

  const [password, setPassword]= useState();


  // ref hook
  const passwordref = useRef();
  const passwordgenrator = useCallback(() => {
    let pass = " ";
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if(num)  str += "0123456789";
       
    if(char)  str += "!@#$%^&*()_-+=";

    for(let i = 1; i <= length; i++){
       let word = Math.floor(Math.random()*str.length + 1);
          
       pass += str.charAt(word);

    }
    setPassword(pass);

  }, [length, num , char, setPassword])

useEffect(() => { passwordgenrator()

},[length, num , char, passwordgenrator ])


// to copy the password 
const copyPasswordToclipboard = useCallback(() =>{
 passwordref.current?.select();
  window.navigator.clipboard.writeText(password);
},[password])


  return (
      <>
    <div className='w-full max-w-md mx-auto p-6 shadow-md rounded-lg bg-gray-600'>
  <h2 className='text-center mb-4 text-2xl font-semibold text-white'>Password Generator</h2>
  <div className='w-full flex rounded-lg overflow-hidden mb-4 bg-gray-500'>
    <input 
      type='text'
      value={password}
      className='outline-none w-full py-2 px-3 bg-gray-400 text-gray-900'
      placeholder='Generated password'
      readOnly
    />
    <button className='outline-none bg-blue-600 hover:bg-blue-500 text-white px-4 py-2'>
      Copy
    </button>
  </div>
  <div className='flex flex-col sm:flex-row text-sm gap-y-4 sm:gap-y-0 sm:gap-x-4'>
    <div className='flex items-center gap-x-2'>
      <input
        type="range"
        min={1}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e) => {setLength(e.target.value)}}
      />
      <label className='text-white'>Length: {length}</label>
    </div>
    <div className='flex items-center gap-x-2'>
      <input                
        type="checkbox" 
        checked={num}
        onChange={() => { setNum(prev => !prev); }}
      />
      <label className='text-white'>Include Numbers</label>
    </div>
    <div className='flex items-center gap-x-2'>
      <input                
        type="checkbox" 
        checked={char}
        onChange={() => { setChar(prev => !prev); }}
      />
      <label className='text-white'>Include Symbols</label>
    </div>
  </div>
</div>

    </>
  )
}

export default App

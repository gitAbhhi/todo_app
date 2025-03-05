import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
// import { FaEdit } from "react-icons/fa";
// import { AiFillDelete } from "react-icons/ai";

function App() {
  const [task,settask]=useState("")
  const [todos,setTodos]=useState([])
  const [showfinished, setshowfinished]=useState(true)

useEffect(()=>{
  let todoString=localStorage.getItem("todos")
  if(todoString){
    let todos=JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
  }
},[])

const saveTols=()=>{
  localStorage.setItem("todos",JSON.stringify(todos))
}
const togglefinished=()=>{
  setshowfinished(!showfinished)
}
  const handleedit=()=>{
    let t=todos.filter(i=>i.id===id)
    settask(t[0].task)
    let newTodos=todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveTols()
  }

  const handledelete=(e,id)=>{
    let newTodos=todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveTols()
  }

  const handleadd=()=>{
    setTodos([...todos,{id:uuidv4(), task,isCompleted:false}])
    settask("")
    saveTols()
  }
  const handlechange=(e)=>{
    settask(e.target.value)
  }

 const handlecheckbox = (e) => {
    let id=e.target.name;
    let index=todos.findIndex(item=>{
      return item.id===id;
    })
    let newTodos=[...todos];
    newTodos[index].isCompleted=!newTodos[index].isCompleted;
    setTodos(newTodos)
    saveTols()
  }
  

  return (
    <>
      <Navbar />
      <div className="container m-auto md:w-[70%]  my-5 rounded-3xl p-5 bg-violet-100">
        <h1 className='text-3xl font-bold text-center mb-4 bg-violet-500 rounded-full text-white p-4'>iTask- Manage your todos at one place</h1>
        <div>
          <div className='text-2xl font-bold'>Add a Todo</div>
          <input onChange={handlechange} value={task} className='w-[85%] h-11 my-3 rounded-full p-3' type="text" placeholder='Write your task' />
          <button onClick={handleadd} disabled={task.length<=3} className='bg-violet-700 text-white text-xl font-bold rounded-full w-[10%] h-11 m-3 items-center'>Save</button>
          <div>
            <input type="checkbox"onChange={togglefinished} name="show finished" id="show" /><span className='mx-2 text-base text-gray-500'>Show finished</span>
          </div> 
        </div>
        <div className='h-[1px] w[100%] m-3 bg-violet-950 '></div>
        <h1 className='text-xl font-bold'>Your Todos</h1>
        <div className="todos">
          
          {todos.length ===0 && <div>NO Todos to display</div>  }
          {todos.map(item=>{
          return (showfinished|| !item.isCompleted)&& <div key={item.id} className="{task flex items-center w-1/4 justify-between my-3}">
            <div className="flex gap-5">
            <input name={item.id} onChange={handlecheckbox} type="checkbox" checked={item.isCompleted} id="" />
            <div className={item.isCompleted?"line-through":""}>{item.task}</div>
            </div>
            <div className="buttons flex h-full justify-end w-full md:">
            <button onClick={(e)=>handleedit(e,item.id)} class='bg-violet-700 text-white text-sm font-bold rounded-xl p-2 h-11 ml-12 my-2 items-center'>Edit</button>
            <button onClick={(e)=>handledelete(e,item.id)} class='bg-violet-700 text-white text-sm font-bold rounded-xl  p-2 h-11 items-center my-2 mx-1'>Delete</button>
            </div>
          </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App

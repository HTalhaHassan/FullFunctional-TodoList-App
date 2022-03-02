import React,{useState,useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Todos from './components/Todos';
import './App.css';


const getdata=()=>{
  let list=localStorage.getItem('list');
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }else{
    return [];
  }
}


function App() {

  const [inputdata,setinputdata]=useState('');
  const [items,setitems]=useState(getdata());
  const [togglebtn,settogglebtn]=useState(true);
  const [isedititem,setisedititem]=useState(null);


  useEffect(()=>{
    localStorage.setItem('list',JSON.stringify(items));
  },[items])


  const additem=()=>{
    if(!inputdata){
      toast.warn("Please Add Item", {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored"
        });
    }
    else if(inputdata && !togglebtn)
    {
      setitems(
        items.map((elem)=>{
          if(elem.id===isedititem)
            {
              return {...elem,data:inputdata}
            }
          return elem;  
        })
      )
      settogglebtn(true);
      setinputdata('');
      setisedititem(null);
    }
    else
    {
      const alldata={id:new Date().getTime().toString() ,data:inputdata}
      setitems([...items,alldata]);
      setinputdata('');
    }
  }


  const keypressed=(event)=>{
    if(event.keyCode===13){
      additem();
    }
  }


  const edititem=(id)=>{
    let edititem=items.find((elem)=>{
      return elem.id===id;
    })
    settogglebtn(false);
    setinputdata(edititem.data);
    setisedititem(id);
  }


  const deleteitem=(pos)=>{
    const newitems=items.filter((elem)=>{
        return elem.id!==pos;
    })
    setitems(newitems);
  }


  const removeall=()=>{
    setitems([]);
  }


  return (
    <>
      <div className='main-div'>
       <Todos 
        removeall={removeall}
        deleteitem={deleteitem}
        edititem={edititem}
        keypressed={keypressed}
        additem={additem}
        inputdata={inputdata}
        setinputdata={setinputdata}
        items={items}
        togglebtn={togglebtn}
       />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;

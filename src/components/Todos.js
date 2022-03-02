import React from 'react'
import { MdDelete , MdAdd } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';

const Todos = ({removeall,deleteitem,edititem,additem,keypressed,inputdata,setinputdata,items,togglebtn}) => {
  return (

    <div className='child-div'>
        <figure>
        <img src="./todo.svg"/>
        <figcaption>Add Your List Here</figcaption>
        </figure>


        <div className='additems'>
        <input type="text" placeholder="Add Item..." 
            value={inputdata}
            onChange={(e)=> setinputdata(e.target.value)}
            onKeyDown={keypressed}
        />
        {
            togglebtn ? <MdAdd className='add-btn' onClick={additem} title='Add Item'/>
            : <BiEdit className='edit-btn' onClick={additem} title='Edit Item'/>
        }
        </div>


        <div className='showitems'>
        { 
            items.length ?
            items.map((elem)=>{
            return(
                <div className='eachitem' key={elem.id}>
                <h3>{elem.data}</h3>
                <div className='todo-btn'>
                    <BiEdit className='edit-btn' title='Edit Item' onClick={()=>edititem(elem.id)}/>
                    <MdDelete className='delete-btn' title='Delete Item' onClick={()=>deleteitem(elem.id)}/>
                </div>
                </div>
            )
            })
            :
            <p className='notask'>No Task Added Yet</p>
        }
        </div>


        <div className='showitems'>
        <button className='btn' onClick={removeall}>Remove All</button>
        </div>

  </div>
  )
}

export default Todos
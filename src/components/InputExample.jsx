import React from 'react';
import { useState } from 'react';

 function InputExample() {

 const [name, setName] = useState(" ")
 const [surname, setSurname] = useState (" ")
 const [fullName, setFullName] = useState([])
 const onChangeName = (event) => setName(event.target.value)
 const onChangeSurname = (event) => setSurname(event.target.value)

 function addName (){
        const newFullName = name + ' ' + surname;
        setFullName([...fullName, newFullName])

        setName('')
        setSurname('')
    
    

 }

  return (
    <>
    <div>
        Name  <br />
        <input type="text" value={name} onChange={onChangeName} />
       <br />

        Surname <br />
        <input type="text" value={surname} onChange={onChangeSurname} />
       <br />
       <br />
       <br />

       <button 
       onClick={addName}
       >
        add
       </button>

        <div>
            {
                fullName.map((item, index) =>(
                    <div key={index}>{item}</div>
                ))
            }
        </div>

       

    
    </div>
    </>
    
  )
} 


export default InputExample
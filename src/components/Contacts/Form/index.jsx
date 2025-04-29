import React from 'react'
import { useState } from 'react'
import style from "./style.module.scss";

function Form({ addContacts, contacts }) {
  const [form, setForm] = useState({fullname:"", phone_number:""});
  const onChangeInput = (e) =>{
    setForm({...form,[e.target.name]:e.target.value})
  };
  const onSubmit = (e)=> {
    e.preventDefault();
    if(form.fullname === "" || form.phone_number === ""){
      return false;
    };

    addContacts([...contacts, form]);
    setForm({fullname:"", phone_number:""})
  }
  return (
    <form onSubmit={onSubmit} className={style.form_container}>
    <div>
     <input name='fullname' placeholder='Full Name' onChange={onChangeInput} value={form.fullname} />
    </div>
    <div>
     <input name='phone_number' type='number' placeholder='Phone Number' onChange={onChangeInput} value={form.phone_number}/>
    </div>
    <div>
      <button>Add</button>
    </div>
    
    </form>
  )
}

export default Form
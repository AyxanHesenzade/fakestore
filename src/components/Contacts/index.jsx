import React from 'react'
import List from './List/index.jsx'
import Form from './Form/index.jsx'
import { useState } from 'react'
import { useEffect } from 'react'
import "@/components/Contacts/style.css"

function Contact() {
  const [contacts, setContacts] = useState([
    { fullname: "Elvin Məmmədov", phone_number: "0501234567" },
    { fullname: "Aytac Əliyeva", phone_number: "0557654321" },
    { fullname: "Kənan Quliyev", phone_number: "0709876543" }
  ]);
  
  useEffect(()=>{
    console.log(contacts)
  },[contacts])
  return (
    <>
    <div id='container'>
      <h3>Contact</h3>
    <List  contacts={contacts} />
    <Form addContacts = {setContacts} contacts={contacts}/>
    </div>



    </>
    
  )
}

export default Contact
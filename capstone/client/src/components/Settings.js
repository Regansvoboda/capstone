import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles/Settings.css"

function Settings({user, onAcctDelete}) {



  const navigate = useNavigate()
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');



  const handleDelete = () =>{

    fetch('/users', {
      method: 'DELETE',
    })
    .then((r) => {
      if (r.ok){
        navigate('/')
        onAcctDelete('none')
      }
      r.json().then((d) => console.log(d))
    })

  }
  console.log(user)
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    if(currentPassword === '' || newPassword === '')
    {
      formData.append('currentPassword', 'null')
      formData.append('newPassword', 'null')
    } else{
      formData.append('currentPassword', currentPassword)
      formData.append('newPassword', newPassword)
    }
    formData.append('email', email)


    try {
      await fetch('/update-profile', {
        method: 'PATCH',
        body: formData,
      });
    } catch (error) {
      console.error('Error occurred during image upload:', error);
    }
    setCurrentPassword('')
    setNewPassword('')
  };

  console.log(currentPassword)

  const handleNewPChange = (event) => {
    console.log(event.target.value)
    setNewPassword((bio) => event.target.value)
  }

  const handleCurrentPChange = (event) => {
    console.log(event.target.value)
    setCurrentPassword((bio) => event.target.value)
  }

  const handleEmailChange = (event) => {
    console.log(event.target.value)
    setEmail((email) => event.target.value)
  }



  return (
    <div class="upload-container">
      <h4>Current Password:</h4>
      <input onChange={handleCurrentPChange} type="password" value={currentPassword} autocomplete="new-password" readonly 
onfocus="this.removeAttribute('readonly');" />
      <h4>New Password:</h4>
      <input onChange={handleNewPChange} type="password" value={newPassword} autocomplete="new-password" readonly 
onfocus="this.removeAttribute('readonly');" />
      <h4>Email:</h4>
      <input onChange={handleEmailChange} type="text" value={email} />
      <button onClick={handleSubmit}>Update</button>
      <button onClick={handleDelete} className='delete-btn'>Delete Account</button>
    </div>
  );
}
export default Settings;
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import GenericForm from './GenericForm'

function App() {
  const formFields = [
    {
      label: "Email Address",
      type: "email",
      placeholder: "Enter email",
      required: true,
      text: "This is a description"
    },
    {
      label: "This is a text field",
      placeholder: "Enter text",
      text: "Description of the field"
    },
    {
      label: "Password",
      type: "password",
      placeholder: "Enter password",
      required: true
    }
  ]
  return (
    <div className="App">
      <GenericForm fields={formFields}></GenericForm>
    </div>
  );
}

export default App;

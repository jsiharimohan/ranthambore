import React, { useState } from 'react'

export default function RoomFacility() {
const [formValues, setFormValues] = useState([{ name: ""}]);
let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  }

let addFormFields = () => {
    setFormValues([...formValues, { name: ""}])
  }

let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues)
}

let handleSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(formValues));
}

  return (
    <>
    <h2 className='text-black text-2xl mb-2 mt-8'>Room facilities</h2>
    <form  onSubmit={handleSubmit}>
          {formValues.map((element, index) => (
            <div className="flex mb-3" key={index}>
              <input type="text" name="name" placeholder='Room Facility' value={element.name || ""} onChange={e => handleChange(index, e)} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
              {
                index ? 
                  <button type="button"  className="ml-3 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 remove" onClick={() => removeFormFields(index)}>Remove</button> 
                : null
              }
            </div>
          ))}
          <div className="button-section">
              <button className="text-white bg-success font-medium rounded px-5 py-2.5 text-center add" type="button" onClick={() => addFormFields()}>Add</button>
          </div>
      </form>
      </>
  )
}

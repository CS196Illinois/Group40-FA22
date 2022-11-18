import React, {useReducer} from 'react';
import './App.css';

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
}

function handleClick() {
  console.log("Button Click Works");
}

function App() {
  const [formData, setFormData] = useReducer(formReducer, {});

  const handleChange = event => {
    const check = event.target.type === 'checkbox';
    setFormData({
      name: event.target.name,
      value: event.target.value,
      value: check ? event.target.checked : event.target.value,
    });
  }

  return (
  <div>
  <div className="app-r-s-o">
  <span className="app-r-s-o-text">UIUC RSOs</span>
    <div className="app-r-s-o-logo">
        <img
          src="https://thumbs.dreamstime.com/b/earth-globe-line-icon-desktop-isolated-outline-vector-sign-linear-style-pictogram-white-symbol-logo-illustration-131982236.jpg"
          alt="Vector1736"
          className="app-r-s-o-vector"
        />
    </div>
    <div className="app-r-s-o-header">
      <span className="app-r-s-o-text1">
      <button class = "button button1" onClick={handleClick}>Home</button>
      </span>
      <span className="app-r-s-o-text3">
      <button class = "button button2" onClick={handleClick}>RSOs</button>
      </span>
      <span className="app-r-s-o-text5">
      <button class = "button button3" onClick={handleClick}>About</button>
      </span>
    </div>
      <div>
      <span className="app-r-s-o-form"></span>
       <span>You are submitting the following:
        <ul>
          {Object.entries(formData).map(([name, value]) => (
           <li key={name}><strong>{name}</strong>:{value.toString()}</li>
          ))}
        </ul>
        </span>
      </div>
    <form>
      <fieldset>
        <label>
          <p>Name</p>
          <input name="name" style = {{width: "400px"}} onChange={handleChange}/>
        </label>
        <label>
          <p>Description</p>
          <input description = "description" style = {{width: "1000px"}} onChange={handleChange}/>
        </label>
        <label>
           <p>Time Commitment</p>
           <select name="time" onChange={handleChange}>
               <option value="">--Please choose an option--</option>
               <option value="extra">Requires time outside of meetings</option>
               <option value="normal">Show up to every meeting</option>
               <option value="less">Show up whenever you want</option>
           </select>
         </label>
         <label>
           <p>Size</p>
           <select name="size" onChange={handleChange}>
               <option value="">--Please choose an option--</option>
               <option value="large">Large: More than 60 Members</option>
               <option value="medium">Medium: Between 30 and 60 Members</option>
               <option value="small">Small: Less than 30 Members</option>
           </select>
         </label>
         <label>
            <p>Admission</p>
            <select name="admission" onChange={handleChange}>
               <option value="">--Please choose an option--</option>
               <option value="applied">By application/closed</option>
               <option value="paid">Paid membership</option>
               <option value="open">Open membership</option>
           </select>
         </label>
         <label>
           <p>Sports & Fitness</p>
           <input type="checkbox" name="sports" onChange={handleChange} />
         </label>
         <label>
           <p>Academic & Professional</p>
           <input type="checkbox" name="academic" onChange={handleChange} />
         </label>
         <label>
           <p>Fine & Applied Arts</p>
           <input type="checkbox" name="arts" onChange={handleChange} />
         </label>
         <label>
           <p>Recreational & Social</p>
           <input type="checkbox" name="social" onChange={handleChange} />
         </label>
         <label>
           <p>Religious</p>
           <input type="checkbox" name="religion" onChange={handleChange} />
         </label>
         <label>
           <p>Cultural</p>
           <input type="checkbox" name="cultural" onChange={handleChange} />
         </label>
         <label>
           <p>Activism & Service</p>
           <input type="checkbox" name="service" onChange={handleChange} />
         </label>
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  </div>
</div>
  )
}
  
export default App

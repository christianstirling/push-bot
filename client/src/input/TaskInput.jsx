import { useState } from "react";
import "./TaskInput.css";

export default function TaskInput() {
  const [form, setForm] = useState({
    force: "",
    vertical: "",
    distance_horizontal: "",
    frequency: "",
  });

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    //send to api here
    console.log(form);
  }

  return (
    <div className="TaskInput">
      <form onSubmit={handleSubmit} className="input-form">
        <fieldset className="input-list">
          <legend className="input-legend">Task Input</legend>
          <div className="input-item">
            Type of action being performed
            <label htmlFor="">
              <input
                type="radio"
                name="action"
                value={form.action}
                onChange={handleChange}
              />
              Push
            </label>
            <label htmlFor="">
              <input
                type="radio"
                name="action"
                value={form.action}
                onChange={handleChange}
              />
              Pull
            </label>
          </div>
          <label className="input-item">
            Force needed to move the object (in kg-force)
            <input
              type="number"
              name="force"
              value={form.force}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="" className="input-item">
            Vertical height of the hands (in meters)
            <input
              type="number"
              name="vertical"
              value={form.vertical}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="" className="input-item">
            Horizontal distance that the object is moved (in meters)
            <input
              type="number"
              name="distance_horizontal"
              value={form.distance_horizontal}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="" className="input-item">
            Frequency (number of times the task is performed per minute)
            <input
              type="number"
              name="frequency"
              value={form.frequency}
              onChange={handleChange}
            />
          </label>
        </fieldset>

        <button type="submit" className="input-button">
          Submit
        </button>
      </form>
    </div>
  );
}

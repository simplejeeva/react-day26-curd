import React, { useRef, useState } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
function App() {
  const list = [
    {
      id: 1,
      rollno: 1,
      name: "jeeva",
      email: "jeeva@gmail.com",
      age: 21,
    },
    {
      id: 2,
      rollno: 2,
      name: "gokul",
      email: "gokul@gmail.com",
      age: 23,
    },
  ];
  const [lists, setList] = useState(list);
  const [updateState, setUpdateState] = useState(-1);
  return (
    <div>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="curd">
        <div>
          <Addlist setList={setList} />
          <form onSubmit={handleSubmit}>
            <table>
              {lists.map((current) =>
                updateState === current.id ? (
                  <Editlist current={current} lists={lists} setList={setList} />
                ) : (
                  <tr>
                    <td>{current.rollno}</td>
                    <td>{current.name}</td>
                    <td>{current.email}</td>
                    <td>{current.age}</td>

                    <td>
                      <button
                        className="edit"
                        onClick={() => handleEdit(current.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="delet"
                        type="button"
                        onClick={() => handleDelete(current.id)}
                      >
                        Delet
                      </button>
                    </td>
                  </tr>
                )
              )}
            </table>
          </form>
        </div>
      </div>
    </div>
  );
  function handleEdit(id) {
    setUpdateState(id);
  }
  function handleDelete(id) {
    const newlist = lists.filter((li) => li.id !== id);
    setList(newlist);
  }
  function handleSubmit(event) {
    event.preventDefault();
    const rollno = event.target.elements.rollno.value;
    const name = event.target.elements.name.value;
    const email = event.target.elements.email.value;
    const age = event.target.elements.age.value;

    const newlist = lists.map((li) =>
      li.id === updateState
        ? { ...li, name: name, email: email, age: age, rollno: rollno }
        : li
    );
    console.log();
    setList(newlist);
    setUpdateState(-1);
  }
}
function Editlist({ current, lists, setList }) {
  function handInputrollno(event) {
    const value = event.target.value;
    const newlist = lists.map((li) =>
      li.id === current.id ? { ...li, rollno: rollno } : li
    );
    setList(newlist);
  }
  function handInputname(event) {
    const value = event.target.value;
    const newlist = lists.map((li) =>
      li.id === current.id ? { ...li, name: value } : li
    );
    setList(newlist);
  }
  function handInputemail(event) {
    const value = event.target.value;
    const newlist = lists.map((li) =>
      li.id === current.id ? { ...li, email: value } : li
    );
    setList(newlist);
  }
  function handInputage(event) {
    const value = event.target.value;
    const newlist = lists.map((li) =>
      li.id === current.id ? { ...li, age: value } : li
    );
    setList(newlist);
  }
  return (
    <tr>
      <td>
        <input
          type="text"
          onChange={handInputrollno}
          name="rollno"
          value={current.rollno}
        />
      </td>
      <td>
        <input
          type="text"
          onChange={handInputname}
          name="name"
          value={current.name}
        />
      </td>
      <td>
        {" "}
        <input
          type="text"
          name="email"
          onChange={handInputemail}
          value={current.email}
        />
      </td>
      <td>
        {" "}
        <input
          type="text"
          name="age"
          onChange={handInputage}
          value={current.age}
        />
      </td>
      <td>
        {" "}
        <button type="submit">Update</button>
      </td>
    </tr>
  );
}
function Addlist({ setList }) {
  const rollnoRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const ageRef = useRef();
  function handleSubmit(event) {
    event.preventDefault();
    const rollno = event.target.elements.rollno.value;
    const name = event.target.elements.name.value;
    const email = event.target.elements.email.value;
    const age = event.target.elements.age.value;
    const newList = {
      id: 3,
      rollno,
      name,
      email,
      age,
    };
    setList((prevList) => {
      return prevList.concat(newList);
    });
    rollnoRef.current.value = "";
    nameRef.current.value = "";
    emailRef.current.value = "";
    ageRef.current.value = "";
  }
  return (
    <form className="addform" onSubmit={handleSubmit}>
      <TextField
        id="outlined-basic"
        label="Enter Rollno"
        variant="outlined"
        type="number"
        name="rollno"
        required
        ref={rollnoRef}
      />
      <TextField
        id="outlined-basic"
        label="Enter Name"
        variant="outlined"
        type="text"
        required
        name="name"
        ref={nameRef}
      />
      <TextField
        id="outlined-basic"
        label="Enter email"
        variant="outlined"
        type="text"
        required
        name="email"
        ref={emailRef}
      />
      <TextField
        id="outlined-basic"
        label="Enter age"
        variant="outlined"
        type="number"
        required="email"
        name="age"
        ref={ageRef}
      />
      <button type="submit">Add</button>
    </form>
  );
}
export default App;

function Navbar() {
  return <div>Student Form</div>;
}

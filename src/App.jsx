import React, { useRef, useState } from "react";
import "./App.css";
function App() {
  const list = [
    {
      id: 1,
      name: "jeeva",
      email: "jeeva@gmail.com",
    },
    {
      id: 2,
      name: "gokul",
      email: "gokul@gmail.com",
    },
  ];
  const [lists, setList] = useState(list);
  const [updateState, setUpdateState] = useState(-1);
  return (
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
                  <td>{current.name}</td>
                  <td>{current.email}</td>
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
    const name = event.target.elements.name.value;
    const email = event.target.elements.email.value;
    const newlist = lists.map((li) =>
      li.id === updateState ? { ...li, name: name, email: email } : li
    );
    setList(newlist);
    setUpdateState(-1);
  }
}
function Editlist({ current, lists, setList }) {
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
  return (
    <tr>
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
        <button type="submit">Update</button>
      </td>
    </tr>
  );
}
function Addlist({ setList }) {
  const nameRef = useRef();
  const emailRef = useRef();
  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const email = event.target.elements.email.value;
    const newList = {
      id: 3,
      name,
      email,
    };
    setList((prevList) => {
      return prevList.concat(newList);
    });
    nameRef.current.value = "";
    emailRef.current.value = "";
  }
  return (
    <form className="addform" onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Enter Name" ref={nameRef} />
      <input
        type="text"
        name="email"
        placeholder="Enter email"
        ref={emailRef}
      />
      <button type="submit">Add</button>
    </form>
  );
}
export default App;

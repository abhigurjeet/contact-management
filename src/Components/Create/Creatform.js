import { useState } from "react";
export default function Createform(props) {
  let [fname, setFname] = useState("");
  let [lname, setLname] = useState("");
  let [active, setActive] = useState(true);

  function onChangeName(event) {
    if (event.target.name === "fname") setFname(event.target.value);
    else setLname(event.target.value);
  }

  function handleSave(e) {
    if (active === true) {
      props.addItem(fname, lname, "active");
    } else {
      props.addItem(fname, lname, "inactive");
    }
    e.preventDefault();
  }

  return (
    <form className='shadow-[2px_2px_15px_teal]  w-1/2 h-80 m-auto '>
      <span>First Name </span>
      <input className='border-2 border-solid my-8  ml-6' type="text" name="fname" onChange={onChangeName} value={fname}  />
      <br />
      <span>Second Name </span>
      <input className='border-2 border-solid m-5' type="text" name="sname" onChange={onChangeName} value={lname}  />
      <br />
      <span className='mr-5'> Status </span>
      <input
        className='m-2 mt-6'
        type="checkbox"
        onChange={(e) => {
          setActive(e.target.checked);
        }}
        checked={active}
        name="active"
      />
      <span> Active</span>
      <input
        className='m-2'
        type="checkbox"
        onChange={(e) => {
          setActive(!e.target.checked);
        }}
        checked={!active}
        name="inactive"
      />
      <span> Inactive</span>
      <br />
      <button className='shadow-[2px_2px_15px_pink] border-2 border-solid w-24 m-12 p-2 hover:bg-black' type="submit" onClick={handleSave}>
        Save
      </button>
    </form>
  );
}

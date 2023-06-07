import { useState } from "react";
export default function Editcontact(props) {
  let [modifiedItem, setModifiedItem] = useState({
    first: props.item.first,
    last: props.item.last,
    status: props.item.status
  });
  let [active, setActive] = useState(
    props.item.status === "active" ? true : false
  );

  function handleName(e) {
    if (e.target.name === "fname")
      setModifiedItem((prev) => ({ ...prev, first: e.target.value }));
    else setModifiedItem((prev) => ({ ...prev, last: e.target.value }));
  }

  return (
    <>
      <h1 className='m-8 text-2xl'> Edit Page</h1>
      <form className='shadow-[2px_2px_15px_teal]  w-1/2 h-80 m-auto' >
        <span>First Name </span>
        <input
          className='border-2 border-solid my-12 ml-6'
          type="text"
          name="fname"
          onChange={handleName}
          value={modifiedItem.first}
        />
        <br />
        <span>Second Name </span>
        <input
          className='border-2 border-solid m-5'
          type="text"
          name="sname"
          onChange={handleName}
          value={modifiedItem.last}
        />
        <br />
        <span> Status : </span>
        <input
          className='m-2 mt-6'
          type="checkbox"
          name="active"
          onChange={(e) => {
            setActive(e.target.value);
            setModifiedItem((prev) => {
              if (e.target.value) return { ...prev, status: "active" };
              else return { ...prev, status: "inactive" };
            });
          }}
          checked={active}
        />
        <span> Active</span>
        <input
          className='m-2'
          type="checkbox"
          name="inactive"
          onChange={(e) => {
            setActive(!e.target.value);
            setModifiedItem((prev) => {
              if (!e.target.value) return { ...prev, status: "active" };
              else return { ...prev, status: "inactive" };
            });
          }}
          checked={!active}
        />
        <span> Inactive</span>
        <br />
        <button
          className='shadow-[2px_2px_15px_pink] border-2 border-solid w-24 m-8 p-2 hover:bg-black'
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            props.handleEditSave(props.item.ind, modifiedItem);
          }}
        >
          Save
        </button>
      </form>
    </>
  );
}

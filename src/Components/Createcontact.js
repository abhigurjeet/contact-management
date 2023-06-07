import { useState } from "react";
import Displayform from "./Create/Displayform";
import Createform from "./Create/Creatform";
import Editcontact from "./Create/Editcontact";
export default function Createcontact() {
  let [arrContacts, setArrContacts] = useState([]);
  let [createCheck, setCreateCheck] = useState(false);
  let [editContact, setEditCheck] = useState(false);
  let [editItem, setEditItem] = useState({});
  function addItem(fname, lname, status) {
    setArrContacts((prev) => {
      let obj1 = {
        first: fname,
        last: lname,
        status: status
      };
      setCreateCheck(false);
      return [...prev, obj1];
    });
  }
  function deleteCard(i) {
    setArrContacts((prev) => {
      prev.splice(i, 1);
      return [...prev];
    });
  }
  function changeEditStatus(i) {
    setEditItem({ ...arrContacts[i], ind: i });
    setEditCheck(true);
  }
  function handleEditSave(ind, item) {
    setArrContacts((prev) => {
      let temp = [...prev];
      temp[ind] = item;
      return temp;
    });
    setEditCheck(false);
  }
  return (
    <div className="text-center w-full mt-20 ml-32">
      {!editContact && (
        <button className='shadow-[2px_2px_15px_pink] border-2 border-solid w-60 m-12 p-4 hover:bg-black' onClick={() => setCreateCheck(true)}>Create New Contact</button>
      )}
      {createCheck ? (
        <Createform addItem={addItem} setCheck={setCreateCheck} />
      ) : editContact ? (
        <Editcontact item={editItem} handleEditSave={handleEditSave} />
      ) : (
        <Displayform
          arr={arrContacts}
          deleteCard={deleteCard}
          changeEditStatus={changeEditStatus}
        />
      )}
    </div>
  );
}

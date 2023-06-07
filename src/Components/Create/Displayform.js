import { AiOutlineDelete,AiOutlineEdit} from "react-icons/ai";
export default function Displayform(props) {
  let temp = props.arr;
  return (
    <div className="flex flex-wrap gap-30 justify-evenly">
      {temp.map((item, i) => (
        <div className="bg-gray-600 border-4 border-black shadow-[2px_2px_10px_white] mx-20 my-10 h-52 w-52" key={i}>
          <p className="bg-gray-600 m-6">Name: {item.first} {item.last}</p>
          <p className="bg-gray-600 ">Status: {item.status}</p>
          <button type="submit" onClick={() => props.changeEditStatus(i)}>
            <AiOutlineEdit className='m-8 h-8 w-8 bg-gray-600'/>
          </button>
          <button type="submit" onClick={() => props.deleteCard(i)}>
            <AiOutlineDelete className='m-8 h-8 w-8 bg-gray-600'/>
          </button>
        </div>
      ))}
      {!temp.length && <h1>No Contacts Found</h1>}
    </div>
  );
}

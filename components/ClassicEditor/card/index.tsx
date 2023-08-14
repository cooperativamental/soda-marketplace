import { FC } from "react";
import { TrashIcon } from "@heroicons/react/24/solid"
import { useIDL } from "@/context/IDL";

export const Card: FC<any> = ({ prop, item, onClick, index, setEdit }) => {
  const { IDL, setIDL } = useIDL()

  const deleteItem = () => {
    const del = IDL[prop].toSpliced(index, 1)
    if (confirm("Seguro que quiere eliminar?")) {
      return setIDL({
        ...IDL,
        [prop]: del
      })
    }

  }

  return (

    <div
      className="relative flex flex-col items-center justify-around h-[90%] border min-w-[10rem] w-40 rounded-lg border-border text-red-custom font-medium hover:bg-backg hover:text-green-custom hover:border-green-custom cursor-pointer"
      onClick={(e) => { setEdit({ item, index }) }}
    >
      <TrashIcon onClick={(e) => {
        e.stopPropagation()
        deleteItem()
      }} className="absolute z-20 text-border bottom-2 right-2 w-4 h-4 hover:text-yellow-custom" />
      <div className=" flex flex-col justify-around h-[80%] w-11/12">
        <p className="text-justify text-2xl break-words">{item.name}</p>
        <p className="overflow-y-auto mini-scrollbar">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi nulla, impedit repellendus optio corporis quam similique nostrum quasi porro odit praesentium obcaecati fugiat? Quos autem adipisci doloribus error dignissimos unde.
        </p>
      </div>
    </div>
  )
}
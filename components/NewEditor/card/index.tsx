import { FC, useEffect, useRef, useState } from "react";
import { ArrowRightIcon, TrashIcon } from "@heroicons/react/24/solid"
import { useIDL } from "@/context/IDL";

export const Card: FC<any> = ({ name, onClick, deleteItem, instruction, index, selected }) => {
  const { IDL, setIDL } = useIDL()
  const [showOptions, setShowOptions] = useState(false)
  const [newName, setNewName] = useState(name)
  const timeoutName = useRef<NodeJS.Timeout>()

  useEffect(() => {
    clearTimeout(timeoutName.current)

    timeoutName.current = setTimeout(() => {

      setIDL({
        ...IDL,
        [instruction]: IDL[instruction].map((inst: any, i: number) => {
          if (index === i) {
            return {
              ...inst,
              name: newName
            }
          }
          return inst
        })
      })
    }, 1000)
  }, [newName])

  return (

    <div
      className={`flex h-12 min-h-[3rem] items-center justify-between px-4 rounded-xl bg-inputs border border-border cursor-pointer ${selected ? "text-green-custom shadow-sm shadow-green-custom" : "text-yellow-custom"}`}
      onClick={onClick}
      onMouseOver={() => { setShowOptions(true) }}
      onMouseOut={() => { setShowOptions(false) }}
    >
      <input
        placeholder={name}
        value={newName}
        onChange={(e) => {
          setNewName(e.target.value)
        }}
        className=" w-full bg-inputs focus:outline-none"
      />
      {
        showOptions &&
        <div className="flex">
          <TrashIcon
            onClick={deleteItem}
            className="text-red w-4 h-4"
          />
        </div>
      }
      <ArrowRightIcon
        className={` ${selected ? "visible" : "invisible"} w-8 h-4 text-white`}
      />
    </div>
  )
};
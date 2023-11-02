import {
    Popover,
    PopoverHandler,
    PopoverContent,
  } from "@material-tailwind/react";
import { FC } from "react";
   
  export const PopoverComponent:FC<any> = ({ children, content }) => {
    return (
      <Popover placement="bottom-start">
        <PopoverHandler>
          { !!children && children}
        </PopoverHandler>
        <PopoverContent className="w-1/3 max-h-96 overflow-y-auto bg-border text-white">
            {
                !!content && content
            }
        </PopoverContent>
      </Popover>
    );
  }
import {
    Popover,
    PopoverHandler,
    PopoverContent,
  } from "@material-tailwind/react";
import { FC } from "react";
   
  export const PopoverComponent:FC<any> = ({ children, content }) => {
    return (
      <Popover placement="right-start">
        <PopoverHandler>
          { !!children && children}
        </PopoverHandler>
        <PopoverContent className="w-2/3 bg-border text-white">
            {
                !!content && content
            }
        </PopoverContent>
      </Popover>
    );
  }
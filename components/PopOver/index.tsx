import {
    Popover,
    PopoverHandler,
    PopoverContent,
  } from "@material-tailwind/react";
import { FC } from "react";
   
  export const PopoverComponent:FC<any> = ({ children, content }) => {
    return (
      <Popover placement="bottom">
        <PopoverHandler>
          { !!children && children}
        </PopoverHandler>
        <PopoverContent className="w-96 bg-border text-white">
            {
                !!content && content
            }
        </PopoverContent>
      </Popover>
    );
  }
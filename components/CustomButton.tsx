import { IconType } from "react-icons";
import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/tailwind";

type CustomButtonProps = {
    Text: string;
    disabled?: boolean; 
    Icon?: IconType | IconType[];
    IconStyle?: string;
    IconDivStyle?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>

export const buttonStyle = {
  cancel: "bg-red-400 hover:bg-red-500 dark:bg-red-500 dark:hover:bg-red-600"
}

const CustomButton = ({
  disabled = false, 
  Icon, 
  IconStyle = "", 
  Text, 
  className = "", 
  IconDivStyle = "",
  ...rest
}: CustomButtonProps) => {
 
 return <>
    <button 
    {...rest}
    disabled={disabled} 
    className={cn(`flex items-center text-center justify-center gap-2 lg:p-2 lg:px-3 p-2 px-4 rounded-lg font-medium
    hover:brightness-110 text-base md:text-lg lg:text-xl`,
    `${disabled && 'saturate-50 opacity-70'} ${className}`)}
    >
      { 
        Array.isArray(Icon) &&
          <div className={cn(`flex gap-[2px]`, IconDivStyle)}>
            { Icon.map((Icon, index) => <Icon key={index} className={`${IconStyle}`}/>) }
          </div>
      } 
      {
        typeof Icon === "function" && <Icon className={`${IconStyle}`}/>
      }
      {Text}
    </button>
  </>
}

export default CustomButton;
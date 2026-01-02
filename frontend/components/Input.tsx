import React from "react";

type Props = {
  placeholder: string;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>; 

export default function Input({ placeholder, type = "text", ...rest }: Props) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      {...rest} 
    />
  );
}

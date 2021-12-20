import { VFC, useState, ChangeEvent, ReactNode } from "react";

type Props = {
  type: string;
  name: string;
  children: ReactNode;
};

export const FloatingLabelInput: VFC<Props> = (props) => {
  const [active, setActive] = useState(false);

  return (
    <div className="relative border rounded">
      <input
        className="w-full p-2 transition-all duration-200 ease-in-out bg-transparent rounded outline-none"
        id={props.name}
        name={props.name}
        type={props.type}
        onChange={(e) => setActive(!!e.target.value)}
      />
      <label
        className={`absolute left-0 flex items-center text-opacity-50 text-gray-600 p-2 transition-all duration-200 ease-in-out ${
          active ? "-top-4 text-xs bg-white" : "top-0 text-sm"
        }`}
        htmlFor={props.name}
      >
        {props.children}
      </label>
    </div>
  );
};

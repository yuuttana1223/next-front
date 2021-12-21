import { VFC, useState } from "react";

type Props = {
  input: {
    type: string;
    name: string;
    placeholder: string;
  };
};

export const FloatingLabelInput: VFC<Props> = (props) => {
  const [active, setActive] = useState(false);

  return (
    <div className="relative border rounded">
      <input
        className="w-full p-2 transition-all duration-200 ease-in-out bg-transparent rounded outline-none"
        id={props.input.name}
        name={props.input.name}
        type={props.input.type}
        onChange={(e) => setActive(!!e.target.value)}
      />
      <label
        className={`absolute left-0 flex items-center text-opacity-50 text-gray-600 p-2 transition-all duration-200 ease-in-out ${
          active ? "-top-4 text-xs bg-white text-blue-700" : "top-0 text-sm"
        }`}
        htmlFor={props.input.name}
      >
        {props.input.placeholder}
      </label>
    </div>
  );
};

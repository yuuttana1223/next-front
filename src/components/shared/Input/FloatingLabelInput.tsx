import { VFC, useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

type Props = {
  type: string;
  name: string;
  value?: string;
  placeholder: string;
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
  };
};

export const FloatingLabelInput: VFC<Props> = (props) => {
  const [active, setActive] = useState(false);
  const { register, setValue } = useFormContext();

  useEffect(() => {
    if (props.value) {
      setValue(props.name, props.value);
      setActive(true);
    }
  }, [props.name, props.value, setValue]);

  return (
    <div className="mt-4">
      <div className="relative self-center border">
        <input
          {...register(props.name, props.validation)}
          className="p-2 w-full rounded outline-none"
          id={props.name}
          type={props.type}
          onChange={(e) => setActive(!!e.target.value)}
          autoComplete="on"
        />
        <label
          className={`absolute flex items-center text-opacity-50 text-gray-600 px-2 py-1 transition-all duration-200 ease-in-out ${
            active ? "-top-3 text-xs bg-white text-blue-700" : "top-2 text-sm"
          }`}
          htmlFor={props.name}
        >
          {props.placeholder}
        </label>
      </div>
    </div>
  );
};

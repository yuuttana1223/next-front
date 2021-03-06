import { VFC, useState, useEffect, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { EyeButton } from "src/components/shared/Button/EyeButton";

type Props = {
  type: "text" | "email" | "password";
  name: string;
  value?: string;
  placeholder: string;
  autocomplete: "on" | "username" | "new-password" | "current-password";
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
  };
};

export const FloatingLabelInput: VFC<Props> = (props) => {
  const { register, setValue, watch } = useFormContext();
  const [inputState, setInputState] = useState({
    isVisible: false,
    type: props.type,
  });

  const handleClick = useCallback(() => {
    setInputState((prevInputState) => ({
      ...prevInputState,
      isVisible: !prevInputState.isVisible,
      type: prevInputState.isVisible ? "password" : "text",
    }));
  }, []);

  useEffect(() => {
    setValue(props.name, props.value);
  }, [props.name, props.value, setValue]);

  return (
    <div className="mt-4">
      <div className="relative self-center border">
        <input
          {...register(props.name, props.validation)}
          className="relative z-10 p-2 w-full rounded outline-none"
          id={props.name}
          type={inputState.type}
          autoComplete={props.autocomplete}
        />
        <label
          className={`absolute z-20 flex items-center text-opacity-50 text-gray-600 px-2 py-1 transition-all duration-200 ease-in-out ${
            watch(props.name, props.value)
              ? "-top-3 text-xs bg-white text-blue-700"
              : "top-2 text-sm"
          }`}
          htmlFor={props.name}
        >
          {props.placeholder}
        </label>
        {props.type === "password" &&
          (inputState.isVisible ? (
            <EyeButton onClick={handleClick}>
              <HiOutlineEyeOff size="24px" />
            </EyeButton>
          ) : (
            <EyeButton onClick={handleClick}>
              <HiOutlineEye size="24px" />
            </EyeButton>
          ))}
      </div>
    </div>
  );
};

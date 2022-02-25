import { VFC, useState, useEffect, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { EyeButton } from "src/components/shared/Button/EyeButton";

type Props = {
  type: string;
  name: string;
  value?: string;
  placeholder: string;
  autocomplete: string;
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
  const [inputState, setInputState] = useState({
    isActive: false,
    isVisible: false,
    type: props.type,
  });

  const handleClick = useCallback(() => {
    setInputState((prevInputState) => {
      return {
        ...prevInputState,
        isVisible: !prevInputState.isVisible,
        type: prevInputState.isVisible ? "password" : "text",
      };
    });
  }, []);

  useEffect(() => {
    if (props.value) {
      setValue(props.name, props.value);
      setInputState((prevInputState) => {
        return {
          ...prevInputState,
          isActive: true,
        };
      });
    }
  }, [props.name, props.value, setValue]);

  return (
    <div className="mt-4">
      <div className="relative self-center border">
        <input
          {...register(props.name, props.validation)}
          className="p-2 w-full rounded outline-none"
          id={props.name}
          type={inputState.type}
          onChange={(e) => setActive(!!e.target.value)}
          autoComplete={props.autocomplete}
        />
        <label
          className={`absolute flex items-center text-opacity-50 text-gray-600 px-2 py-1 transition-all duration-200 ease-in-out ${
            active ? "-top-3 text-xs bg-white text-blue-700" : "top-2 text-sm"
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

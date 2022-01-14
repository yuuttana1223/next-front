import { VFC, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "src/components/Message/ErrorMessage";

type Props = {
  labelName: string;
  rows?: number;
  placeholder?: string;
  name: string;
  validation: {
    maxLength: number;
    required?: boolean;
  };
};

export const Textarea: VFC<Props> = (props) => {
  const { register } = useFormContext();
  const [count, setCount] = useState(0);

  return (
    <label className="block">
      <span className="font-semibold text-gray-700">{props.labelName}</span>(
      {count}/{props.validation?.maxLength})
      {count > props.validation.maxLength && (
        <ErrorMessage
          message={`${props.validation.maxLength}字以内で入力してください`}
        />
      )}
      <textarea
        className={`block w-full p-2 mt-1 border-2 outline-none ${
          count > props.validation.maxLength && "border-red-400"
        }`}
        rows={props.rows}
        required
        placeholder={props.placeholder}
        {...register(props.name, props.validation)}
        onChange={(e) => setCount(e.target.value.length)}
      ></textarea>
    </label>
  );
};

import { VFC, useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "src/components/Message/ErrorMessage";

type Props = {
  labelName: string;
  rows?: number;
  placeholder?: string;
  name: string;
  selected?: string;
  validation: {
    maxLength: number;
    required?: boolean;
  };
};

export const Textarea: VFC<Props> = (props) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    setCount(props.selected?.length ?? 0);
    setValue(props.name, props.selected);
  }, [setValue, props.name, props.selected]);

  return (
    <label className="block">
      <span className="font-semibold text-gray-700">{props.labelName}</span>(
      {count}/{props.validation?.maxLength})
      {count > props.validation.maxLength && (
        <ErrorMessage
          message={`1文字以上${props.validation.maxLength}字以内で入力してください`}
        />
      )}
      {errors[props.name] && (
        <ErrorMessage
          message={`1文字以上${props.validation.maxLength}字以内で入力してください`}
        />
      )}
      <textarea
        className={`shadow block w-full p-2 mt-1 border-2 outline-none ${
          count > props.validation.maxLength && "border-red-400"
        }`}
        rows={props.rows}
        placeholder={props.placeholder}
        {...register(props.name, props.validation)}
        onChange={(e) => setCount(e.target.value.length)}
      ></textarea>
    </label>
  );
};

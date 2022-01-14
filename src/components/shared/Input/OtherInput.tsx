import { useFormContext } from "react-hook-form";
import { useState, VFC } from "react";
import { ErrorMessage } from "src/components/Message/ErrorMessage";

type Props = {
  name: string;
  validation?: {
    minLength?: number;
    maxLength?: number;
  };
};

export const OtherInput: VFC<Props> = (props) => {
  const [selected, setSelected] = useState("");
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <label className="space-y-">
      <span className="font-medium text-gray-600">
        その他の場合のみ入力してください
      </span>
      {errors[`${props.name}2`] && (
        <div className="mb-1">
          <ErrorMessage
            message={`${props.validation?.minLength}文字以上${props.validation?.maxLength}文字以内で入力してください`}
          />
        </div>
      )}
      <input
        {...register(`${props.name}2`, props.validation)}
        type="text"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="w-full p-1 border-2 rounded shadow-sm outline-none"
      />
    </label>
  );
};

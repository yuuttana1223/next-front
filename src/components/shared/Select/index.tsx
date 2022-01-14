import { VFC, useState } from "react";
import { OtherInput } from "src/components/shared/Input/OtherInput";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "src/components/Message/ErrorMessage";

type Props = {
  name: string;
  texts?: string[];
  labelName: string;
  isOther?: boolean;
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
  };
};

export const Select: VFC<Props> = (props) => {
  const [selected, setSelected] = useState("");
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <div className="relative mt-1">
        <label className="font-semibold text-gray-700">
          {props.labelName}
          {selected !== "その他" && errors[props.name] && (
            <div className="mb-1">
              <ErrorMessage message="選択されていません" />
            </div>
          )}
        </label>
        <select
          {...register(props.name, props.validation)}
          className="relative w-full px-2 py-3 text-left bg-white rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-blue-300 focus-visible:ring-offset-2 focus-visible:border-blue-500 sm:text-sm"
          onChange={(e) => setSelected(e.target.value)}
        >
          <option hidden value="">
            選択してください
          </option>
          {props.texts?.map((text) => (
            <option key={text} value={text} className="block truncate">
              {text}
            </option>
          ))}
          {props.isOther && <option value="その他">その他</option>}
        </select>
      </div>
      {props.isOther && selected === "その他" && (
        <div className="my-2">
          <OtherInput name={props.name} validation={props.validation} />
        </div>
      )}
    </div>
  );
};

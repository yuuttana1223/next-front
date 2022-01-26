import { VFC, useState, useEffect } from "react";
import { OtherInput } from "src/components/shared/Input/OtherInput";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "src/components/Message/ErrorMessage";

type Props = {
  name: string;
  texts?: string[];
  labelName: string;
  isOther?: boolean;
  selected?: string;
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
    setValue,
  } = useFormContext();

  useEffect(() => {
    setValue(props.name, props.selected);
  }, [props.name, props.selected, setValue]);

  return (
    <div>
      <div className="relative mt-1">
        <label className="font-semibold text-gray-700">
          {props.labelName}
          {selected === "" && errors[props.name] && (
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
          {!props.selected && (
            <option hidden value="">
              選択してください
            </option>
          )}

          {props.texts?.map((text) => (
            // ??はkeyが新規投稿時[undefined, 'プロ演23']でkeyエラーなるのを回避するため
            <option key={text ?? ""} value={text} className="block truncate">
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

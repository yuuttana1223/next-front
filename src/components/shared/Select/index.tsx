import { VFC, useState, useEffect } from "react";
import { OtherInput } from "src/components/shared/Input/OtherInput";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "src/components/Message/ErrorMessage";
import { HiCheck } from "react-icons/hi";

type Props = {
  name: string;
  texts?: string[];
  labelName: string;
  isOther?: boolean;
  selected?: string;
  placeholder?: string;
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
        <div className="relative">
          <select
            {...register(props.name, props.validation)}
            className="py-3 px-2 w-full text-left bg-white rounded-lg focus-visible:border-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 shadow-md appearance-none sm:text-sm"
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
          <div className="flex absolute inset-y-0 right-0 items-center px-2 pointer-events-none">
            <HiCheck />
          </div>
        </div>
      </div>
      {props.isOther && selected === "その他" && (
        <div className="my-2">
          <OtherInput
            name={props.name}
            validation={props.validation}
            placeholder={props.placeholder}
          />
        </div>
      )}
    </div>
  );
};

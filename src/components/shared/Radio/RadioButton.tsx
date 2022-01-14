import { VFC } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "src/components/Message/ErrorMessage";

type Props = {
  title: string;
  texts: string[];
  name: string;
};

export const RadioButton: VFC<Props> = (props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="block">
      <span className="font-semibold text-gray-700">{props.title}</span>
      {errors[props.name] && <ErrorMessage message="選択されていません" />}
      {props.texts.map((text) => (
        <div key={text} className="mt-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value={text}
              {...register(props.name, { required: true })}
            />
            <span className="ml-2">{text}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

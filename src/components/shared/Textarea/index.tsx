import { VFC } from "react";

type Props = {
  labelName: string;
  rows?: number;
  placeholder?: string;
  name: string;
};

export const Textarea: VFC<Props> = (props) => {
  return (
    <label className="block">
      <span className="font-semibold text-gray-700">{props.labelName}</span>
      <textarea
        className="block w-full mt-1 border-2 outline-none"
        required
        rows={props.rows}
        placeholder={props.placeholder}
      ></textarea>
    </label>
  );
};

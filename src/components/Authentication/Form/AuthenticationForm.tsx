import { VFC } from "react";
import { FloatingLabelInput } from "src/components/shared/Input/FloatingLabelInput";
import { Maybe } from "../Message/Maybe";

type Props = {
  inputs: {
    type: string;
    name: string;
    placeholder: string;
  }[];
  title: string;
};

export const AuthenticationForm: VFC<Props> = (props) => {
  return (
    <form className="space-y-4">
      <h1 className="mb-8 text-3xl text-center">{props.title}</h1>
      {props.inputs.map((input) => (
        <FloatingLabelInput
          key={input.name}
          type={input.type}
          name={input.name}
        >
          {input.placeholder}
        </FloatingLabelInput>
      ))}
      <button
        type="submit"
        className="w-full py-3 text-center text-white rounded bg-emerald-400 hover:bg-emerald-500 focus:outline-none"
      >
        作成
      </button>
    </form>
  );
};

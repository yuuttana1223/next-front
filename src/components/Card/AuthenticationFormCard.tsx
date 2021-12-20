import { VFC } from "react";
import { FloatingLabelInput } from "src/components/Input/FloatingLabelInput";

type Props = {
  inputs: {
    type: string;
    name: string;
    placeholder: string;
  }[];
  title: string;
};

export const AuthenticationFormCard: VFC<Props> = (props) => {
  return (
    <div className="w-full px-6 py-8 space-y-4 text-black bg-white rounded shadow-md">
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
    </div>
  );
};

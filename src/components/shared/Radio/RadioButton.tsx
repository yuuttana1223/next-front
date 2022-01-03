import { VFC } from "react";

type Props = {
  title: string;
  texts: string[];
  name: string;
};

export const RadioButton: VFC<Props> = (props) => {
  return (
    <div className="block">
      <span className="font-semibold text-gray-700">{props.title}</span>
      {props.texts.map((text, index) => (
        <div key={text} className="mt-2">
          <div>
            <label className="inline-flex items-center">
              <input type="radio" name={props.name} value={index} />
              <span className="ml-2">{text}</span>
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

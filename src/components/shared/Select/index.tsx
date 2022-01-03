import { Listbox, Transition } from "@headlessui/react";
import { VFC, useState, Fragment } from "react";
import { HiSelector } from "react-icons/hi";
import { ListBoxOption } from "src/components/shared/Select/ListBoxOption";
import { OtherInput } from "src/components/shared/Input/OtherInput";

type Props = {
  texts?: string[];
  labelName: string;
  isOther?: boolean;
};

export const Select: VFC<Props> = (props) => {
  const [selected, setSelected] = useState("選択してください");

  return (
    <div>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Label className="font-semibold text-gray-700">
            {props.labelName}
          </Listbox.Label>
          <Listbox.Button className="relative w-full px-2 py-3 text-left bg-white rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-blue-300 focus-visible:ring-offset-2 focus-visible:border-blue-500 sm:text-sm">
            <span className="block truncate">{selected}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <HiSelector
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {props.texts?.map((text) => (
                <ListBoxOption key={text} text={text} />
              ))}
              {props.isOther && <ListBoxOption text="その他" />}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      {selected === "その他" && (
        <div className="my-2">
          <OtherInput />
        </div>
      )}
    </div>
  );
};

import { Listbox } from "@headlessui/react";
import { VFC } from "react";
import { HiCheck } from "react-icons/hi";

type Props = {
  text: string;
};

export const ListBoxOption: VFC<Props> = (props) => {
  return (
    <Listbox.Option
      className={({ active }) =>
        `${active ? "text-white bg-blue-600 opacity-70" : "text-gray-900"}
                          cursor-default select-none relative py-2 pl-10 pr-4`
      }
      value={props.text}
    >
      {({ selected, active }) => (
        <>
          <span
            className={`${
              selected ? "font-medium" : "font-normal"
            } block truncate`}
          >
            {props.text}
          </span>
          {selected ? (
            <span
              className={`${active ? "text-amber-600" : "text-amber-600"}
                                absolute inset-y-0 left-0 flex items-center pl-3`}
            >
              <HiCheck className="w-5 h-5" aria-hidden="true" />
            </span>
          ) : null}
        </>
      )}
    </Listbox.Option>
  );
};

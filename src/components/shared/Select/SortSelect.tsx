import { Fragment, VFC, useCallback } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { HiCheck, HiSelector } from "react-icons/hi";
import { Review, SelectType } from "src/apis/review";
import { useRouter } from "next/router";
import { SelectStateType } from "src/components/Review/Reviews";
import { PATH } from "src/urls/path";

type Props = {
  selects: SelectType[];
  state: SelectStateType;
  sortSelect: (reviews: Review[], select: SelectType) => void;
};

export const SortSelect: VFC<Props> = (props) => {
  const router = useRouter();
  const handleChange = useCallback(
    (select: SelectType) => {
      const queryParams = `?sort_by=${select.sortBy}&${select.name}=${select.value}`;
      if (queryParams === "?sort_by=created_at&order=desc") {
        router.push(PATH.ROOT);
      } else {
        router.push(queryParams);
      }
    },
    [router]
  );

  return (
    <div className="w-56">
      <Listbox value={props.state.select} onChange={handleChange}>
        <div className="relative mt-1">
          <Listbox.Button className="relative py-2 pr-10 pl-3 w-full text-left bg-white rounded-md border-2 focus-visible:border-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-300 cursor-default sm:text-sm">
            <span className="block font-medium truncate">
              {props.state.select?.text}
            </span>
            <span className="flex absolute inset-y-0 right-0 items-center pr-2 pointer-events-none">
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
            <Listbox.Options className="overflow-auto absolute py-1 mt-1 w-full max-h-60 text-base bg-white focus:outline-none ring-1 ring-black/5 shadow-lg sm:text-sm">
              {props.selects.map((select) => (
                <Listbox.Option
                  key={select.text}
                  className={({ active }) =>
                    `${active ? "text-white bg-indigo-500" : "text-gray-900"}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={select}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? "font-medium" : "font-normal"
                        } block truncate`}
                      >
                        {select.text}
                      </span>
                      {selected ? (
                        <span
                          className={`${active ? "text-white" : "text-gray-900"}
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <HiCheck className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

import { Disclosure } from "@headlessui/react";
import { VFC } from "react";
import { LectureLink } from "src/components/shared/Link/LectureLink";
import { HiChevronDown } from "react-icons/hi";
import { Review } from "src/apis/review";

type Props = {
  reviews?: Review[];
};

export const Accordion: VFC<Props> = (props) => {
  if (props.reviews?.length === 0) {
    return <></>;
  }

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Panel as="ul">
            {props.reviews?.map((review) => (
              <LectureLink key={review.id} review={review} />
            ))}
          </Disclosure.Panel>
          <Disclosure.Button className="flex items-center py-2 w-full text-center hover:text-gray-800 hover:bg-gray-100 rounded">
            <HiChevronDown
              className={`${
                open ? "transform rotate-180" : ""
              } w-7 h-7 inline `}
            />
            <span className="ml-4">
              {open ? "折りたたむ" : `他 ${props.reviews?.length} 件を表示`}
            </span>
          </Disclosure.Button>
        </>
      )}
    </Disclosure>
  );
};

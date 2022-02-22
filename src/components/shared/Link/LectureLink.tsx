import { Review } from "src/apis/review";
import { VFC } from "react";
import Link from "next/link";
import { PATH } from "src/urls/path";
import { useRouter } from "next/router";

type Props = {
  review: Review;
};

export const LectureLink: VFC<Props> = (props) => {
  const router = useRouter();
  return (
    <li>
      <Link href={`${PATH.REVIEWS.SHOW(props.review.id)}`}>
        <a
          className={`block py-2 hover:bg-gray-100 break-all ${
            router.asPath.split("?")[0] ===
              PATH.REVIEWS.SHOW(props.review.id) && "bg-gray-100"
          }`}
        >
          {props.review.lecture_name}
        </a>
      </Link>
    </li>
  );
};

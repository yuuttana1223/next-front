import { VFC } from "react";
import { HiOutlineStar, HiStar } from "react-icons/hi";

type Props = {
  onClick: () => void;
  isFavorite?: boolean;
};

export const FavoriteButton: VFC<Props> = (props) => {
  return (
    <button
      onClick={props.onClick}
      className="py-2 px-3 hover:bg-gray-100 rounded-md border"
    >
      {props.isFavorite ? (
        <HiStar
          title="お気に入り済み"
          size="24px"
          className="inline text-yellow-400"
        />
      ) : (
        <HiOutlineStar
          title="お気に入りボタン"
          size="24px"
          className="inline"
        />
      )}
      <span className="ml-1 font-medium align-bottom">お気に入り</span>
    </button>
  );
};

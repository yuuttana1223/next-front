import Link from "next/link";
import { Dispatch, SetStateAction, VFC, useContext } from "react";
import { PATH } from "src/urls/path";
import { HiHome, HiOutlineHome } from "react-icons/hi";
import { Accordion } from "src/components/Accordion";
import { useFavoriteReviews } from "src/hooks/useFavoriteReviews";
import { AuthContext } from "src/providers/AuthProvider";
import { useRouter } from "next/router";
import { LectureLink } from "src/components/shared/Link/LectureLink";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const Drawer: VFC<Props> = (props) => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);
  const { favoriteReviews } = useFavoriteReviews(currentUser?.id);

  return (
    <>
      <section
        className={`fixed inset-0 z-10 w-64 md:w-72 h-full transition-all overflow-y-scroll duration-500 ease-in-out transform bg-white ${
          props.isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col sm:flex-row sm:justify-around">
          <ul className="pr-2 w-full h-screen">
            <li className="py-2 mt-16 border-b-2">
              <Link href={PATH.ROOT}>
                <a
                  className={`flex items-center p-2 text-gray-600 rounded hover:text-gray-800 hover:bg-gray-100 transition-colors duration-200 ${
                    router.pathname === PATH.ROOT && "bg-gray-100"
                  }`}
                >
                  <div className="flex ml-3">
                    {router.pathname === PATH.ROOT ? (
                      <HiHome title="ホーム" size="28px" />
                    ) : (
                      <HiOutlineHome title="ホーム" size="28px" />
                    )}
                    <p className="ml-3 text-lg">ホーム</p>
                  </div>
                </a>
              </Link>
            </li>
            {currentUser && (
              <li className="py-2 ml-5 text-gray-600">
                <h2 className="py-2 text-gray-800">お気に入り</h2>
                <ul>
                  {favoriteReviews?.slice(0, 7).map((review) => (
                    <LectureLink key={review.id} review={review} />
                  ))}
                </ul>
                <Accordion
                  reviews={favoriteReviews?.slice(7, favoriteReviews.length)}
                />
              </li>
            )}
          </ul>
        </nav>
      </section>
      {props.isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 opacity-40"
          onClick={() => props.setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

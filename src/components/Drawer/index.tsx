import { Dispatch, SetStateAction, VFC, useContext } from "react";
import { PATH } from "src/urls/path";
import { HiHome, HiOutlineHome, HiStar, HiOutlineStar } from "react-icons/hi";
import { Accordion } from "src/components/Accordion";
import { useFavoriteReviews } from "src/hooks/useFavoriteReviews";
import { AuthContext } from "src/providers/AuthProvider";
import { useRouter } from "next/router";
import { LectureLink } from "src/components/shared/Link/LectureLink";
import { SidebarTitleLink } from "src/components/shared/Link/SidebarTitleLink";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const displayLimit = 7;

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
            <li className="pt-2 mt-16">
              <SidebarTitleLink href={PATH.ROOT}>
                <div className="flex ml-3">
                  {router.pathname === PATH.ROOT ? (
                    <HiHome title="ホーム" size="28px" />
                  ) : (
                    <HiOutlineHome title="ホーム" size="28px" />
                  )}
                  <p className="ml-3 text-lg">ホーム</p>
                </div>
              </SidebarTitleLink>
            </li>

            <li className="border-b-2">
              <SidebarTitleLink href={PATH.USERS.FAVORITES(currentUser?.id)}>
                <div className="flex ml-3">
                  {router.asPath.split("?")[0] ===
                  PATH.USERS.FAVORITES(currentUser?.id) ? (
                    <HiStar title="お気に入り" size="28px" />
                  ) : (
                    <HiOutlineStar title="お気に入り" size="28px" />
                  )}
                  <p className="ml-3 text-lg">お気に入り</p>
                </div>
              </SidebarTitleLink>
            </li>
            {currentUser && (
              <li className="py-2 ml-5 text-gray-600">
                <h2 className="py-2 text-gray-800">お気に入り</h2>
                <ul>
                  {favoriteReviews?.slice(0, displayLimit).map((review) => (
                    <LectureLink key={review.id} review={review} />
                  ))}
                </ul>
                <Accordion
                  reviews={favoriteReviews?.slice(
                    displayLimit,
                    favoriteReviews.length
                  )}
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

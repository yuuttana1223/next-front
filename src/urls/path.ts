/**
 * 遷移できるページのURL
 */
export const PATH = {
  ROOT: "/", // レビューの一覧ページ
  USERS: {
    SIGN_IN: "/users/sign_in",
    SIGN_UP: "/users/sign_up",
    EDIT: (id?: number) => `/users/${id}/edit`,
    FAVORITES: (id?: number) => `/users/${id}/favorites`,
  },
  REVIEWS: {
    SHOW: (id?: number) => `/reviews/${id}`,
    EDIT: (id?: number) => `/reviews/${id}/edit`,
    NEW: "/reviews/new",
  },
} as const;

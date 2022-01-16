export const PATH = {
  ROOT: "/",
  USERS: {
    SIGN_IN: "/users/sign_in",
    SIGN_UP: "/users/sign_up",
  },
  REVIEWS: {
    SHOW: (id?: number) => `/reviews/${id}`,
    EDIT: (id?: number) => `/reviews/${id}/edit`,
    NEW: "/reviews/new",
  },
};

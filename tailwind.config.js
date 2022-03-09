module.exports = {
  content: [
    "src/pages/**/*.{ts,tsx}",
    "src/components/**/*.{ts,tsx}",
    "src/layouts/**/*.{ts,tsx}",
  ],
  theme: {
    fontFamily: {
      body: [
        "ヒラギノ角ゴ",
        "Avenir",
        "Arial",
        "游ゴシック",
        "メイリオ",
        "Helvetica Neue",
        "MS Pゴシック",
        "ヒラギノ角ゴ ProN",
        "MS UIゴシック",
        "sans-serif",
      ],
    },
    extend: {
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
};

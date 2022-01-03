import { VFC } from "react";

export const OtherInput: VFC = () => {
  return (
    <label className="space-y-1">
      <span className="font-medium text-gray-700">
        その他の場合のみ入力してください
      </span>
      <input
        type="text"
        required
        className="w-full py-1 border-2 outline-none"
      />
    </label>
  );
};

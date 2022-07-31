import { useRouter } from "next/router";
import qs from "qs";
import { TDirection } from "../types";

export interface IPropType {
  page: Number;
  pageCount: Number;
  redirectURL?: String;
}

const Pagination = ({ page, pageCount, redirectURL = "/" }: IPropType) => {
  const router = useRouter();

  const isNextDisable: Boolean = () => {
    return page >= pageCount;
  };

  const isPrevDisable: Boolean = () => {
    return page <= 1;
  };
  const handlePaginate = async (direction: TDirection) => {
    if (direction === 1 && isNextDisable()) {
      return;
    }
    if (direction === -1 && isPrevDisable()) {
      return;
    }

    const queryString = qs.stringify({
      ...router.query,
      page: page + direction,
    });

    router.push(`${redirectURL}?${queryString}`);
  };

  return (
    <div className="flex justify-center mt-24">
      <button
        onClick={() => handlePaginate(-1)}
        className={`${"bg-primary py-2 px-4 text-white w-24 rounded"} ${
          isPrevDisable() ? "disabled" : ""
        }`}
      >
        Previous
      </button>
      <button
        onClick={() => handlePaginate(1)}
        className={`${"bg-primary py-2 px-4 text-white w-24 rounded ml-4"} ${
          isNextDisable() ? "disabled" : ""
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

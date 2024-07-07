import { FC } from 'react';
import PreviousIcon from '../icon/PreviousIcon';
import NextIcon from '../icon/NextIcon';
import Button from '../button';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../../store';
import { setCustomerParams } from '../../../store/slices/pages/customerPageSlice';
import { setProductParams } from '../../../store/slices/pages/productPageSlice';
import CUSTOMER_PAGE from '../../../pages/index/constants';
import PRODUCT_PAGE from '../../../pages/product/constants';

export type pagenationProps = {
  pageName: string;
  total: number;
  setPageLoadClicked: (value: boolean) => void;
};

const Pagination: FC<pagenationProps> = ({
  pageName,
  total,
  setPageLoadClicked,
}) => {
  const customerPageParams = useSelector(
    (state: RootState) => state.customer.params
  );
  const productPageParams = useSelector(
    (state: RootState) => state.product.params
  );

  const setPageNumParams = (text: string) => {
    switch (pageName) {
      case CUSTOMER_PAGE.PAGE_NAME.VALUE:
        store.dispatch(
          setCustomerParams({
            ...getPageParams(),
            pageNum: parseInt(text),
          })
        );
        break;
      case PRODUCT_PAGE.PAGE_NAME.VALUE:
        store.dispatch(
          setProductParams({
            ...getPageParams(),
            pageNum: parseInt(text),
          })
        );
        break;
      default:
    }
  };

  const getPageParams = () => {
    switch (pageName) {
      case CUSTOMER_PAGE.PAGE_NAME.VALUE:
        return {
          ...customerPageParams,
        };
      case PRODUCT_PAGE.PAGE_NAME.VALUE:
        return {
          ...productPageParams,
        };
      default:
        return {
          pageNum: 1,
          length: 10,
        };
    }
  };

  const totalNum = total / getPageParams().length;
  const totalPages =
    Math.floor(totalNum) === totalNum ? totalNum : Math.floor(totalNum) + 1;

  const pageNumComponent = (arr: string[]) => {
    return (
      <div>
        {arr.map((text) => (
          <div
            key={text}
            className={`relative inline-flex items-center px-1 py-2 text-sm font-semibold ring-1 ring-inset focus:z-20 focus:outline-offset-0 ${
              getPageParams().pageNum === parseInt(text)
                ? 'bg-blue-100'
                : 'ring-gray-300 hover:bg-gray-50'
            } `}
          >
            <Button
              text={text}
              isDisabled={getPageParams().pageNum === parseInt(text)}
              onClick={() => {
                if (text !== '...') {
                  setPageNumParams(text);
                  setPageLoadClicked(true);
                }
              }}
            />
          </div>
        ))}
      </div>
    );
  };

  const getPageSection = () => {
    const currentPage = getPageParams().pageNum;
    if (totalPages <= 5) {
      // display all pages
      const arr = Array(totalPages)
        .fill('')
        .map((_, index) => `${index + 1}`);
      return pageNumComponent(arr);
    } else if (currentPage <= 3) {
      return pageNumComponent(['1', '2', '3', '...', `${totalPages}`]);
    } else if (currentPage <= 4) {
      return pageNumComponent([
        '1',
        '2',
        '3',
        '4',
        '...',
        totalPages.toString(),
      ]);
    } else if (currentPage >= totalPages - 3 && currentPage <= totalPages) {
      return pageNumComponent([
        '1',
        '...',
        `${totalPages - 3}`,
        `${totalPages - 2}`,
        `${totalPages - 1}`,
        `${totalPages}`,
      ]);
    }
    return pageNumComponent([
      '1',
      '...',
      `${currentPage - 1} `,
      `${currentPage}`,
      `${currentPage + 1}`,
      '...',
      `${totalPages}`,
    ]);
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <p className="text-sm text-gray-700">
          Showing
          <span className="font-medium px-2">{getPageParams().pageNum}</span>
          to
          <span className="font-medium px-2">
            {total < getPageParams().length ? total : getPageParams().length}
          </span>
          of
          <span className="font-medium px-2">{total}</span>
          results
        </p>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <div className="relative inline-flex p-1 items-center rounded-l-md ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0">
              <Button
                icon={<PreviousIcon />}
                isDisabled={getPageParams().pageNum === 1}
                onClick={() => {
                  if (getPageParams().pageNum !== 1) {
                    setPageNumParams((getPageParams().pageNum - 1).toString());
                  }
                  setPageLoadClicked(true);
                }}
              />
            </div>
            {getPageSection()}
            <div className="relative inline-flex items-center p-1 rounded-r-md ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0">
              <Button
                isDisabled={getPageParams().pageNum === totalPages}
                icon={<NextIcon />}
                onClick={() => {
                  if (getPageParams().pageNum !== totalPages) {
                    setPageNumParams((getPageParams().pageNum + 1).toString());
                  }
                  setPageLoadClicked(true);
                }}
              />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;

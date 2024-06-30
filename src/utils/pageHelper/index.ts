import CUSTOMER_PAGE from '../../pages/index/constants';
import PRODUCT_PAGE from '../../pages/product/constants';

export const getPageInfo = (pageName: string) => {
  switch (pageName) {
    case CUSTOMER_PAGE.PAGE_NAME.VALUE:
      return { ...CUSTOMER_PAGE };
    case PRODUCT_PAGE.PAGE_NAME.VALUE:
      return { ...PRODUCT_PAGE };
    default:
      return {
        TABLE_COLUMNS: [],
        SEARCH: {
          TEST_CLASS: '',
          PLACEHOLDER: ''
        },
        ACTIONS: {
          CREATE: {
            TEST_CLASS: '',
            TEXT: ''
          }
      },
      };
  }
};

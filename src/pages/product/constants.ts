const PAGE = {
  PAGE_NAME: {
    NAME: 'Product',
    VALUE: 'product',
  },
  TABLE_COLUMNS: [
    {
      name: 'ID',
      value: '_id',
      customClass: '',
    },
    {
      name: 'Name',
      value: 'name',
      customClass: '',
    },
    {
      name: 'SKU',
      value: 'sku',
      customClass: '',
    },
    {
      name: 'Category Tags',
      value: 'categoryTags',
      customClass: 'hidden lg:table-cell',
    },
    {
      name: 'Description',
      value: 'description',
      customClass: 'hidden lg:table-cell',
    },
    {
      name: 'Actions',
      value: 'actions',
      customClass: ''
    },
  ],
  ACTIONS: {
    CREATE: {
      NAME: 'CREATE',
      TEST_CLASS: 'productCreateBtn',
      TEXT: 'Create',
      MODAL: {
        TITLE: 'Create Product',
        TEST_CLASS: 'createProductModal',
      },
    },
    DELETE: {
      MESSAGE: 'Delete Product Id:'
    }
  },
  SEARCH: {
    TEST_CLASS: 'productSearch',
    PLACEHOLDER: 'Search Product (e.g. product name, sku, tags )',
  },
};

export default PAGE;

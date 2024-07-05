const PAGE = {
  PAGE_NAME: {
    NAME: 'Product',
    VALUE: 'product',
  },
  TABLE_COLUMNS: [
    {
      name: 'ID',
      value: '_id',
    },
    {
      name: 'Name',
      value: 'name',
    },
    {
      name: 'SKU',
      value: 'sku',
    },
    {
      name: 'Category Tags',
      value: 'categoryTags',
    },
    {
      name: 'Description',
      value: 'description',
    },
    {
      name: 'Actions',
      value: 'actions',
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

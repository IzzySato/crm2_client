const PAGE = {
  PAGE_NAME: {
    NAME: 'Customer',
    VALUE: 'customer'
  },
  TABLE_COLUMNS: [
    {
      name: 'ID',
      value: '_id',
    },
    {
      name: 'First Name',
      value: 'firstName',
    },
    {
      name: 'Last Name',
      value: 'lastName',
    },
    {
      name: 'Email',
      value: 'email',
    },
    {
      name: 'Phone',
      value: 'phone',
    },
    {
      name: 'Actions',
      value: 'actions',
    },
  ],
  SEARCH: {
    TEST_CLASS: 'customerSearch',
    PLACEHOLDER: 'Search Customer (e.g. first name, last name, email)'
  },
  ACTIONS: {
    CREATE: {
      NAME: 'CREATE',
      TEST_CLASS: 'customerCreateBtn',
      TEXT: 'Create',
      MODAL: {
        TITLE: 'Create Customer',
        TEST_CLASS: 'createCustomerModal',
      },
    },
  }
}

export const CUSTOMER_ACTIONS = {
  UPDATE: 'update',
  DELETE: 'delete',
};

export default PAGE;
const PAGE = {
  PAGE_NAME: {
    NAME: 'Customer',
    VALUE: 'customer'
  },
  TABLE_COLUMNS: [
    {
      name: 'ID',
      value: '_id',
      customClass: 'hidden lg:table-cell',
    },
    {
      name: 'First Name',
      value: 'firstName',
      customClass: '',
    },
    {
      name: 'Last Name',
      value: 'lastName',
      customClass: '',
    },
    {
      name: 'Email',
      value: 'email',
      customClass: 'hidden lg:table-cell',
    },
    {
      name: 'Phone',
      value: 'phone',
      customClass: '',
    },
    {
      name: 'Actions',
      value: 'actions',
      customClass: '',
    },
  ],
  SEARCH: {
    TEST_CLASS: 'customerSearch',
    PLACEHOLDER: 'Search (e.g. first name, last name, email)'
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
    DELETE: {
      MESSAGE: 'Delete Customer Id:'
    }
  }
}

export default PAGE;
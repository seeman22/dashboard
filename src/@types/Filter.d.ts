export type FormValues={
    userName: string,
    dealerId: string,
    email: string,
    phoneNumber: string,
  }

  export type searchProps={
   filter:{ userName: string, dealerId: string, email: string, phoneNumber: string}
  }
  export type searchingProps={
    auth:searchProps
  }
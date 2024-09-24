export type formikaddnewvaluesProps={
    name: string,
    userName: string,
    phoneNumber: string,
    dealer_id:any,
    email:string,
    landline_number: string,
    state: string,
    city: string,
    password: string,
    // userType: '',
    pincode: string,
    dealer_id: string
}
export type  DealeridProps={
    userId: string,
    userName: string,
}

export const  handleSubmited: (e?: React.FormEvent<HTMLFormElement>) => void
import { leadListProps } from "./Lead"
import { leadfilterProps } from "./LeadFilter"

export type storeDataProps={
auth : AuthReducerDataProps ,

}

export type AuthReducerDataProps={
    token: string,
    userid:string,
    modal:boolean,
    addmodal:boolean,
    editmodal:boolean,
    dealerid:[],
    userType:boolean,
    otp:'',
    resetkey:string,
    // filter:leadfilterProps
    filt:boolean,
    leadfiltbooleanvalue:boolean,
    masterfilt:boolean,
    masterenquiryfilt:boolean,
    leadfilt:leadfilterProps,
}


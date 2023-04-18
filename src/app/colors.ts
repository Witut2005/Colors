export type UserDataEntry = 
{
    color: string,
    duration: string,
    date: string,
    tag: string
}


export let currentUserInfo: UserDataEntry[] | null;

export function clearUserInfo()
{
    currentUserInfo = null
}

export function setUserInfo(data: UserDataEntry[])
{
    console.log(data)
    currentUserInfo = data
}
const signInUrl = "http://localhost:3000/userAuth/signIn"
const createAccountUrl = "http://localhost:3000/userAuth/createAccount"

export async function authUser(user:string, pass:string):Promise<any>{
    let toReturn:any;

    let response:void= await fetch(signInUrl,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            },
        body:JSON.stringify({
            Username:user,
            Password:pass
        })

    })
    .then((response) =>{ return response.json()})
    .then((data) => toReturn=data)
    .catch((err)=>console.log(err));
    console.log(toReturn);
    return toReturn;
}

export async function createUser(user:string, pass:string):Promise<any>{
    let toReturn:any;

    let response:void= await fetch(createAccountUrl,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            },
        body:JSON.stringify({
            Username:user,
            Password:pass
        })

    })
    .then((response) =>{ return response.json()})
    .then((data) => toReturn=data)
    .catch((err)=>console.log(err));
    console.log(toReturn);
    return toReturn;
}

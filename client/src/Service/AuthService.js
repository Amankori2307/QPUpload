
export default  {
    login : (user) => {
        return fetch('/user/login',{
            method:'post',
            body : JSON.stringify(user),
            headers : {
                'Content-Type':'application/json'
            }
        })
        .then(res => {
            if(res.status !== 401)
                return res.json().then(data => data)
            return {isAuthenticated : false, user : {email : "", role : ""}}
        })
    },
    register : (user) => {
        return fetch('/user/register',{
            method:'post',
            body : JSON.stringify(user),
            headers : {
                'Content-Type':'application/json'
            }
        })
        .then(res => {
            if(res.status !== 401)
                return res.json().then(data => data)
            return {isAuthenticated : false, user : {email : "", role : ""}}
        })
    },
    logout : () => {
        return fetch('/user/logout').then(res => {
            if(res.status !== 401)
                return res.json().then(data => data)
            return {isAuthenticated : false, user : {email : "", role : ""}}
        })    },
    isAuthenticated : () => {
        return fetch('/user/authenticated').then(res => {
            if(res.status !== 401)
                return res.json().then(data => data)
            return {isAuthenticated : false, user : {email : "", role : ""}}
        })
    }
}


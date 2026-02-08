
const checkOutUserInfo = ({
    phone,email,address,
    age=null,name,action_performed,
    info=null,apartment=null,
    country=null,state=null,
    city=null,zipcode=null,
    value=null,id_=null,
    contestant_name=null,
    data=null,
}) => {
    if(value){
        localStorage.setItem(`checkOutUserInfo`, JSON.stringify({
            value,id_,contestant_name
        }))
        return true
    }
    if(info){
        localStorage.setItem(`checkOutUserInfo`, JSON.stringify({
            phone,
            age,
            email,
            address,
            action_performed,
            name,
            info
        }))
        return true
    }
    if (!name && address){
        localStorage.setItem(`checkOutUserInfo`, JSON.stringify({
            phone,
            age : email,
            address,
            action_performed
        }))
        return true
    }
    if(action_performed && action_performed === "casting"){
        localStorage.setItem(`checkOutUserInfo`, JSON.stringify({
            data,action_performed
        }))
        return true
    }
    if (!address && !name){
        localStorage.setItem(`checkOutUserInfo`, JSON.stringify({
            id: phone,
            email
        }))
        return true
    }
    
    localStorage.setItem(`checkOutUserInfo`, JSON.stringify({
        phone,
        email,
        address,
        name,country,state,city,zipcode,apartment
    }))
    
    return true
}

export default checkOutUserInfo
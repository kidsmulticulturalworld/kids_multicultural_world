const IsEmpty = (x) => {
    // const typs = typeof x
    try{
        const check = Object.keys(x).length === 0
        return check
    }catch(erro){
        return true
    }
}

export default IsEmpty
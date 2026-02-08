const Spliter = (item,spl) => {
    if (item){
        const itemList = item.split(spl)
        return itemList
    }
    return []
}

export default Spliter
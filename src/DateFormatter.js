import moment from 'moment/moment'

const DateFormatter = ({date,info,infos,contest}) => {
    let ogDate = ""
    const months = {
        0: 'Jan',
        1: 'Feb',
        2: 'Mar',
        3: 'Apr',
        4: 'May',
        5: 'Jun',
        6: 'Jul',
        7: 'Aug',
        8: 'Sep',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec'
      }
    const dater = new Date(date)
    const month = months[dater.getMonth()]
    const today = moment(date).format('Do')
    const year = dater.getFullYear().toString().substr(2,2);
    const week = moment(date).format('llll');
    const weekday = week.toString().split(",")[0]

    // const now = moment(date).format('LT')
    ogDate = `${today}-${month}-${year}`
    if (infos){
        return `${weekday}, ${month} ${today}, ${year},`
    }
    if (info){
        return `${month} ${today}`
    }
    if (contest){
        return moment(date).format('l')
    }
    return ogDate
}

export default DateFormatter
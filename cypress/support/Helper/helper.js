
class helper {


  randomIntByMax(n) {
    return Math.floor(Math.random() * (n + 1))
  }

  timeStamp() {
    let today = new Date();
    let date = today.getDate() + '-' + (today.getMonth() + 1)+ '-' + today.getFullYear()
    let time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
    let dateTime = date + '_' + time;
    return dateTime;
  }

  Report_timeStamp() {
    let today = new Date();
   // let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + ;
    let date = (today.getMonth() + 1)+ '/' +today.getDate() + '/' +  today.getFullYear()
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + ' ' + time;
    return dateTime;
  }

  date() {
    let today = new Date();
    let date = today.getDate();
    return date
  }

  
  randomNumberGenerator() {
    var digits = Math.floor(Math.random() * 9000000000) + 1000000000;
    return digits
  }



} export default helper;
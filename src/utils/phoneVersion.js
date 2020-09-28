let phoneVersion = 'ios'; //默认当做ios处理
const userAgent = navigator.userAgent;
const index = userAgent.indexOf("Android")
if (index >= 0) {
  phoneVersion = parseFloat(userAgent.slice(index + 8));
  console.log(phoneVersion,'安卓版本')
}
export default phoneVersion
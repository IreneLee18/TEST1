// 加入千分號
export function currency (num) {
  const n = parseInt(num, 10)
  return `${n.toFixed(0).replace(/./g, (c, i, a) => (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c))}`
}

// 日期轉換格式
// export function date (time) {
//   const localDate = new Date(time)
//   return localDate.toLocaleDateString()
// }
// ＊在整理程式碼發現到
// API一開始設定的時間好像就已經將newDate().getTime()/1000，所以課程老師日期轉換才會特別寫new Date(API傳入時間*1000)，並且在設定coupons時due_date:new Date().get Time()/1000，這樣才不用另外多寫一個日期轉換

// 日期轉換格式-老師寫法
export function date (time) {
  const localDate = new Date(time * 1000)
  return localDate.toLocaleDateString()
}

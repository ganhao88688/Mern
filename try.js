const str = "123456789";
const regexp = /\b(?=\d{3})/;
// /\B(?=(?:\d{3})+)/g
const regexp2 = /\b\d{3}/;
console.log(str);
// console.log(str.replace(regexp, ","));
console.log(str.match(regexp));
console.log(str.match(regexp2));

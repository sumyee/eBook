function instanceOf(left, right) {
  while (left) {
    if(left.__proto__ === right.prototype) {
      return true
    }
    left = left.__proto__
  }
  return false
}

// function instanceOf(left, right) {
//   let proto = left.__proto__
//   while (true) {
//       if (proto === null) return false
//       if (proto === right.prototype) {
//           return true
//       }
//       proto = proto.__proto__
//   }
// }
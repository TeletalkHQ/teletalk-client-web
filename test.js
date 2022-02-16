function* rtc() {
	console.log("1");
	console.log("2");
}

console.log("before");

const iterator = rtc();
iterator.next();
console.log("after");

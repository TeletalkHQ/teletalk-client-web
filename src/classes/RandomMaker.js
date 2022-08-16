import lodash from "lodash";
import { nanoid } from "nanoid";

class RandomMaker {
  constructor() {
    this.stringChars =
      "abcdefghijklmnopqrstufwxyzABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890";
    this.stringNumberChars =
      "12345678901234567890123456789012345678901234567890";
  }

  randomString(length) {
    const arrayOfStrings = lodash.sampleSize(this.stringChars, length ?? 10);
    const string = arrayOfStrings.join("");
    return string;
  }

  randomStringNumber(length) {
    const arrayOfStringNumbers = lodash.sampleSize(
      this.stringNumberChars,
      length ?? 10
    );
    const stringNumber = arrayOfStringNumbers.join("");
    return stringNumber;
  }

  randomNumber(length) {
    const arrayOfStringNumbers = lodash.sampleSize(
      this.stringNumberChars,
      length ?? 10
    );
    const intNumber = +arrayOfStringNumbers.join("");
    return intNumber;
  }

  randomCountryCode() {
    return (
      Math.floor(Math.random() * 100 * Math.random()) +
      Math.floor(Math.random() * 10)
    );
  }

  randomId(size = 30) {
    return nanoid(size);
  }
}

const randomMaker = new RandomMaker();

export { RandomMaker, randomMaker };

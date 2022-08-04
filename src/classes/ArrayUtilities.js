class ArrayUtilities {
  findByPropValueEquality(items = [], value, prop) {
    return items.find((item) => item[prop] === value);
  }

  makeArrayOfUndefinedByCount(count) {
    return Array.from({ length: count });
  }

  convertStringArrayToNumberArray(items) {
    return items.map((item) => +item);
  }

  arrayLength(array) {
    return array.length;
  }

  arrayLastItem(array) {
    return array.at(-1);
  }
}

const arrayUtilities = new ArrayUtilities();

export { arrayUtilities, ArrayUtilities };

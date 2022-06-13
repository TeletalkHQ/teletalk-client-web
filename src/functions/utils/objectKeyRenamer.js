const RenameObjectKey = ({ obj, oldKey, newKey }) => {
  if (oldKey !== newKey) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }
  return obj;
};

export { RenameObjectKey };

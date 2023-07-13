export const recursiveRemoveKey = <T extends object>(object: T, key: string) => {
  delete object[key];

  Object.values(object).forEach((value) => {
    if (!(value instanceof Object)) return;

    recursiveRemoveKey(value, key);
  });
};

export const capitalizeText = (text: string) => {
  return text[0].toUpperCase() + text.substring(1);
};

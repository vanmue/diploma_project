export const copyKeys = <S, D>(keys: string[], source: S, dest: D) => {
  keys.forEach((key) => {
    if (source[key] != null) {
      dest[key] = source[key];
    }
  });
  return dest;
};

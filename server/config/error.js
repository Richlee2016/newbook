/**
 * 0 失败
 * 1 成功
 */

export const sayError = (code, message, mixin) => {
  if (message) console.log(message);
  return Object.assign({}, { code, message }, mixin);
};

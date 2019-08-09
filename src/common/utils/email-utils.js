// eslint-disable-next-line import/prefer-default-export
export const emailValidation = email => {
  return new RegExp(/[\w-]+@([\w-]+\.)+[\w-]+/gm).test(email)
}

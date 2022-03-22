export const sendHttpError = (err, code?) => {
  const error = new Error(err);
  // @ts-ignore
  error.statusCode = code;
  throw error;
};

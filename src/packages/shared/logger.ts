const throwArgumentError = (...rest: any) => {
  console.log(rest);
};

const logger = { throwArgumentError };

export default logger;

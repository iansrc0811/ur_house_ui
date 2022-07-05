import lodash from "lodash";
const isNil = (value) => {
  return lodash.isNil(value) || value === "";
};

export { isNil };

const checkValidation = (label, value, rules) => {
  let isValid = true;
  if (!rules) {
    return "";
  }

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
    if (isValid === false) return label + " is required.";
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
    if (isValid === false)
      return label + " must be at least " + rules.minLength + " characters ";
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
    if (isValid === false)
      return label + " must be maximum " + rules.maxLength + " characters ";
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
    if (isValid === false) return label + " must be valid email.";
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
    if (isValid === false) return label + " must be valid numeric.";
  }

  return "";
};

export default checkValidation;

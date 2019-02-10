import checkValidation from "../util/checkValidation";

const handleChange = (event, form) => {
  const name = event.target.name;
  const value = event.target.value;
  let updatedForm = { ...form };
  let updatedElement = { ...updatedForm[name] };
  updatedElement.value = value;

  if (updatedForm.isSubmitted === true) {
    let message = checkValidation(
      updatedElement.label,
      updatedElement.value,
      updatedElement.validation
    );
    updatedElement.validationMsg = message;
  }
  updatedForm[name] = updatedElement;

  return updatedForm;
};

export default handleChange;

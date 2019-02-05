import checkValidation from "../util/checkValidation";

const handleSubmit = (event, updatedForm) => {
  updatedForm.isSubmitted = true;
  updatedForm.isValid = true;
  let message = "";
  for (let formElement in updatedForm) {
    if (formElement !== "isValid" && formElement !== "isSubmitted") {
      let updatedElement = { ...updatedForm[formElement] };
      message = checkValidation(
        updatedForm[formElement].label,
        updatedForm[formElement].value,
        updatedForm[formElement].validation
      );
      updatedElement.validationMsg = message;
      if (message.length > 0) updatedForm.isValid = false;
      updatedForm[formElement] = updatedElement;
    }
  }
  return updatedForm;
};

export default handleSubmit;

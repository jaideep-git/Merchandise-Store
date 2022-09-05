const validation = (values) => {
  let errors = {};
  let totalErrors = 0;

  let charPattern = /^[a-zA-Z]+$/;
  let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  let mobileNumberPattern = /^[0-9]{10}$/;
  let postalCodePattern = /[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d/;
  let addressPattern = /^[A-Za-z0-9\s#()+-`\\\]\|'/.]{3,}$/;
  let cityPattern =
    /^(?:[A-Za-z]{2,15}(?:(\.\s|'s\s|\s?-\s?|\s)?(?=[A-Za-z]+))){1,2}(?:[A-Za-z]+)?$/;

  for (let key in values) {
    let inputValue = values[key];
    if (!inputValue) {
      errors[key] = "This field is required";
      totalErrors += 1;
    } else {
      switch (key) {
        case "firstName":
          if (!charPattern.test(inputValue)) {
            errors[key] = "Please enter a valid first name";
            totalErrors += 1;
          }
          break;
        case "lastName":
          if (!charPattern.test(inputValue)) {
            errors[key] = "Please enter a valid last name";
            totalErrors += 1;
          }
          break;
        case "email":
          if (!emailPattern.test(inputValue)) {
            errors[key] = "Please enter a valid email address";
            totalErrors += 1;
          }
          break;
        case "phone":
          if (!mobileNumberPattern.test(inputValue)) {
            errors[key] = "Phone number must be 10 digits";
            totalErrors += 1;
          }
          break;
        case "postalCode":
          if (!postalCodePattern.test(inputValue)) {
            errors[key] = "Please enter a valid postal code";
            totalErrors += 1;
          }
          break;
        case "address":
          if (!addressPattern.test(inputValue)) {
            errors[key] = "Please enter valid address";
            totalErrors += 1;
          }
          break;
        case "city":
          if (!cityPattern.test(inputValue)) {
            errors[key] = "Please enter a valid city name";
            totalErrors += 1;
          }
          break;
        default:
      }
    }
  }

  errors.totalErrors = totalErrors;
  return errors;
};

export default validation;

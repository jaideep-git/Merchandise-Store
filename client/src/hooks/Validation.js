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

  if (!values.firstName) {
    errors.firstName = "This field is required";
    totalErrors += 1;
  } else if (!charPattern.test(values.firstName)) {
    errors.firstName = "Please enter a valid first name";
    totalErrors += 1;
  }

  if (!values.lastName) {
    errors.lastName = "This field is required";
    totalErrors += 1;
  } else if (!charPattern.test(values.lastName)) {
    errors.lastName = "Please enter a valid last name";
    totalErrors += 1;
  }

  if (!values.state) {
    errors.state = "This field is required";
    totalErrors += 1;
  } 

  if (!values.email) {
    errors.email = "This field is required";
    totalErrors += 1;
  } else if (!emailPattern.test(values.email)) {
    errors.email = "Please enter a valid email address";
    totalErrors += 1;
  }

  if (!values.phone) {
    errors.phone = "This field is required";
    totalErrors += 1;
  } else if (!mobileNumberPattern.test(values.phone)) {
    errors.phone = "Phone number must be 10 digits";
    totalErrors += 1;
  }

  if (!values.postalCode) {
    errors.postalCode = "This field is required";
    totalErrors += 1;
  } else if (!postalCodePattern.test(values.postalCode)) {
    errors.postalCode = "Please enter a valid postal code";
    totalErrors += 1;
  }

  if (!values.address) {
    errors.address = "This field is required";
    totalErrors += 1;
  } else if (!addressPattern.test(values.address)) {
    errors.address = "Please enter valid address";
    totalErrors += 1;
  }

  if (!values.city) {
    errors.city = "This field is required";
    totalErrors += 1;
  } else if (!cityPattern.test(values.city)) {
    errors.city = "Please enter a valid city name";
    totalErrors += 1;
  }

  errors.totalErrors = totalErrors;
  return errors;
};

export default validation;

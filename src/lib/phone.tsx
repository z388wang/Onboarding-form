import phone from "phone";

export const formatPhoneNumberWithInputMask = (phoneNumber: string): string => {
  if (phoneNumber === "+1") {
    return "";
  }
  const trimmed = phoneNumber.startsWith("+1")
    ? phoneNumber.slice(2)
    : phoneNumber;
  let formattedInput = trimmed.replace(/\D/g, "");
  formattedInput = `+1${formattedInput.slice(0, 10)}`;

  return formattedInput;
};

export const validatePhone = (phoneNumber = "") => {
  const res = phone(phoneNumber);
  return res.isValid;
};

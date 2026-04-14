import * as Yup from "yup";

// STEP 1
export const personalSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  dateOfBirth: Yup.date().required("Date of birth is required"),
  gender: Yup.string().required("Gender is required"),
  nationalId: Yup.string().required("National ID is required"),
});

// STEP 2
export const contactSchema = Yup.object({
  mobileNumber: Yup.string()
    .matches(/^0\d{9}$/, "Enter valid Ghana phone number")
    .required("Phone is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  residentialAddress: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
});

// STEP 3
export const employmentSchema = Yup.object({
  employmentStatus: Yup.string().required("Employment status is required"),

  employerName: Yup.string().when("employmentStatus", {
    is: "Employed",
    then: (schema) => schema.required("Employer name required"),
  }),

  businessName: Yup.string().when("employmentStatus", {
    is: "Self-Employed",
    then: (schema) => schema.required("Business name required"),
  }),
});

// STEP 4
export const referenceSchema = Yup.object({
  referenceName1: Yup.string().required("Reference name required"),
  referencePhone1: Yup.string().required("Reference phone required"),
});
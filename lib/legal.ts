export const legal = {
  company: process.env.LEGAL_COMPANY_NAME || "",
  form: process.env.LEGAL_COMPANY_FORM || "",
  capital: process.env.LEGAL_CAPITAL || "",
  address: process.env.LEGAL_ADDRESS || "",
  registration: process.env.LEGAL_REGISTRATION || "",
  vat: process.env.LEGAL_VAT || "",
  director: process.env.LEGAL_DIRECTOR || "",
  hostName: process.env.LEGAL_HOST_NAME || "",
  hostAddress: process.env.LEGAL_HOST_ADDRESS || "",
  hostPhone: process.env.LEGAL_HOST_PHONE || "",
};
export const legalComplete = Boolean(legal.company && legal.form && legal.address && legal.registration && legal.director && legal.hostName && legal.hostAddress && legal.hostPhone);

export function phoneToTelLink(phone: string) {
  return `tel:${phone}`;
}

//do the same as above for the remaining properties of contactLinks^

export function formatPhoneDisplay(phone: string) {
  // Simple UK formatting; you can improve as needed
  // e.g. "+447964873296" => "(+44) 7964 873296"
  return phone.replace(/^\+44(\d{4})(\d{6})$/, "(+44) $1 $2");
}
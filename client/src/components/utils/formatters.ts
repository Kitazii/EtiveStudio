export const Formatters = {
  phoneToTelLink(phone: string) {
    return `tel:${phone}`;
  },

  // phoneToSMSLink(phone: string) {
  //   return `sms:${phone}`;
  // },

  emailToMailLink(email: string) {
    return `mailto:${email}`;
  },

  formatPhoneDisplay(phone: string) {
    // Simple UK formatting; you can improve as needed
    // e.g. "+447964873296" => "(+44) 7964 873296"
    return phone.replace(/^\+44(\d{4})(\d{6})$/, "(+44) $1 $2");
  }
}
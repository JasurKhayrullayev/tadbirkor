const locales = [
    {
      Name: 'Eng',
      Value: 'en',
    },
    {
      Name: 'Uz',
      Value: 'uz',
    },
    {
      Name: 'Ru',
      Value: 'ru',
    },
  ];
  const dictionary = {
    en: {
      Number: 'Number',
      Contact: 'Contact',
      Company: 'Company',
      Amount: 'Amount',
      PaymentDate: 'Payment Date',
      Dashboard: 'Dashboard',
      Home: 'Home',
    },
    uz: {
      Number: 'Raqam',
      Contact: 'Kontakt',
      Company: 'Kompaniya',
      Amount: 'Summa',
      PaymentDate: 'To\'lov sanasi',
      Dashboard: 'Ko\'rsatgichlar',
      Home: 'Bosh sahifa',
    },
    ru: {
      Number: 'Номер',
      Contact: 'Имя',
      Company: 'Организация',
      Amount: 'Сумма',
      PaymentDate: 'Дата оплаты',
      Dashboard: 'Показатели',
      Home: 'Главная',
    },
  };
  const data = {
    getLocales() {
      return locales;
    },
    getDictionary() {
      return dictionary;
    },
  };  

  export default data;
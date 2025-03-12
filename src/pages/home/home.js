import React, { useEffect } from 'react';
import './home.scss';
import { formatMessage, loadMessages, locale } from 'devextreme/localization';
import service from '../../db/data.js';

export default function Home() {
  useEffect(() => {
    loadMessages(service.getDictionary());
    const storedLocale = sessionStorage.getItem('locale') || 'en';
    locale(storedLocale);
  }, []);

  return (
    <React.Fragment>
      <div>{formatMessage('Home')}</div>
    </React.Fragment>
  );
}
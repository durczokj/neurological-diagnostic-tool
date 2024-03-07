import React from 'react';
import { Link } from 'react-router-dom';

const Page403 = () => {
    
    const { t } = useTranslation("translations")
    
    return (
        <div className='container'>
          <h1>403 - {t('commonHttpPages.notAuthorized')}</h1>
          <p>
            <Link to='/login'>{t('commonHttpPages.backToLogin')}</Link>
          </p>
        </div>
    );
}
export default Page403;

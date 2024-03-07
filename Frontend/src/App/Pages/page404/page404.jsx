import React from 'react';
import { Link } from 'react-router-dom';

const Page404 = () => {

    const { t } = useTranslation("translations")

    return (
        <div className='container'>
          <h1>404 {t('commonHttpPages.notFound')}</h1>
        </div>
    );
}
export default Page404;

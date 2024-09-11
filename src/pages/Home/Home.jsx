import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '~/store/slides/counterSlide';
import { locales } from '~/utils/i18n';

function Home() {
    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation('home');
    const currentLanguage = locales[i18n.language];

    const handleChangeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div>
            <h1>Count: {count}</h1>
            <div>{currentLanguage}</div>
            <div>{t('hello')}</div>
            <div>
                <button onClick={() => handleChangeLanguage('en')}>English</button>
                <button onClick={() => handleChangeLanguage('vi')}>Viet Nam</button>
                <button aria-label="Increment value" onClick={() => dispatch(increment())}>
                    Increment
                </button>
                <span>{count}</span>
                <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
                    Decrement
                </button>
            </div>
        </div>
    );
}

export default Home;

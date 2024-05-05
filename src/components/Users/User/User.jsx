import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { ModalWindow } from '../../ModalWindow/ModalWindow';
import Preloader from '../../Preloader';
import style from './User.module.css';

export const User = ({ user }) => {
  const tg = window.Telegram.WebApp;

  const inputRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataFetching, setDataFetching] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [userCurrency, setUserCurrency] = useState({
    rub: user.rub,
    bit: user.bit,
  });

  const inputControl = event => {
    const { name, value } = event.target;
    const keyPressed = event.nativeEvent.data;
    const regexp = /[^0-9.]/g;
  
    if (!regexp.test(keyPressed) || keyPressed === null) {
      const cleanedValue = value.replace(regexp, '');

      setUserCurrency(prev => {
        if (prev[name].toString().includes('.') && keyPressed === '.') {
          return { ...userCurrency, [name]: cleanedValue.slice(0, -1) };
        }
        return { ...userCurrency, [name]: cleanedValue };
      });
    }

    const otherFieldName = name === 'rub' ? 'bit' : 'rub';
    const otherFieldValue = userCurrency[otherFieldName];

    const isInputValueChanged = +value !== user[name];
    const isValueOfInputsMoreThanZero = +value > 0 && +otherFieldValue > 0;

    setIsButtonDisabled(!(value && isInputValueChanged && isValueOfInputsMoreThanZero))
  };

  const formSubmit = e => {
    e.preventDefault();
    inputRef.current.blur();
    setIsModalOpen(true);
  };

  const modalAnswerConfirm = () => {
    setDataFetching(true);
    fetch(`https://telegram-testing.glitch.me/user/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCurrency),
    }).then(() => {
      setDataFetching(false);
      tg.close();
    });
  };

  const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

  return (
    <>
      {dataFetching && <Preloader color={'white'} />}
      {isModalOpen && (
        <ModalWindow
          content={
            <>
              <span className={style.contentSpan}>Изменить пользователю</span>
              <span className={style.contentSpan}>{`${capitalize(user.name)} ${capitalize(
                user.lastName
              )}`}</span>
              <span className={style.contentSpan}>счета на</span>
              <span className={style.contentSpan}>{`Рублёвый: ${userCurrency.rub} ₽`}</span>
              <span className={style.contentSpan}>{`Bitcoin: ${userCurrency.bit} ₿`}</span>
            </>
          }
          modalConfirmAction={modalAnswerConfirm}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
      <li className={style.userFormItem}>
        <form className={style.userForm} onSubmit={formSubmit}>
          <div className={style.userFormInfoWrapper}>
            <h2 className={style.userFormTitle}>{`${capitalize(user.name)} ${capitalize(
              user.lastName
            )}`}</h2>
            <p className={style.userFormPhoneNumber}>{`${
              user.phoneNumber ? user.phoneNumber : 'Телефон не указан'
            }`}</p>
            <p className={style.userFormEmail}>{`${
              user.email ? user.email : 'почта не указана'
            }`}</p>
          </div>
          <div className={style.userFormContentWrapper}>
            <div className={style.userFormLabelsWrapper}>
              <label className={style.userFormLabel}>
                <p className={style.userFormAccount}>Рублёвый счёт:</p>
                <input
                  className={style.userFormInput}
                  name='rub'
                  type='text'
                  value={userCurrency.rub}
                  onChange={inputControl}
                  ref={inputRef}
                  inputMode='decimal'
                />
              </label>

              <label className={style.userFormLabel}>
                <p className={style.userFormAccount}>Bitcoin счёт:</p>
                <input
                  className={style.userFormInput}
                  name='bit'
                  type='text'
                  value={userCurrency.bit}
                  onChange={inputControl}
                  ref={inputRef}
                  inputMode='decimal'
                />
              </label>
            </div>
            <div className={style.userFormBtnWrapper}>
              <button className={style.userFormSubmitBtn} type='submit' disabled={isButtonDisabled}>
                Сохранить
              </button>
            </div>
          </div>
        </form>
      </li>
    </>
  );
};

User.propTypes = {
  user: PropTypes.object,
};

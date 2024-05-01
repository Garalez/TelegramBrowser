import PropTypes from 'prop-types';
import { useState } from 'react';
import style from './User.module.css';

export const User = ({ user }) => {
  const [userCurrency, setUserCurrency] = useState({
    rub: user.rub,
    bit: user.bit,
  });

  const [isButtonActive, setIsButtonActive] = useState(true);

  const inputControl = (e) => {
    const { name, value } = e.target;

    setUserCurrency({ ...userCurrency, [name]: value });
    if (isButtonActive) setIsButtonActive(false);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    fetch(`https://telegram-testing.glitch.me/test/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCurrency),
    }).then(() => {
      setIsButtonActive(true);
    });
  }

  const capitalize = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  return (
    <form className={style.userForm} onSubmit={formSubmit}>
      <div className={style.userFormInfoWrapper}>
        <h2 className={style.userFormTitle}>{`${capitalize(user.name)} ${capitalize(
          user.lastName
        )}`}</h2>
        <p className={style.userFormPhoneNumber}>{`${
          user.phoneNumber ? user.phoneNumber : 'Телефон не указан'
        }`}</p>
        <p className={style.userFormEmail}>{`${user.email ? user.email : 'почта не указана'}`}</p>
      </div>
      <div className={style.userTransactionsBtnWrapper}>
        {/* <button
          className={`${style.userFormDeleteBtn} ${style.userTransactionsBtn}`}
          type='button'
          onClick={() => navigate(`/application/userInfo/${user.id}`)}>
          Транзакции пользователя
        </button> */}
      </div>
      <div className={style.userFormContentWrapper}>
        <div className={style.userFormLabelsWrapper}>
          <label className={style.userFormLabel}>
            <p className={style.userFormAccount}>Рублёвый счёт:</p>
            <input
              className={style.userFormInput}
              name='rub'
              type='number'
              value={userCurrency.rub}
              onChange={inputControl}
            />
          </label>

          <label className={style.userFormLabel}>
            <p className={style.userFormAccount}>Bitcoin счёт:</p>
            <input
              className={style.userFormInput}
              name='bit'
              type='number'
              value={userCurrency.bit}
              onChange={inputControl}
            />
          </label>
        </div>
        <div className={style.userFormBtnWrapper}>
          <button className={style.userFormSubmitBtn} type='submit' disabled={isButtonActive}>
            Сохранить
          </button>
        </div>
      </div>
    </form>
  );
};

User.propTypes = {
  user: PropTypes.object,
};

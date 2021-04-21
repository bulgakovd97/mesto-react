import React from 'react';
import api from '../utils/api';
import Card from './Card';

function Main(props) {

  const [userName, setUserName] = React.useState('');

  const [userDescription, setUserDescription] = React.useState('');

  const [userAvatar, setUserAvatar] = React.useState('');

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getInitialData()
      .then((data) => {
        const [userData, cardsData] = data;

        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);

        setCards(cardsData);
      })
      .catch(err => console.log('Ошибка загрузки страницы - ' + err))
  }, [userName, userDescription, userAvatar, cards]);

  return (
    <main className="content">
      <section className="profile" aria-label="Профиль">
        <div className="profile__avatar-container">
          <img className="profile__avatar" alt="Аватар" src={userAvatar} />
          <button className="profile__avatar-button" type="button" aria-label="Обновить аватар" onClick={props.onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={props.onEditProfile}></button>
          <p className="profile__about">{userDescription}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить" onClick={props.onAddPlace}></button>
      </section>

      <section aria-label="Карточки">
        <ul className="elements">

          {cards.map(card =>
            <Card name={card.name} link={card.link} likes={card.likes.length} card={{name: card.name, link: card.link}} onCardClick={props.onCardPreview} key={card._id} />
          )}

        </ul>
      </section>
    </main>
  )
}

export default Main;
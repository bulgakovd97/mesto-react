import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardsContext } from "../contexts/CardsContext";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );

  const [selectedCard, setSelectedCard] = React.useState(null);

  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getInitialData()
      .then((data) => {
        const [userData, cardsData] = data;

        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => console.log("Ошибка загрузки начальных данных - " + err));
  }, []);

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log("Ошибка постановки лайка/дизлайка - " + err));
  }

  function handleCardDelete(id) {
    api
      .removeCard(id)
      .then(() => {
        setCards((cardsData) => cardsData.filter((card) => id !== card._id));
      })
      .catch((err) => console.log("Ошибка удаления карточки - " + err));
  }

  function handleUpdateUser({ name, about }) {
    api
      .setUserInfo(name, about)
      .then((userData) => {
        setCurrentUser(userData);

        closeAllPopups();
      })
      .catch((err) =>
        console.log("Ошибка обновления данных пользователя - " + err)
      );
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .changeAvatar(avatar)
      .then((userData) => {
        setCurrentUser(userData);

        closeAllPopups();
      })
      .catch((err) =>
        console.log("Ошибка обновления аватара пользователя - " + err)
      );
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addCard(name, link)
      .then((cardsData) => {
        setCards([cardsData, ...cards]);

        closeAllPopups();
      })
      .catch((err) => console.log("Ошибка добавления новой карточки - " + err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <div className="page">
          <div className="container">
            <Header />

            <Main
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardPreview={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />

            <Footer />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />

            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />

            {/* <PopupWithForm
              name="confirm"
              title="Вы уверены?"
              buttonText="Да"
              label="Попап подтверждения удаления карточки"
              onClose={closeAllPopups}
            /> */}

            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          </div>
        </div>
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;

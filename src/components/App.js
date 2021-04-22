import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );

  const [selectedCard, setSelectedCard] = React.useState(null);

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

  return (
    <div className="page">
      <div className="container">
        <Header />

        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardPreview={handleCardClick}
        />

        <Footer />

        <PopupWithForm
          name="edit"
          title="Редактировать профиль"
          buttonText="Сохранить"
          label="Попап редактирования профиля"
          isOpen={isEditProfilePopupOpen && "popup_opened"}
          onClose={closeAllPopups}
        >
          <input
            className="popup__input popup__input_type_name"
            id="name-input"
            type="text"
            name="name"
            value=""
            placeholder="Имя"
            required
            minLength="2"
            maxLength="40"
          />
          <span className="popup__error name-input-error"></span>
          <input
            className="popup__input popup__input_type_about"
            id="about-input"
            type="text"
            name="about"
            value=""
            placeholder="Занятие"
            required
            minLength="2"
            maxLength="200"
          />
          <span className="popup__error about-input-error"></span>
        </PopupWithForm>

        <PopupWithForm
          name="add"
          title="Новое место"
          buttonText="Создать"
          label="Попап добавления карточки"
          isOpen={isAddPlacePopupOpen && "popup_opened"}
          onClose={closeAllPopups}
        >
          <input
            className="popup__input popup__input_type_title"
            id="title-input"
            type="text"
            name="name"
            value=""
            placeholder="Название"
            required
            minLength="2"
            maxLength="30"
          />
          <span className="popup__error title-input-error"></span>
          <input
            className="popup__input popup__input_type_link"
            id="url-input"
            type="url"
            name="link"
            value=""
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__error url-input-error"></span>
        </PopupWithForm>

        <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          buttonText="Сохранить"
          label="Попап обновления аватара"
          isOpen={isEditAvatarPopupOpen && "popup_opened"}
          onClose={closeAllPopups}
        >
          <input
            className="popup__input popup__input_type_avatar"
            id="avatar-input"
            type="url"
            name="avatar"
            value=""
            placeholder="Ссылка на аватар"
            required
            minLength="2"
            maxLength="200"
          />
          <span className="popup__error avatar-input-error"></span>
        </PopupWithForm>

        <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          buttonText="Да"
          label="Попап подтверждения удаления карточки"
          onClose={closeAllPopups}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </div>
  );
}

export default App;

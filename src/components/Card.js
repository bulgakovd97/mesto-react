function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        alt={`${props.card.name}`}
        src={`${props.card.link}`}
        onClick={handleClick}
      />
      <div className="card__caption-field">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like">
          <button
            className="card__like-button"
            type="button"
            aria-label="Лайк"
          ></button>
          <div className="card__like-counter">{props.card.likes.length}</div>
        </div>
        <button
          className="card__delete-button"
          type="button"
          aria-label="Удалить"
        ></button>
      </div>
    </li>
  );
}

export default Card;

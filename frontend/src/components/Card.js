import { useContext } from "react";

import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardDelete, onCardLike }) {

	const currentUser = useContext(CurrentUserContext);

	const isOwn = card.owner._id === currentUser._id;

	const isLiked = card.likes.some(i => i._id === currentUser._id);
	const cardLikeButtonClassName = (
		`element__button-like ${isLiked && "element__button-like_active"}`
	);

	function handleClick() {
		onCardClick(card);
	};

	function handleDeleteClick(e) {
		e.stopPropagation();
		onCardDelete(card);
	};

	function handleLikeClick() {
		onCardLike(card);
	};

	return (
		<li className="element">
			<img className="element__image"
				src={card.link}
				alt={card.name}
				onClick={handleClick}
			/>

			{/* Если карточка наша (соблюдено isOwn), то отображаем кнопку удаления */}
			{isOwn && <button
				className="button element__button-bin"
				type="button"
				aria-label="Удалить место"
				onClick={handleDeleteClick}
			/>}

			<div className="element__description">
				<h2 className="element__place">{card.name}</h2>
				<div className="element__likes-container">
					<button
						className={cardLikeButtonClassName}
						type="button"
						aria-label="Оценить место"
						onClick={handleLikeClick}
					/>
					<div className="element__like-counter">{card.likes.length}</div>
				</div>
			</div>
		</li>
	);

};

export default Card
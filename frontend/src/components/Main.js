import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

import Card from './Card';
import Footer from './Footer';

import defaultUserAvatar from '../images/render_loading.gif';

function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) {

	const currentUser = useContext(CurrentUserContext);

	return (
		<>
			<main className="content">

				<section className="profile">
					<div className="profile__content">
						<button
							onClick={onEditAvatar}
							className="button profile__button-avatar-edit" type="button">
							<img
								className="profile__avatar"
								src={currentUser.avatar ?? defaultUserAvatar}
								alt="Фотография пользователя"
							/>
						</button>

						<div className="profile__info">
							<h1 className="profile__username">{currentUser.name}</h1>
							<button
								onClick={onEditProfile}
								className="profile__button-edit button"
								type="button"
								aria-label="Редактировать информацию в профиле"
							/>
							<p className="profile__description">{currentUser.about}</p>
						</div>
					</div>

					<button
						onClick={onAddPlace}
						className="button profile__button-add"
						type="button"
						aria-label="Добавить фотографии"
					/>
				</section>

				<section className="elements">
					<ul className="elements__content">
						{cards.map((card) => (
							<Card
								key={card._id}
								card={card}
								onCardClick={onCardClick}
								onCardLike={onCardLike}
								onCardDelete={onCardDelete}
							/>
						))}
					</ul>
				</section>

			</main>

			<Footer />
		</>
	);

};

export default Main


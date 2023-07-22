function Footer() {

	const setCurrentYear = () => {
		return new Date().getFullYear()
	};

	return (
		<footer className="footer page__footer">
			<p className="footer__copyright" lang="en">
				© {setCurrentYear()}&nbsp;Mesto&nbsp;Russia
			</p>
		</footer>
	);

};

export default Footer
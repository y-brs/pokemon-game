import s from './style.module.css';

const Layout = ({ id, title, urlBg, colorBg, children }) => {

	const sectionStyle = {};

	if (urlBg) {
		sectionStyle.backgroundImage = `url(${urlBg})`;
	}
	if (colorBg) {
		sectionStyle.backgroundColor = colorBg;
	}

	return (
		<section
			style = {sectionStyle}
			className={s.root}
			id={id}
		>
			<div className={s.wrapper}>
				<article>
					<div className={s.title}>
						{ title && (
							<h3>{title}</h3>
						) }
						<span className={s.separator}></span>
					</div>

					<div className={`${s.desc} ${s.full}`}>
						{children}
					</div>
				</article>
			</div>
		</section>
	)
}

export default Layout;
import styles from '../styles/productDetailsHeader.module.css';
import backArrow from '../assets/imgs/backArrow.png';
import { Link, useParams } from 'react-router-dom';
import { useAppContext } from '../context/Store';
import Loader from './../utils/Loader';

export default function ProductDetailsHeader({ title, linkPath }) {
	const store = useAppContext();
	const product = store.product;

	const { userId } = useParams();

	if (product === null) {
		return <Loader />;
	}

	return (
		<header className={styles.productDetailsHeader}>
			<div className={styles.container}>
				<p className={styles.productDetailsCategory}>
					{!userId && product.category.title}
				</p>
				<h2 className={styles.productDetailsTitle}>{title || product.title}</h2>
			</div>
			<Link to={linkPath || '/'} relative='path'>
				<img
					className={styles.backArrow}
					src={backArrow}
					alt='Flecha para volver'
				/>
			</Link>
		</header>
	);
}

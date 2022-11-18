import ProductDetailsHeader from '../components/ProductDetailsHeader';
import styles from '../styles/reservation.module.css';
import ProductDetailsPolicy from './../components/ProductDetailsPolicy';
import DetailsCard from './../components/DetailsCard';
import { useEffect } from 'react';

export default function Reservation() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<div className={styles.reservationContainer}>
			<ProductDetailsHeader linkPath={'..'} />
			<div className={styles.leftContainer}>
				{/* 	<h2 className={styles.personalDataTitle}>Completá tus datos</h2> */}
				<div className={styles.personalData}>
					<h2 className={styles.personalDataTitle}>Completá tus datos</h2>
					Data container
				</div>
				<div className={styles.calendar}>Calendary</div>
				<div className={styles.schedule}>Horario llegada</div>
			</div>
			<DetailsCard />
			<ProductDetailsPolicy />
		</div>
	);
}
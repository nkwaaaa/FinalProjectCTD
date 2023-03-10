import styles from '../styles/policyItem.module.css';
import RadioButtonCheck from '../components/RadioButtonCheck';
export default function PolicyItemProperty({
	handleCheckoutChange,
	setIsPartyAllowed,
}) {
	return (
		<div className={styles.policyItem}>
			<h3 className={styles.policyItemTitle}>{'Normas de la casa'}</h3>
			<span className={styles.label}>¿Se permiten fiestas?</span>
			<RadioButtonCheck name={'fiesta'} onChangeOption={setIsPartyAllowed} />
			<span className={styles.label}>Política de Checkout</span>
			<textarea
				className={styles.textArea}
				placeholder={'Escribir aquí'}
				name='textarea'
				onChange={handleCheckoutChange}
			></textarea>
		</div>
	);
}

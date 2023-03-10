import FormField from '../components/FormField';
import styles from '../styles/imageItem.module.css';

const urlFieldConfig = {
	fieldType: 'input',
	id: 'url',
	type: 'text',
	placeholder: 'Insertar https://',
};

export default function ImageItem({ onChange }) {
	return (
		<div className={styles.mainContainer}>
			<div className={styles.formRow}>
				<FormField config={urlFieldConfig} handleChange={onChange} />
			</div>
		</div>
	);
}

import styles from '../styles/basicSelect.module.css';

export default function BasicSelect({ data, handleSelect, disabled }) {
	return (
		<div>
			<select
				disabled={disabled}
				onChange={handleSelect}
				className={styles.select}
			>
				{data.map(item => (
					<option className={styles.option} key={item?.id} value={item?.id}>
						{item?.content}
					</option>
				))}
			</select>
		</div>
	);
}

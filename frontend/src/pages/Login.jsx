import Button from '../components/Button';
import styles from '../styles/auth.module.css';
import { validateEmail } from '../utils';
import FormField from '../components/FormField';
import { useContext, useState, useEffect } from 'react';
import linkStyles from '../styles/link.module.css';
import { UserContext } from '../context/UserContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import { AuthService } from '../services/authService';
import { CacheItems, CacheService } from '../services/cacheService';

const emailFieldConfig = {
	fieldType: 'input',
	id: 'email',
	label: 'Correo electrónico',
	type: 'email',
};

const passwordFieldConfig = {
	fieldType: 'input',
	id: 'password',
	label: 'Contraseña',
	type: 'password',
};

export default function Login() {
	const [emailError, setEmailError] = useState();
	const [passwordError, setPasswordError] = useState();
	const [alert, setAlert] = useState();
	const [nextRoute, setNextRoute] = useState();
	const { state } = useLocation();

	const { setUser } = useContext(UserContext);

	const navigate = useNavigate();

	useEffect(() => {
		if (state) {
			const alert = state.alert;
			if (alert) {
				setAlert({ text: alert.text, type: alert.type });
			}
			if (state.userEmail) {
				document.querySelector('#email').value = state.userEmail;
			}

			if (state.forwardingRoute) {
				setNextRoute(state.forwardingRoute);
			}
		}
	}, [state]);

	let isFormValid = false;

	const submitLoginForm = async () => {
		const email = document.querySelector('#email');
		const password = document.querySelector('#password');

		validateEmptyField('email', email);
		validateEmptyField('password', password);

		if (!isFormValid) {
			return;
		}

		if (!validateEmail(email.value)) {
			setEmailError('Ingresa un email válido');
			isFormValid = false;
		} else {
			setEmailError(null);
			isFormValid = true;
		}

		const result = await AuthService.signIn(email.value, password.value);

		if (result && result.jwt && result.user) {
			CacheService.setJwt(result.jwt);
			const user = result.user;
			setUser(user);
			CacheService.setItem(CacheItems.UserName, user.name);
			CacheService.setItem(CacheItems.UserLastName, user.lastName);
			CacheService.setItem(CacheItems.UserEmail, user.email);
			CacheService.setItem(CacheItems.UserRole, user.userRoles);
			navigate(nextRoute ?? '/');
		} else if (result.status === 403) {
			setAlert({ text: 'Credenciales erroneas', type: 'error' });

			setTimeout(() => {
				setAlert(null);
			}, 2000);
		}
	};

	const validateEmptyField = (fieldName, field) => {
		if (!field.value || !field.value.trim()) {
			setFieldError(fieldName, 'Este campo es requerido');
			isFormValid = false;
		} else {
			setFieldError(fieldName, null);
			isFormValid = true;
		}
	};

	const setFieldError = (fieldName, error) => {
		switch (fieldName) {
			case 'email':
				setEmailError(error);
				break;
			case 'password':
				setPasswordError(error);
				break;
			default:
				break;
		}
	};

	return (
		<div className={styles.mainContainer}>
			{alert && <Alert text={alert.text} type={alert.type} />}
			<h1 className={styles.title}>Iniciar sesión</h1>
			<form className={styles.formContainer}>
				<FormField config={emailFieldConfig} error={emailError}></FormField>
				<FormField
					config={passwordFieldConfig}
					error={passwordError}
				></FormField>
				<Button handleClick={submitLoginForm} innerText='Ingresar'></Button>

				<span>
					¿Aún no tenés cuenta?{' '}
					<Link to={'/sign-up'} className={linkStyles.link}>
						Registrate
					</Link>
				</span>
			</form>
		</div>
	);
}

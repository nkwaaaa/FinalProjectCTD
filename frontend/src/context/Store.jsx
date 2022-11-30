/* eslint-disable no-unused-vars */
import { createContext, useContext, useState, useEffect } from 'react';

import { getCategories } from '../services/getCategories';
import { getProducts } from '../services/getProducts';
import { getCities } from '../services/getCities';
import { getProductById } from '../services/getProductById';
import { getFeatures } from '../services/getFeatures';
import { getPolicy } from '../services/getPolicy';
import { getReservationByProductId } from '../services/getReservationByProductId';
const AppContext = createContext({
	selectedCategory: undefined,
	selectedCity: undefined,
	selectedStartDate: undefined,
	selectedEndDate: undefined,
	selectedProduct: undefined,
	categories: [],
	products: [],
	cities: [],
	product: {},
	features: [],
	policy: {},
	reservations: [],
	setIdProduct: id => {},
	setSelectedCategory: selectedCategory => {},
	setSelectedCity: selectedCity => {},
	setSelectedStartDate: selectedStartDate => {},
	setSelectedEndDate: selectedEndDate => {},
	setSelectedProduct: selectedProduct => {},
});

export default function Store({ children }) {
	const [selectedCity, setSelectedCity] = useState();
	const [selectedCategory, setSelectedCategory] = useState();
	const [selectedStartDate, setSelectedStartDate] = useState();
	const [selectedEndDate, setSelectedEndDate] = useState();
	const [selectedProduct, setSelectedProduct] = useState();
	const [categories, setCategories] = useState(null);
	const [products, setProducts] = useState([]);
	const [cities, setCities] = useState([]);
	const [product, setProduct] = useState(null);
	const [features, setFeatures] = useState([]);
	const [policy, setPolicy] = useState(null);
	const [idProduct, setIdProduct] = useState(1);
	const [reservations, setReservations] = useState([]);

	useEffect(() => {
		const loadCategories = async () => {
			const dataCategories = await getCategories();
			setCategories(dataCategories);
		};

		const loadCities = async () => {
			const dataCities = await getCities();
			setCities(dataCities);
		};
		loadCategories();
		loadCities();
	}, []);

	useEffect(() => {
		const loadProducts = async () => {
			const dataProducts = await getProducts({
				category: selectedCategory,
				city: selectedCity,
				startDate: selectedStartDate,
				endDate: selectedEndDate,
			});
			setProducts(dataProducts);
		};
		loadProducts();
	}, [selectedCategory, selectedStartDate, selectedEndDate, selectedCity]);

	/* useEffect(() => {
		(async () => {
			const dataFeatures = await getFeatures();
			setFeatures(dataFeatures);
		})();
	}, []);
	useEffect(() => {
		(async () => {
			const dataPolicy = await getPolicy();
			setPolicy(dataPolicy);
		})();
	}, []); */
	useEffect(() => {
		(async () => {
			const dataProduct = await getProductById(idProduct);
			setProduct(dataProduct);
		})();
	}, [idProduct]);

	useEffect(() => {
		const loadReservations = async () => {
			const dataReservations = await getReservationByProductId({
				productId: selectedProduct,
			});
			setReservations(dataReservations);
		};
		loadReservations();
	}, [selectedProduct]);

	return (
		<AppContext.Provider
			value={{
				categories,
				products,
				cities,
				product,
				features,
				policy,
				reservations,
				setIdProduct,
				setSelectedCategory,
				setSelectedEndDate,
				setSelectedStartDate,
				setSelectedCity,
				setSelectedProduct,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export function useAppContext() {
	return useContext(AppContext);
}

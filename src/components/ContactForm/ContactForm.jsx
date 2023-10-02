import { useState } from "react";
import PropTypes from "prop-types";

import { nanoid } from "nanoid";

import css from "./ContactForm.module.css";

export default function ContactForm({ onSubmit }) {
	const [name, setName] = useState("");
	const [number, setNumber] = useState("");

	const resetState = () => {
		setName("");
		setNumber("");
	};

	const onInputChange = e => {
		const { name, value } = e.currentTarget;

		switch (name) {
			case "name":
				setName(value);
				break;

			case "number":
				setNumber(value);
				break;

			default:
				throw new Error("This type is not availeble!");
		}
	};

	const onFormSubmit = e => {
		e.preventDefault();

		const form = e.currentTarget;

		resetState();

		return onSubmit({
			name: form.name.value.trim(),
			number: form.number.value,
			id: nanoid(),
		});
	};

	return (
		<form className={css.form} onSubmit={onFormSubmit}>
			<label className={css.label}>
				Name
				<input
					value={name}
					onChange={onInputChange}
					className={css.name}
					type="text"
					name="name"
					pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
					title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
					autoComplete="off"
					required
				/>
			</label>
			<label className={css.label}>
				Telephone
				<input
					value={number}
					onChange={onInputChange}
					className={css.number}
					type="tel"
					name="number"
					pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
					title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
					autoComplete="off"
					required
				/>
			</label>
			<button className={css.submitButton} type="submit">
				Add contact
			</button>
		</form>
	);
}

ContactForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};

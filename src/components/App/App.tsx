import { useState, useEffect, useRef, FormEvent } from "react";

import { Notify } from "notiflix";

import ContactForm from "../ContactForm/ContactForm";
import Filter from "../Filter/Filter";
import ContactList from "../ContactList/ContactList";

import { Contact } from "../../types/types";

import css from "./App.module.css";

const LOCAL_KEY = "contacts";

export function App() {
	const [filter, setFilter] = useState("");
	const [contacts, setContacts] = useState<Array<Contact>>([]);

	const first = useRef(1);
	const local = localStorage.getItem(LOCAL_KEY);

	const onFilterChange = (e: FormEvent<HTMLInputElement>): void => {
		const { value } = e.currentTarget;
		setFilter(value);
	};

	const onDeleteClick = (id: string): void => {
		Notify.info("Contact has deleted!");

		return setContacts(prev => prev.filter(contact => contact.id !== id));
	};

	const onContactSave = (contactData: Contact): void => {
		const hasSameContactName = contacts.some(contact => contact.name === contactData.name);

		if (hasSameContactName) {
			return Notify.failure(`${contactData.name} is already in contacts!`);
		}

		Notify.success("Contact has added!");
		return setContacts(prev => [...prev, contactData]);
	};

	useEffect(() => {
		if (local && first.current === 1) setContacts(JSON.parse(local));
		first.current += 1;
	}, [local]);

	useEffect(() => {
		localStorage.setItem(LOCAL_KEY, JSON.stringify(contacts));
	}, [contacts]);

	return (
		<>
			<h1 className={css.title}>Phone Book</h1>

			<ContactForm onSubmit={onContactSave}></ContactForm>
			<h2 className={css.subtitle}>Contacts</h2>

			<Filter onInputChange={onFilterChange} filter={filter} />
			{contacts.length ? (
				<ContactList contacts={contacts} filter={filter} onDeleteClick={onDeleteClick} />
			) : (
				<p className={css.message}>You have no contacts yet!</p>
			)}
		</>
	);
}

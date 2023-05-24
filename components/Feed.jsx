'use client';

import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className="mt-16 prompt_layout">
			{data.map(post => (
				<PromptCard
					key={post._id}
					post={post}
					handleTagClick={handleTagClick}
				/>
			))}
		</div>
	);
};

const Feed = () => {
	const [searchText, setSearchText] = useState('');
	const [posts, setPosts] = useState([]);
	const [searchResults, setSearchResults] = useState([]);

	const filterPrompts = searchText => {
		const regex = new RegExp(searchText, 'i');

		return posts.filter(
			post =>
				regex.test(post.tag) ||
				regex.test(post.creator.username) ||
				regex.test(post.prompt)
		);
	};

	const handleSearchChange = e => {
		setSearchText(e.target.value);
	};

	const handleTagClick = tag => {
		setSearchText(tag);
	};

	useEffect(() => {
		const searchResult = filterPrompts(searchText);
		setSearchResults(searchResult);
	}, [searchText]);

	useEffect(() => {
		// Fetch data from the server
		const fetchPosts = async () => {
			const response = await fetch('/api/prompt');
			const data = await response.json();

			setPosts(data);
		};

		fetchPosts();
	}, []);

	return (
		<section className="feed">
			{/* The form search for feed */}
			<form className="relative w-full flex-center">
				<input
					type="text"
					placeholder="Search for a tag or a username"
					value={searchText}
					onChange={handleSearchChange}
					required
					className="search_input peer"
				/>
			</form>
			{/* Prompt Cards */}
			{searchText ? (
				<PromptCardList data={searchResults} handleTagClick={handleTagClick} />
			) : (
				<PromptCardList data={posts} handleTagClick={handleTagClick} />
			)}
		</section>
	);
};

export default Feed;

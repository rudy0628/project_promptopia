'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

import Profile from '@components/Profile';

const UserProfile = () => {
	const params = useParams();
	const searchParams = useSearchParams();
	const username = searchParams.get('name');
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		// Fetch data from the server
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/${params.id}/posts`);
			const data = await response.json();

			setPosts(data);
		};

		// if the user existed, fetch the posts from the server.
		if (params.id) {
			fetchPosts();
		}
	}, []);

	return (
		<Profile
			name={username}
			desc={`Welcome to ${username}'s personalized profile page. Explore ${username}'s exceptional prompts and be inspired by the power of their imagination`}
			data={posts}
		/>
	);
};

export default UserProfile;

export const getUserProfile = async (username: string) => {
	try {
		const response = await fetch(`/api/threads/profile/${username}`);

		const data = await response.json();
		return data.message;
	} catch (error) {
		console.error(error);
	}
};

export const getPostContent = async (id: string, username: string) => {
	try {
		const response = await fetch(
			`/api/threads/post/${id}?username=${username}`,
		);

		const data = await response.json();
		return data.message;
	} catch (error) {
		console.error(error);
	}
};

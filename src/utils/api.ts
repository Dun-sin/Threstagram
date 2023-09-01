interface UserProfile {
	message: string;
}
interface IContent {
	message: string[] | string;
	isSuccess: boolean;
}
export const getUserProfile = async (username: string): Promise<string> => {
	try {
		const response = await fetch(`/api/threads/profile/${username}`);
		const data = await response.json() as UserProfile;
		return data.message;
	} catch (error) {
		console.error(error);
		throw new Error('Failed to get user profile');
	}
};

export const getPostContent = async (id: string, username: string): Promise<IContent> => {
	try {
		const response = await fetch(`/api/threads/post/${id}?username=${username}`);
		const data = await response.json() as IContent;
		return data;
	} catch (error) {
		console.error(error);
		throw new Error('Failed to get post content');
	}
};

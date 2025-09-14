import { Post } from '../types';
import axios from 'axios';

export async function getPostContent(
  postId: string,
  token: string
): Promise<{
  isSuccess: boolean;
  message: string[] | string;
  post?: Post;
}> {
  try {
    const response = await axios.get(
      `/api/threads/post/${encodeURIComponent(postId)}`,
      {
        params: {
          token: token,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('API Error:', error);

    if (error.response?.data) {
      return error.response.data;
    }

    return {
      isSuccess: false,
      message: 'Failed to fetch post content. Please try again.',
    };
  }
}

export async function getPostsOfTheLast7Days(
  token: string,
  id: string
): Promise<{
  isSuccess: boolean;
  data?: Post[];
  error?: string;
}> {
  try {
    const response = await axios.get('/api/threads/posts', {
      params: { token, id },
    });
    return {
      isSuccess: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error('Posts API Error:', error);
    return {
      isSuccess: false,
      error: 'Failed to fetch posts of the last 7 days',
    };
  }
}

// If you have other API functions, update them similarly to use tokens
export async function getUserProfile(token: string) {
  try {
    const response = await axios.get('/api/threads/profile', {
      params: { token },
    });
    return response.data;
  } catch (error: any) {
    console.error('Profile API Error:', error);
    return {
      isSuccess: false,
      message: 'Failed to fetch user profile',
    };
  }
}

import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { Post } from '../../types';
import SubmitButton from './../../components/Button/SubmitButton';
import { getAccessToken } from '../../utils/helper';
import { getPostsOfTheLast7Days } from '../../utils/api';
import { useUser } from '../context/UserContext';

interface AllPostsProps {
  setId: Dispatch<SetStateAction<string>>;
}

const AllPosts = ({ setId }: AllPostsProps) => {
  const { userState } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await getPostsOfTheLast7Days(getAccessToken(), userState.userId);

      if (res && res.data) {
        setPosts(res.data.filter((post: Post) => !post.is_quote_post).slice(0, 9));
      }
    };
    fetchPosts();
  }, [userState.userId]);

  const handleClick = (id: string) => {
    setId(id);
  }
  return (
    <section className='flex flex-col mt-4 max-h-[500px] w-4/5  justify-center items-center gap-4 h-auto max-w-[850px]'>
      <p>Select a post👇🏾</p>
      <div className='flex-col flex gap-2 w-full'>
        {posts.map((post) => (
          <div key={post.id} className='border border-brand bg-black/65 rounded-md w-full flex justify-between'>
            <p className='py-3 px-2'>{post.text.split(' ').slice(0, 8).join(' ')}...</p>
            <SubmitButton handleOnClick={() => handleClick(post.id)} text="Select" />
          </div>
        ))}
      </div>
    </section>
  )
}

export default AllPosts
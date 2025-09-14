// next/react
import { useEffect, useState } from 'react';

// libraries
import { PongSpinner } from 'react-spinners-kit';

// components
import Social from '../components/Social';
import Options from './component/Options';
import Preview from './component/Preview';
import BackButton from '../components/Button/BackButton';

// utils
import { extractPostID } from '../utils/helper';
import { getPostContent } from '../utils/api';

// context
import { useUser } from './context/UserContext';
import { useContent } from './context/ContentContext';

export default function Threads() {
  const { contentState, dispatchContent } = useContent();
  const { userState } = useUser();

  const [showAllPosts, setShowAllPosts] = useState(true);
  const [id, setId] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Fetch user profile to get username
  const fetchUserProfile = async (accessToken: string) => {
    try {
      const response = await fetch(`/api/threads/profile?token=${accessToken}`);
      const data = await response.json();

      if (data.isSuccess) {
        dispatchUser({ type: 'SET_USERNAME', payload: data.profile.username });
        dispatchUser({ type: 'SET_USER_ID', payload: data.profile.id });
        dispatchUser({ type: 'SET_PROFILE_PICTURE', payload: data.profile.threads_profile_picture_url })
        dispatchUser({ type: 'SET_NAME', payload: data.profile.name })
      } else {
        // Token might be expired or invalid
        removeAccessToken()
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      removeAccessToken()
    } finally {
      setAuthLoading(false);
    }
  };


  const handleSignIn = () => {
    window.location.href = '/api/auth/threads';
  };

  const handleSignOut = () => {
    removeAccessToken()
    dispatchUser({ type: 'CLEAR_USER' });
    dispatchContent({ type: 'CLEAR_CONTENT' });
  };


  // Handle post content extraction
  useEffect(() => {
    if (!token || !id) return;


    (async () => {
      dispatchContent({ type: 'START_LOADING', payload: true });
      const content = await getPostContent(id, token);

      if (content.isSuccess) {
        dispatchContent({ type: 'SET_CONTENT', payload: content.message });
      } else {
        dispatchContent({ type: 'START_LOADING', payload: false });
        dispatchContent({ type: 'SET_ERROR', payload: content.message });

        // If error is due to expired token, clear authentication
        if (content.message.includes('token') || content.message.includes('expired')) {
          handleSignOut();
        }
      }
    })();
  }, [token, id]);

  useEffect(() => {

    // Check for token in URL (from OAuth callback)
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');

    if (tokenFromUrl) {
      localStorage.setItem('threads_token', tokenFromUrl);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);

      // Fetch user profile with the new token
      fetchUserProfile(tokenFromUrl);
    } else {
      // Check localStorage for existing token
      const token = getAccessToken()
      if (token) {
        setToken(token);
        fetchUserProfile(token);
      } else {
        setAuthLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    setShowAllPosts(contentState.postContent.length === 0);
  }, [contentState.postContent]);


  // Show loading spinner while checking authentication
  if (authLoading) {
    return (
      <section className='bg-primary text-secondary flex items-center flex-col justify-center h-screen w-screen font-sans'>
        <PongSpinner size={110} color='#fff' loading={true} />
        <p className='mt-4'>Loading...</p>
      </section>
    );
  }

  return (
    <section className='bg-primary text-secondary flex items-center flex-col justify-between h-screen w-screen font-sans sm:gap-0 gap-12 relative'>
      <div
        className='absolute h-screen w-screen bg-repeat-x'
        style={{
          backgroundImage:
            "url('https://e0.pxfuel.com/wallpapers/487/755/desktop-wallpaper-black-and-blue-black-blue-backgrounds-new.jpg')",
        }}
      />

      <header className='flex items-center justify-between w-full bg-white-400 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-10 pt-5 px-6'>
        <BackButton />
        <Social />

        {!token ? (
          <button
            onClick={handleSignIn}
            className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors'
          >
            Sign in with Threads
          </button>
        ) : (
          <div className='flex items-center gap-3'>
            <span className='text-sm'>@{userState.username}</span>
            <button
              onClick={handleSignOut}
              className='px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition-colors'
            >
              Sign out
            </button>
          </div>
        )}
      </header>
      <main className='flex items-center w-full flex-col justify-center gap-4 h-[95%] overflow-auto bg-white-400 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-10  pb-10'>
        <span className='flex flex-col items-center'>
          <h1 className='md:text-flg text-fmd font-bold text-center'>
            Convert Your Threads Post To Images
          </h1>
          {contentState.postContent.length !== 0 && (
            <ul className='hidden md:flex items-center gap-6 flex-wrap'>
              <li className='flex items-center gap-2'>
                <span>CTRL + B</span>
                <span>-</span>
                <span>Bold</span>
              </li>
              <li className='flex items-center gap-2'>
                <span>CTRL + I</span>
                <span>-</span>
                <span>Italic</span>
              </li>
              <li className='flex items-center gap-2'>
                <span>CTRL + U</span>
                <span>-</span>
                <span>Underline</span>
              </li>
            </ul>
          )}
        </span>

        {/* Authentication required message */}
        {!token ? (
          <div className='flex flex-col items-center gap-4 text-center max-w-md'>
            <div className='bg-yellow-100 bg-opacity-20 backdrop-blur-sm border border-yellow-300 rounded-lg p-6'>
              <h2 className='text-xl font-semibold mb-2'>Authentication Required</h2>
              <p className='text-sm mb-4'>
                To convert your Threads posts, you need to sign in with your Threads account.
                This allows us to access your posts using the official Threads API.
              </p>
              <button
                onClick={handleSignIn}
                className='px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium'
              >
                Connect Threads Account
              </button>
            </div>
            <p className='text-xs text-gray-300 max-w-sm'>
              We only access your public posts and don't store any of your data.
              Your authentication token is stored locally in your browser.
            </p>
          </div>
        ) : (
          <>
            {/* Input - only show when authenticated */}
        {contentState.contentLoading ? (
          <span className='flex items-center justify-center w-4/5 max-w-[850px]'>
            <PongSpinner
              size={110}
              color='#fff'
              loading={contentState.contentLoading}
            />
          </span>
        ) : (
          // Display Content
          !(contentState.postContent.length === 0) && <Preview />
        )}
      </main>
    </section>
  );
}

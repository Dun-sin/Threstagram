import { NextApiRequest, NextApiResponse } from 'next';

import { Post } from '../../../../types';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const { id, token } = req.query;

      if (!token) {
        return res.status(400).json({
          isSuccess: false,
          message: 'Access token required',
        });
      }

      if (!id) {
        return res.status(400).json({
          isSuccess: false,
          message: 'Post ID or URL required',
        });
      }

      // Get the specific post details
      const postResponse = await axios.get(
        `https://graph.threads.net/v1.0/${id}`,
        {
          params: {
            fields:
              'id,media_product_type,media_type,media_url,permalink,owner,username,text,topic_tag,timestamp,shortcode,thumbnail_url,children,is_quote_post',
            access_token: token,
          },
        }
      );

      const post = postResponse.data;

      console.log({ post });
      // Check if it's a quote post (not supported)
      if (post.is_quote_post) {
        return res.status(400).json({
          isSuccess: false,
          message: "Can't work with a quote post",
        });
      }

      // Check if post has text content
      if (!post.text) {
        return res.status(400).json({
          isSuccess: false,
          message: "Can't work with thread without caption.",
        });
      }

      const content: string[] = [];

      // Add main post text
      content.push(post.text);

      // Add children posts if it's a carousel/thread
      if (post.children && post.children.data) {
        post.children.data.forEach((child: Post) => {
          if (child.text) {
            content.push(child.text);
          }
        });
      }

      // Get user's profile to check ownership for replies
      const userProfileResponse = await axios.get(
        'https://graph.threads.net/v1.0/me',
        {
          params: {
            fields: 'id,username',
            access_token: token,
          },
        }
      );

      const currentUserId = userProfileResponse.data.id;

      // Get replies to this post (if any)
      try {
        const repliesResponse = await axios.get(
          `https://graph.threads.net/v1.0/${id}/replies`,
          {
            params: {
              fields: 'id,text,owner,timestamp,reply_to{id,owner}',
              access_token: token,
            },
          }
        );

        if (repliesResponse.data.data) {
          // Filter replies to only include those by the same user replying to themselves
          const userReplies = repliesResponse.data.data.filter((reply: any) => {
            return (
              reply.owner.id === currentUserId &&
              reply.reply_to &&
              reply.reply_to.owner.id === currentUserId
            );
          });

          // Add reply content to the thread
          userReplies.forEach((reply: any) => {
            if (reply.text) {
              content.push(reply.text);
            }
          });
        }
      } catch (replyError) {
        // Replies might not be accessible or might not exist, continue without them
        console.log('Could not fetch replies:', replyError);
      }

      res.status(200).json({
        isSuccess: true,
        message: content,
        postData: {
          id: post.id,
          permalink: post.permalink,
          timestamp: post.timestamp,
          media_type: post.media_type,
          media_url: post.media_url,
        },
      });
    } else {
      res.status(405).json({
        isSuccess: false,
        message: 'Method not allowed',
      });
    }
  } catch (error: any) {
    console.error('Threads API Error:', error.response?.data || error.message);

    // Handle specific API errors
    if (error.response?.status === 401) {
      res.status(401).json({
        isSuccess: false,
        message: 'Invalid or expired access token',
      });
    } else if (error.response?.status === 403) {
      res.status(403).json({
        isSuccess: false,
        message:
          'Access denied - user may have private profile or post is not accessible',
      });
    } else if (error.response?.status === 404) {
      res.status(404).json({
        isSuccess: false,
        message: 'Post not found',
      });
    } else {
      res.status(500).json({
        isSuccess: false,
        message: 'Internal Server Error',
        details: error.response?.data || error.message,
      });
    }
  }
}

function extractPostIdFromUrl(input: string): string | null {
  // If it's already just an ID, return it
  if (/^\d+$/.test(input)) {
    return input;
  }

  // Extract ID from Threads URL patterns
  // Examples:
  // https://www.threads.com/@username/post/ABC123
  // https://threads.com/@username/post/ABC123
  // https://www.threads.net/t/ABC123

  const patterns = [
    /threads\.com\/@[\w.]+\/post\/([A-Za-z0-9_-]+)/,
    /threads\.com\/t\/([A-Za-z0-9_-]+)/,
    /threads\.com.*\/([A-Za-z0-9_-]+)$/,
  ];

  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

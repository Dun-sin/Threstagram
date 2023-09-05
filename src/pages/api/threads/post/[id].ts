import { NextApiRequest, NextApiResponse } from 'next';

import { ThreadsAPI, Thread, ThreadItem } from 'threads-api';

const threadsAPI = new ThreadsAPI();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const content = [];
      const id = req.query.id as string;
      const username = req.query.username as string;

      const postID = threadsAPI.getPostIDfromURL(id);
      if (!postID) {
        throw Error(`Couldn't find post ID`);
      }

      const post = (await threadsAPI.getThreads(postID)).containing_thread;
      post.thread_items.forEach((value, index) => {
        if (!!value.post.text_post_app_info.share_info.quoted_post) {
          throw Error(`Can't work with a quote tweet`);
        }

        return content.push(value.post.caption.text);
      });

      const reply = (await threadsAPI.getThreads(postID)).reply_threads;
      if (reply.length !== 0) {
        getReplyContent(reply, content, username);
      }

      res.status(200).json({ isSuccess: true, message: content });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ isSuccess: false, message: 'Internal Server Error' });
  }
}

function getReplyContent(reply: Thread[], content: any[], username: string) {
  const thread_items = [];
  const replyPost = [];

  reply.forEach((value) => {
    thread_items.push(value.thread_items);
  });

  thread_items[0].forEach((value: ThreadItem) => {
    if (value.post.user.username !== username) return;

    const replyAuthor = value.post.text_post_app_info.reply_to_author;
    if (replyAuthor['username'] !== username) return;

    if (!!value.post.text_post_app_info.share_info.quoted_post) return;

    replyPost.push(value.post);
  });

  replyPost.forEach((value, index) => {
    content.push(value.caption.text);
  });
}

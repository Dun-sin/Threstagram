export type User = {
  username: string;
  userId: string;
  name?: string;
  profilePictureUrl?: string;
};

export type ColorType = {
  color1: string;
  color2?: string;
};

export type Post = {
  id: string;
  media_product_type?: string;
  media_type?:
    | 'TEXT_POST'
    | 'IMAGE'
    | 'VIDEO'
    | 'CAROUSEL_ALBUM'
    | 'AUDIO'
    | 'REPOST_FACADE';
  media_url?: string;
  permalink: string;
  owner: {
    id: string;
  };
  username?: string;
  text?: string;
  topic_tag?: string;
  timestamp?: string;
  shortcode?: string;
  thumbnail_url?: string;
  children?: Post[]; // You may want to define a more specific type for children if structure is known
  is_quote_post?: boolean;
};
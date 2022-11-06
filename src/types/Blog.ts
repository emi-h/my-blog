export type Blog = {
  id: string;
  title: string;
  category: {
    id: string;
    category: string;
  };
  content: string;
  date: string;
  portfolio_img: { url: string };
  toc_visible: boolean;
};

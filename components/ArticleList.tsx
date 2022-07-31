import { IArticles } from "../types";
import BlogCard from "./BlogCard";
import BlogCardWithImage from "./BlogCardWithImage";

interface IPropType {
  articles: IArticles[];
}

const ArticleList = ({ articles }: IPropType) => {
  return (
    <div className="grid lg:grid-cols-2 grid-gap gap-16 mt-16">
      {articles &&
        articles.map((article, index) => (
          <div key={article.id}>
            {index === 1 ? (
              <BlogCardWithImage article={article} />
            ) : (
              <BlogCard article={article} />
            )}
          </div>
        ))}
    </div>
  );
};

export default ArticleList;

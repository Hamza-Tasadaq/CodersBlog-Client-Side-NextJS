import { AxiosResponse } from "axios";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import qs from "qs";
import ArticleList from "../../components/ArticleList";
import Pagination from "../../components/Pagination";
import Tabs from "../../components/Tabs";
import { fetchArticles, fetchCategories } from "../../http";
import {
  IArticles,
  ICategory,
  ICollectionResponse,
  IPagination,
} from "../../types";
import { capitallizedFirstLetter, debounce, makeCategory } from "../../utils";

export interface IPropTypes {
  categories: {
    items: ICategory[];
    pagination: IPagination;
  };
  articles: {
    items: IArticles[];
    pagination: IPagination;
  };
  slug: String;
}

const Category: NextPage = ({ categories, articles, slug }:IPropTypes) => {
  const router = useRouter();
  const { category: categorySlug } = router.query;

  const { page, pageCount } = articles.pagination;
  const formattedCategory = () => {
    return capitallizedFirstLetter(makeCategory(slug));
  };

  const handleSearch = (query: String) => {
    router.push(`/category/${categorySlug}/?search=${query}`);
  };

  return (
    <div>
      <Head>
        <title>Coder'sBlog | {formattedCategory()}</title>
        <meta name="description" content="Genetrated with create Next app" />
        <link rel="icon" href="/logo.png" />
      </Head>

      {/* Categories Tab Section */}
      <Tabs
        categories={categories.items}
        handleOnSearch={debounce(handleSearch, 500)}
      />

      {/* Articles */}
      <ArticleList articles={articles.items} />

      {/* Pagination */}
      <Pagination
        page={page}
        pageCount={pageCount}
        redirectURL={`/category/${categorySlug}`}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // Articles
  const options = {
    populate: ["author.avatar"],
    sort: ["id:desc"],
    filters: {
      category: {
        slug: query.category,
      },
    },
    pagination: {
      page: query.page ? +query.page : 1,
      pageSize: 5,
    },
  };

  if (query.search) {
    options.filters = {
      Title: {
        $containsi: query.search,
      },
    };
  }
  const queryString = qs.stringify(options);

  const { data: articles }: AxiosResponse<ICollectionResponse<IArticles>> =
    await fetchArticles(queryString);

  // Categories
  const { data: categories }: AxiosResponse<ICollectionResponse<ICategory[]>> =
    await fetchCategories();

  return {
    props: {
      categories: {
        items: categories.data,
        pagination: categories.meta.pagination,
      },
      articles: {
        items: articles.data,
        pagination: articles.meta.pagination,
      },
      slug: query.category,
    },
  };
};

export default Category;

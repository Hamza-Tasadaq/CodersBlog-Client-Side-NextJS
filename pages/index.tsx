import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import qs from "qs";
import { AxiosResponse } from "axios";
import { fetchArticles, fetchCategories } from "../http";
import {
  IArticles,
  ICategory,
  ICollectionResponse,
  IPagination,
  IQueryOptions,
} from "../types";
import Tabs from "../components/Tabs";
import ArticleList from "../components/ArticleList";
import Pagination from "../components/Pagination";
import { useRouter } from "next/router";
import { debounce } from "../utils";

export interface IPropTypes {
  categories: {
    items: ICategory[];
  };
  articles: {
    items: IArticles[];
    pagination: IPagination;
  };
}

const Home: NextPage = ({ categories, articles }: IPropTypes) => {
  const router = useRouter();
  const { page, pageCount } = articles.pagination;

  const handleSearch = (query: String) => {
    router.push(`/?search=${query}`);
  };

  return (
    <div>
      <Head>
        <title>Coder'sBlog | HomePage</title>
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

      <Pagination page={page} pageCount={pageCount} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // Categories
  const { data: categories }: AxiosResponse<ICollectionResponse<ICategory[]>> =
    await fetchCategories();

  // Articles
  const options: IQueryOptions = {
    populate: ["author.avatar"],
    sort: ["id:desc"],
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

  return {
    props: {
      categories: {
        items: categories.data,
      },
      articles: {
        items: articles.data,
        pagination: articles.meta.pagination,
      },
    },
  };
};

export default Home;

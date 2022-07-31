import { type } from "os";

export interface ICollectionResponse<T> {
  data: T;
  meta: IResourceMeta;
}

export interface IResourceMeta {
  pagination: IPagination;
}

export interface IPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface ICategory {
  id: number;
  attributes: ICategoryAttribute;
}

export interface ICategoryAttribute {
  Title: String;
  Slug: String;
}

export interface IArticles {
  id: number;
  attributes: IArticlesAttributes;
}

export interface IArticlesAttributes {
  Title: String;
  Body: String ;
  Slug: String;
  Image: IImageData;
  creatadAt: String;
  author: IAuthor;
  shortDescription: String;
}

export interface IImageData {
  data: {
    attributes: {
      url: String;
      formats: {
        small: {
          url: string;
        };
      };
    };
  };
}

export interface IAuthor {
  data: {
    attributes: {
      firstname: String;
      lastname: String;
      avatar: {
        data: {
          attributes: {
            formats: {
              thumbnails: {
                url: String;
              };
            };
          };
        };
      };
    };
  };
}

export type TDirection = 1 | -1;

export interface IQueryOptions {
  filters?: any;
  sort: any;
  populate: any;
  pagination: {
    page: number;
    pageSize: number;
  };
}

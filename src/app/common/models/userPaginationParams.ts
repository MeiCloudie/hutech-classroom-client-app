import { PaginationParams } from "./paginationPrams";

export interface UserPaginationParams extends PaginationParams {
  userId: string
}

export class UserPaginationParams {
  pageNumber = 1;
  pageSize = 10;
  userId: string;
  searchString = "";

  constructor(pageNumber: number, pageSize: number, userId: string, searchString: string = "") {
      this.pageNumber = pageNumber;
      this.pageSize = pageSize;
      this.userId = userId;
      this.searchString = searchString;
  }

  toUrlSearchParams(): URLSearchParams {
      let urlSearchParams = new URLSearchParams();
      if (this.pageNumber > 0) {
        urlSearchParams.set("PageNumber", this.pageNumber.toString());
      }
      if (this.pageSize > 0) {
        urlSearchParams.set("PageSize", this.pageSize.toString());
      }
      if (this.userId !== "") {
        urlSearchParams.set("UserId", this.userId);
      }
      if (this.searchString !== "") {
        urlSearchParams.set("SearchString", this.searchString);
      }
      return urlSearchParams;
  }
}
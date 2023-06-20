export interface PaginationParams {
    pageNumber: number,
    pageSize: number,
    searchString: string
}

export class PaginationParams {
    pageNumber = 1;
    pageSize = 1000;
    searchString = "";

    constructor(pageNumber: number, pageSize: number, searchString: string = "") {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.searchString = searchString;
    }

    toUrlSearchParams(): URLSearchParams {
        let urlSearchParams = new URLSearchParams();
        if (this.pageNumber > 0)
            urlSearchParams.set("PageNumber", this.pageNumber.toString());
        if (this.pageSize > 0)
            urlSearchParams.set("PageSize", this.pageSize.toString());
        if (this.searchString !== "")
            urlSearchParams.set("SearchString", this.searchString);
        return urlSearchParams;
    }
}
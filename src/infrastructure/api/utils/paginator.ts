export class Paginator {
  private items: [];
  private readonly pageSize: number;

  constructor(items: any, pageSize: number) {
    this.items = items;
    this.pageSize = pageSize;
  }

  getNumberOfPages(): number {
    return Math.ceil(this.items.length / this.pageSize);
  }

  getPage(pageNumber: number): object {
    const start = (pageNumber - 1) * this.pageSize;
    const end = start + this.pageSize;
    const hasNextPage = this.hasNextPage(pageNumber);
    const hasPreviousPage = this.hasPreviousPage(pageNumber);
    const nextPageUrl = hasNextPage ? `/messages?page=${pageNumber + 1}` : null;
    const previousPageUrl = hasPreviousPage ? `/messages?page=${pageNumber - 1}` : null;

    return {
        page: pageNumber,
        pageSize: this.pageSize,
        total: this.items.length,
        totalPages: this.getNumberOfPages(),
        data: this.items.slice(start, end),
        hasNextPage,
        hasPreviousPage,
        nextPageUrl,
        previousPageUrl,
    };
  }

  hasNextPage(pageNumber: number): boolean {
    return pageNumber < this.getNumberOfPages();
  }

  hasPreviousPage(pageNumber: number): boolean {
    return pageNumber > 1;
  }
}
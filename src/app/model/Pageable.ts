import  { Sort } from './Sort';
 
export class Pageable {
  sort: Sort | undefined;
  pageSize: number;
  pageNumber: number;
  offset:number | undefined;
  unpaged:boolean | undefined;
  paged:boolean | undefined;
 
  static readonly DEFAULT_PAGE_SIZE = 3;
  static readonly FIRST_PAGE_NUMBER = 0;
 
  public constructor() {
    this.pageSize = Pageable.DEFAULT_PAGE_SIZE;
    this.pageNumber = Pageable.FIRST_PAGE_NUMBER;
  }
}
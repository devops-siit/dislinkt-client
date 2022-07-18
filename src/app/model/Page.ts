import  { Sort } from './Sort';
import  { Pageable } from './Pageable';
 
export class Page<T> {
  content: Array<T> | undefined;
  pageable: Pageable;
  last: boolean | undefined;
  totalPages: number | undefined;
  totalElements: number | undefined;
  first: boolean | undefined;
  sort: Sort | undefined;
  numberOfElements: number | undefined;
  size: number | undefined;
  number: number | undefined;
 
  public constructor() {
    this.pageable = new Pageable();
  }
}

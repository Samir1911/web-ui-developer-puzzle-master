import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {
  books: ReadingListBook[];

  searchForm = this.fb.group({
    term: ''
  });

  private searchTermSubject = new Subject<string>();
  
  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });
  }

  formatDate(date: void | string) : string|undefined {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) : void {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() : void{
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() : void{
    this.searchTermSubject.pipe(
      debounceTime(500), // Wait 500ms after the last event
      tap(term => {
        if (term) {
          return this.store.dispatch(searchBooks({ term }));
        }
        return this.store.dispatch(clearSearch());
      }),
      switchMap(() => of(null))
    ).subscribe();
    
    // Update the subject whenever the form control value changes
    this.searchForm.get('term')!.valueChanges.subscribe(value => {
      this.searchTermSubject.next(value);
    });
  }
}

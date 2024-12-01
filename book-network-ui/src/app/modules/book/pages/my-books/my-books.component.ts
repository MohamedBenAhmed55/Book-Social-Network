import {Component, OnInit} from '@angular/core';
import {PageResponseBookResponse} from "../../../../services/models/page-response-book-response";
import {BookService} from "../../../../services/services/book.service";
import {Router} from "@angular/router";
import {BookResponse} from "../../../../services/models/book-response";

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.scss'
})
export class MyBooksComponent implements OnInit{
  page = 0;
  size = 4;
  bookResponse: PageResponseBookResponse = {}


  constructor(
    private bookService: BookService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.findAllBooks();
  }

  findAllBooks() {
    this.bookService.findAllBooks(
      {
        page: this.page,
        size: this.size,
      }
    ).subscribe({
      next: (books) => {
        this.bookResponse = books;
      }
    })
  }

  goToFirstPage() {
    this.page = 0
  }

  goToPreviousPage() {
    this.page--;
    this.findAllBooks()
  }

  goToPage(index: number) {
    this.page = index;
    this.findAllBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllBooks()
  }

  goToLastPage() {
    this.page = this.bookResponse.totalPages as number - 1
    this.findAllBooks()
  }

  get isLastPage(): boolean {
    return this.page == this.bookResponse.totalPages as number - 1
  }


  archiveBook(book: BookResponse) {
    this.bookService.updateArchivedStatus({
      "book-id": book.id as number,
    })
    this.findAllBooks()
  }

  shareBook(book: BookResponse) {

  }

  editBook(book: BookResponse) {

  }
}

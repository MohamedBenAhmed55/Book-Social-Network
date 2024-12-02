import {Component, OnInit} from '@angular/core';
import {BorrowedBookResponse} from "../../../../services/models/borrowed-book-response";
import {PageResponseBorrowedBookResponse} from "../../../../services/models/page-response-borrowed-book-response";
import {BookService} from "../../../../services/services/book.service";
import {FeedbackRequest} from "../../../../services/models/feedback-request";
import {FeedbackService} from "../../../../services/services/feedback.service";

@Component({
  selector: 'app-borrowed-book-list',
  templateUrl: './borrowed-book-list.component.html',
  styleUrl: './borrowed-book-list.component.scss'
})
export class BorrowedBookListComponent implements OnInit {
  borrowedBooks: PageResponseBorrowedBookResponse = {};
  feedbackRequest: FeedbackRequest = {bookId: 0, comment: "", note: 0};

  page = 0
  size = 5;
  selectedBook: BorrowedBookResponse | undefined = undefined;

  constructor(
    private bookService: BookService,
    private feedbackService: FeedbackService,
  ) {

  }

  findAllBorrowedBooks() {
    this.bookService.findAllBorrowedBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (resp) => {
        this.borrowedBooks = resp;
      }
    })
  }


  ngOnInit(): void {
    this.findAllBorrowedBooks();
  }

  returnBorrowedBook(book: BorrowedBookResponse) {
    this.selectedBook = book
    this.feedbackRequest.bookId = book.id as number
  }

  goToFirstPage() {
    this.page = 0
  }

  goToPreviousPage() {
    this.page--;
    this.findAllBorrowedBooks()
  }

  goToPage(index: number) {
    this.page = index;
    this.findAllBorrowedBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllBorrowedBooks()
  }

  goToLastPage() {
    this.page = this.borrowedBooks.totalPages as number - 1
    this.findAllBorrowedBooks()
  }

  get isLastPage(): boolean {
    return this.page == this.borrowedBooks.totalPages as number - 1
  }

  returnBook(withFeedback: boolean) {
    this.bookService.returnBorrowedBook({
      'book-id': this.selectedBook?.id as number
    }).subscribe({
      next: () => {
        if (withFeedback) {
          this.giveFeedback();
        }
        this.selectedBook = undefined
        this.findAllBorrowedBooks()
      }
    })
  }

  private giveFeedback() {
    this.feedbackService.saveFeedback({
      body: this.feedbackRequest
    }).subscribe({
      next: () => {
      }
    })
  }
}

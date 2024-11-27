package com.mohamed.book.book;

import org.springframework.data.jpa.domain.Specification;

public class BookSpecification {
    // Specification Indicating that the owner of the book (id) is the same as the connected
    // user whose id is passed as param
    public static Specification<Book> withOwnerId(Integer ownerId){
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("owner").get("id"), ownerId);
    }
}

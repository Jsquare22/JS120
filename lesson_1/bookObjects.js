function createBook (title, author, read = false) {
  let book = {
    title,
    author,
    getDescription () {
      console.log(`${this.title} was written by ${this.author}.` +
      `I ${this.read ? 'have' : "haven't" } it.`);
    },
    read,
    readBook () {
      this.read = true;
    }
  };
  return book;
}


let book1 = createBook('Mythos', 'Stephen Fry');
let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris', false);
let book3 = createBook("Aunts aren't Gentlemen", 'PG Wodehouse', true);

book1.getDescription();  // "Mythos was written by Stephen Fry."
book2.getDescription();  // "Me Talk Pretty One Day was written by David Sedaris."
book3.getDescription();  // "Aunts aren't Gentlemen was written by PG Wodehouse"



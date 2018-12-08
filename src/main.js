class Quotes {
  constructor(apiCommand) {
    this.quoteApiRequest = apiCommand
    this.quotes = []
    let newQuotes = this.getMoreQuotes()
    this.quotes = this.quotes.concat(newQuotes)
  } 
  
  getMoreQuotes() {
    const newQuotesPromise = $.ajax( {
      url: this.quoteApiRequest,
      cache: false
      } )
    const newQuotes = newQuotesPromise.then(quoteData => {
      let newQuotes = []
      quoteData.forEach( quote => {
        let nextQuote = {}
        nextQuote.text = $( quote.content ).text().trim()
        nextQuote.author = quote.title
        newQuotes.push(nextQuote)
      })
      this.quotes = this.quotes.concat(newQuotes)
    })
    return newQuotes
  }
  
  newQuote() {
    if (this.quotes.length < 5) {
      let newQuotes = this.getMoreQuotes()
      this.quotes = this.quotes.concat(newQuotes)
    }
    const newQuote = this.quotes.shift()
    return newQuote
  }
}

// Activates all the pieces
// of showing a new quote
const displayNewQuote = () => {
  const newQuote = quotes.newQuote()
  displayQuote( newQuote )
  updateLink( newQuote )
}

// Displays given quote and author
const displayQuote = ( quote ) => {
  $( "#quote" ).html( quote.text )
  $( "#author" ).html( "- " + quote.author )
}

// Updates link with given quote and author
const updateLink = ( quote ) => {
  const linkBase = "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="
  let newLink = linkBase + encodeURI( quote.text + ' ' + quote.author )
  $( "#twitter-link" ).attr( "href", newLink )
}

const quotes = new Quotes("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=10")

$('#new-quote').click( () => { displayNewQuote() } )

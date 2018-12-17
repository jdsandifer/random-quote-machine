class Quotes {
  constructor(apiCommand) {
    this.quoteApiRequest = apiCommand
    this.quotes = []
    this.getMoreQuotes()
    console.log("const", this.quotes)
  }
  
  getMoreQuotes() {
    const newQuotesPromise = $.ajax({
        url: this.quoteApiRequest,
        cache: false
      })
    newQuotesPromise.then(quoteData => {
      let newQuotes = []
      quoteData.forEach( quote => {
        let nextQuote = {}
        nextQuote.text = $( quote.content ).text().trim()
        nextQuote.author = quote.title
        newQuotes.push(nextQuote)
      })
      this.quotes = this.quotes.concat(newQuotes)
    })
  }
  
  newQuote() {
    if (this.quotes.length <= 5) {
      this.getMoreQuotes()
    }
    const newQuote = this.quotes.shift()
    return newQuote
  }
}

const displayNewQuote = () => {
  const newQuote = quotes.newQuote()
  displayQuote( newQuote )
  updateLink( newQuote )
}

const displayQuote = ( quote ) => {
  $( "#quote" ).html( quote.text )
  $( "#author" ).html( "- " + quote.author )
}

const updateLink = ( quote ) => {
  const linkBase = 
      "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="
  let newLink = linkBase + encodeURI( quote.text + ' ' + quote.author )
  $( "#twitter-link" ).attr( "href", newLink )
}

// Initialize class with URL for request for 10 random quotes.
const quotes = new Quotes("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=10")

$('#new-quote').click( () => { displayNewQuote() } )

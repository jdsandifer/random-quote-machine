// Activates all the pieces
// of showing a new quote
const displayNewQuote = () => {
  let newQuotePromise = newQuoteData();
  newQuotePromise.then( quoteData => {
    let newQuote = {};
    newQuote.text = $( quoteData[0].content ).text().trim();
    newQuote.author = quoteData[0].title;
    displayQuote( newQuote );
    updateLink( newQuote );
  } );
}

// Actually does API fetch,
// and return new quote info
// in a promise
const newQuoteData = () => {
  return $.ajax( {
    url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
    cache: false
    } );
}

// Displays given quote and author
const displayQuote = ( quote ) => {
  $( "#quote" ).html( quote.text );
  $( "#author" ).html( "- " + quote.author );
}

// Updates link with given quote and author
const updateLink = ( quote ) => {
  const linkBase = "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="
  let newLink = linkBase + encodeURI( quote.text + ' ' + quote.author );
  $( "#twitter-link" ).attr( "href", newLink );
}

// On load: Get a fresh quote to start
$( document ).ready( displayNewQuote );

// Click handlers
$('#new-quote').click( () => { displayNewQuote() } );

/*================================================================
  #INIT
  ================================================================*/

var isDebug = true,

  boardWidth = 3,
  boardHeight = 3,
  boardSize = boardWidth * boardHeight,

  board = new Array( boardSize ),

  isSquare = ( boardWidth === boardHeight ),

  xTag = 1,
  oTag = boardSize + 1,

  nGame = 100,

  oWon = 0,
  xWon = 0,
  nDraw = 0,
  maxTurn = boardSize,

  whosTurn = 'x',
  lastMove = 0,

  isXFirst = true,
  nXFirst = 0,
  nXFirstXWon = 0,

  turn = 0,
  nTurn = 0,
  nXFunCall = 0,

  isAnimate = true, // unused

  winPoss = new Array();

var algorithm = {
  x: 'getRandomWalk',
  o: 'getRandomWalk'
}

function initGame() {
  turn = 0;
}

/**
 * Clear the board
 */
function clearBoard() {
  for ( i = 0; i < boardSize; i++ ) board[ i ] = 0;
}

/*================================================================
  #STRATEGY / ALGORITHM
  ================================================================*/

/**
 * Get empty cell by random
 * TESTED
 *
 * @param  {array} board game board
 * @return {number} (integer) empty cell of `board`
 */
function getRandomWalk( tBoard ) {

  var tBoard = typeof tBoard !== 'undefined' ? tBoard : board;
  var cell = getRandomInt();

  if ( tBoard[ cell ] == 0 ) {
    return cell;
  } else {
    getRandomWalk( tBoard ); 
  }
}

/**
 * Get empty cell by Horizontal line
 * TESTED
 * 
 * @param  {array}  board game board
 * @return {number} (integer) empty cell of `board`
 */
function getStraightHorizontalWalk( board ) {

  var result = false;
  var boardSize = this.board.length;

  for ( var i = 0; i < boardSize; i++ ) {
    if ( this.board[ i ] == 0 ) return i;
  }
}

/**
 * Get empty cell by Vertical line
 * TESTED
 * 
 * @param  {array}  board game board
 * @return {number} (integer) empty cell of `board`
 */
function getStraightVerticalWalk( board ) {
  
  var result = false;
  var boardSize = this.board.length;
  var boardWidth = Math.sqrt( boardSize );

  for ( var n = 0; n < boardWidth; n++  ) {
    for ( var i = 0; i < boardSize; i += boardWidth ) {
      if ( this.board[ n + i ] === 0 ) return ( n + i );
    }
  }
}

/*================================================================
  #UTILITIES
  ================================================================*/

/**
 * Get random number between `min`, `max`
 * TESTED
 *
 * @see http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
 * 
 * @param  {number} min (integer) minimum range
 * @param  {number} max (integer) maximum range
 * @return {number} (integer) random number by range
 */
function getRandomInt( min, max ) {
  var min = typeof min !== 'undefined' ? min : 0;
  var max = typeof max !== 'undefined' ? max : ( boardSize - 1 );

  return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}

/**
 * Get random boolean
 * TESTED
 * 
 * @return {boolean} random boolean value (true / false)
 */
function getRandomBoolean() {
  return Math.random() >= 0.5;
}

/**
 * Get random boolean number
 * TESTED
 * 
 * @return {number} (integer) random boolean value (1 / 0)
 */
function getRandomBooleanNumber() {

  if ( getRandomBoolean() ) {
    return 1;
  } else {
    return 0;
  }
}

/**
 * Get all index of array
 * TESTED
 * 
 * @param  {array}  arr    array that we want to looking into
 * @param  {number} needle (integer) value that we want to find
 * @return {array}  all index of `needle` in `arr`
 */
function getAllIndexOf( arr, needle ) {

  var indexes = [];

  var idx = arr.indexOf( needle );
  while ( idx != -1 ) {
    indexes.push( idx );
    idx = arr.indexOf( needle, idx + 1 );
  }

  return indexes;
}

/**
 * Is array1 contain a array2
 * TESTED
 *
 * @see http://stackoverflow.com/questions/16312528/check-if-an-array-contains-any-elements-in-another-array-in-javascript
 * @see http://stackoverflow.com/questions/237104/array-containsobj-in-javascript
 * 
 * @param  {array}   source    source that we want to looking into
 * @param  {array}   needleArr array that we want to find
 * @return {boolean} is contain (true / false)
 */
function isArrayContainArray( source, needleArr ) {

  var result = source.filter(function( item ) {
    return $.inArray( item, needleArr ) > -1;
  });

  return ( result.length === needleArr.length );
}

/**
 * Check both array are equal
 * NOT USED
 *
 * @see http://stackoverflow.com/questions/1773069/using-jquery-to-compare-two-arrays-of-javascript-objects
 * 
 * @param  {array}   arr1 first array
 * @param  {array}   arr2 second array
 * @return {boolean} both array are equal or not
 */
// function isArrayEqual( arr1, arr2 ) {
//   return $( arr1 ).not( arr2 ).length === 0 && $( arr2 ).not( arr1 ).length === 0;
// }

/**
 * Execute function by name
 *
 * @see http://stackoverflow.com/questions/359788/how-to-execute-a-javascript-function-when-i-have-its-name-as-a-string
 * @see http://stackoverflow.com/questions/496961/call-a-javascript-function-name-using-a-string
 *
 * @example executeFunctionByName( functionName, window, variable );
 * 
 * @param  {string}    functionName name of function
 * @param  {context}   context      context
 * @return {arguments} argument of function that we want to pass
 */
function executeFunctionByName( functionName, context , args ) {

  var args = [].slice.call( arguments ).splice( 2 );

  var namespaces = functionName.split( '.' );
  var func = namespaces.pop();
  for ( var i = 0; i < namespaces.length; i++ ) {
    context = context[ namespaces[ i ] ];
  }
  return context[ func ].apply( this, args );
}

/*================================================================
  #DEBUG
  ================================================================*/

/**
 * Display variable
 * 
 * @param  {var}     e       variable
 * @param  {boolean} isTable type of display
 */
function dd( e, isTable ) {

  var isTable = typeof isTable !== 'undefined' ? isTable : false;

  if ( isTable ) {
    console.table( e );
  } else {
    console.log( e );
  }
}

/*================================================================
  #TEST PURPOSE
  ================================================================*/

/**
 * Set value of game board
 * 
 * @param {array} arr array of board value
 */
function setBoard( arr ) {

  if ( arr.length == boardSize ) {
    board = arr;
  } else {
    return false;
  }
}

/**
 * Set size (width and height) of game board
 * 
 * @param {number} width  (integer) board width
 * @param {number} height (integer) board height
 */
function setBoardSize( width, height ) {

  boardWidth = width;
  boardHeight = height;
  boardSize = boardWidth * boardHeight;
}

/*================================================================
  #GAME
  ================================================================*/

/**
 * Generate possible winning situation
 */
function generateWinPossible() {

  var winPos = [];

  if ( isSquare ) {

    // vertical win
    winPos = [];
    for ( var n = 0; n < boardWidth; n++ ) {
      for ( var i = n; i < boardSize; i += boardWidth ) winPos.push( i );

      winPoss.push( winPos );
      winPos = [];
    }

    // horizontal win
    winPos = [];
    for ( var n = 0; n < boardSize; n += boardWidth ) {
      for ( var i = 0; i < boardWidth; i++ ) winPos.push( n + i );

      winPoss.push( winPos );
      winPos = [];
    }

    // titled win - left to right
    winPos = [ 0, 4, 8 ];
    winPoss.push( winPos );

    // titled win - right to left
    winPos = [ 2, 4, 6 ];
    winPoss.push( winPos );

    // 3 x 3 game
    // 
    // 0 3 6
    // 1 4 7
    // 2 5 8
    // 0 1 2
    // 3 4 5
    // 6 7 8
    // 0 4 8
    // 2 4 6
  }
}

/**
 * Check winner by tag
 * TESTED
 * 
 * @param  {number}  tag (integer) value of tag (e.g. 'x' = 1)
 * @return {boolean} is winning ?
 */
function isWin( tag ) {

  var indexes = getAllIndexOf( board, tag );
  var result = false;

  if ( indexes.length >= Math.sqrt( boardSize ) ) {

    $.each( winPoss, function( i ) {

      if ( isArrayContainArray( indexes, $( this ) ) ) {
        result = true;
        return false;
      }
    });  
  }

  return result;
}

/**
 * Set who's the first play
 */
function setWhoFirst() {
  isXFirst = getRandomBooleanNumber();

  if ( isXFirst ) nXFirst++;
}

/**
 * Set player algorithm
 * 
 * @param {string} player                there have 'x' and 'o' that you can set
 * @param {string} algorithmFunctionName name of your function (algorithm function)
 */
function setAlgorithm( player, algorithmFunctionName ) {
  algorithm[ player ] = algorithmFunctionName;
}

/**
 * Get empty cell that provide by X's algorithm function
 * 
 * @return {number} (integer) empty cell that generate by X algorithm function
 */
function getXWalk() {
  return executeFunctionByName( algorithm.x, window, board );
}

/**
 * Get empty cell that provide by O's algorithm function
 * 
 * @return {number} (integer) empty cell that generate by O algorithm function
 */
function getOWalk() {
  return executeFunctionByName( algorithm.o, window, board );
}

/**
 * Game loop
 * 
 * @return {boolean} is this turn can make a winner ?
 */
function makeTurn() {

  var cell;
  var callFunc;

  // if X first
  if ( ( turn + isXFirst ) % 2 ) {
    tag = xTag;
    whosTurn = 'x';
    callFunc = 'getXWalk';

  } else {
    tag = oTag;
    whosTurn = 'o';
    callFunc = 'getOWalk';
  }

  while( true ) {
    cell = executeFunctionByName( callFunc, window );

    if ( whosTurn == 'x' ) nXFunCall++;

    if ( board[ cell ] === 0 ) {
      board[ cell ] = tag;
      lastMove = cell;
      break;
    }
  }

  turn++;

  return isWin( tag );
}

/**
 * End game
 */
function gameOver() {

  if ( whosTurn == 'x' ) {
    xWon++;
    if ( isXFirst ) nXFirstXWon++;
  } else {
    oWon++;
  }
}

/**
 * Display value of game board
 * 
 * @param {string} type type of display
 */
function displayBoard( type ) {

  var result = '';

  if ( type === 'raw' ) {
    for ( var i = 0; i < boardSize; i++ ) result += board[ i ] + ', ';
  } else {
    for ( var n = 0; n < boardSize; n += boardWidth ) {
      for ( var i = 0; i < boardWidth; i++ ) {
        result += board[ i + n ] + ' | ';
      }

      result += '\n';
    }
  }

  console.log( result );
}

/**
 * Start a game
 */
function startGame() {

  for ( var n = 0; n < nGame; n++ ) {

    // Game settings
    oneGame(); 
    nTurn += turn;
  }
}

/**
 * Start one round of game
 */
function oneGame() {

  clearBoard();
  setWhoFirst();
  initGame();
  
  for ( var i = 0; i < maxTurn; i++ ) {

    var hasWinner = makeTurn();

    if ( hasWinner ) {
      gameOver();
      break;
    }

    if ( i == maxTurn - 1 ) {
      nDraw++;
    }
  }
}

/**
 * Game report (stat of game)
 */
function gameReport() {

  $( '.bot-name' ).text( algorithm.x );
  $( '.enemy-name' ).text( algorithm.o );

  console.log( 'nGame : ' + nGame );
  $( '.ngame' ).text( nGame );

  console.log( 'nXFirst : ' + nXFirst );
  $( '.nstart-first' ).text( nXFirst );

  var xWonPercent = Math.round( xWon / nGame * 100 );
  console.log( 'x won : ' + xWon + ' (' + xWonPercent + '%)' + ' - ' + algorithm.x );
  $( '.nwin' ).text( xWon + ' (' + xWonPercent + '%)' );

  var oWonPercent = Math.round( oWon / nGame * 100 );
  console.log( 'o won : ' + oWon + ' (' + oWonPercent + '%)' + ' - ' + algorithm.o );
  $( '.nloss' ).text( oWon + ' (' + oWonPercent + '%)' );

  var drawPercent = Math.round( nDraw / nGame * 100 );
  console.log( 'draw : ' + nDraw + ' (' + drawPercent + '%)' );
  $( '.ndraw' ).text( nDraw + ' (' + drawPercent + '%)' );

  var nXFirstXWonPercent = Math.round( nXFirstXWon / nXFirst * 100 );
  console.log( 'if X first, X win : ' + nXFirstXWon + ' (' + nXFirstXWonPercent + '%)' );
  $( '.nfirst-win' ).text( nXFirstXWon + ' (' + nXFirstXWonPercent + '%)' );

  var nXNFirstXWon = xWon - nXFirstXWon;
  var nXNFirstXWonPercent = Math.round( nXNFirstXWon / ( nGame - nXFirst ) * 100 );
  console.log( 'if X not first, X win : ' + nXNFirstXWon + ' (' + nXNFirstXWonPercent + '%)' );
  $( '.nnfirst-win' ).text( nXNFirstXWon + ' (' + nXNFirstXWonPercent + '%)' );

  var nAvgTurnPerGame = Math.round( nTurn / nGame );
  console.log( 'avg turn per game : ' + nAvgTurnPerGame );
  $( '.nturn-pgame' ).text( nAvgTurnPerGame );

  var nXFunctionCalledPerGame = Math.round( nXFunCall / nGame );
  console.log( 'x\'s function called per game : ' + nXFunctionCalledPerGame );
}

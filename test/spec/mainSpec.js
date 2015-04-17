/**
 * Custom Matcher
 *  
 * @link http://stackoverflow.com/questions/20941343/jasmine-expectresultcode-tobe200-or-409/20941702#20941702
 * @link http://stackoverflow.com/questions/21236794/jasmine-any-boolean-jasmine-anyboolean
 */

var obj,
  
  boardWidth = 3,
  boardHeight = 3,
  boardSize = boardWidth * boardHeight,

  nTest = 10;

beforeEach(function() {

  //initialize object
  obj = new Object();

  jasmine.addMatchers({
    toBeBetween: function ( lower,higher ) {
      return {
        compare: function ( actual, lower, higher ) {
          return {
            pass: ( actual >= lower && actual <= higher ),
            message: actual + ' is not between ' + lower + ' and ' + higher
          }
        }
      };
    },
    toBeBoolean : function () {
      return {
        compare : function ( actual, expected ) {
          return {
            pass : ( typeof actual === 'boolean' ),
            message : 'Expected ' + actual + ' is not boolean'
          };
        }
      };
    }
  });
});

describe( 'OX Monster - STRATEGY / ALGORITHM', function() {

  it( 'getRandomWalk() : between 0 and boardSize', function() {

    board = [ 1, 1, 0, 1, 0, 0, 1, 0, 1 ];
    for ( i = 0; i < nTest; i++ ) {
      var data = getRandomWalk( board );

      // prevent recursive function
      if ( typeof data !== 'undefined' ) {
        expect( data ).toBeBetween( 0, boardSize );
        expect( data ).toBeGreaterThan( 1 );
        expect( data ).toBeLessThan( 8 );
        expect( data ).not.toEqual( 0 );
        expect( data ).not.toEqual( 1 );
        expect( data ).not.toEqual( 3 );
        expect( data ).not.toEqual( 6 );
        expect( data ).not.toEqual( 8 );
      }
    }
  });

  it( 'getStraightHorizontalWalk( board ) : return next cell by horizontal line', function() {

    board = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
    expect( getStraightHorizontalWalk( board ) ).toEqual( 0 );

    board = [ 1, 1, 1, 1, 0, 0, 0, 0, 0 ];
    expect( getStraightHorizontalWalk( board ) ).toEqual( 4 );

    board = [ 1, 1, 0, 1, 0, 0, 1, 0, 0 ];
    expect( getStraightHorizontalWalk( board ) ).toEqual( 2 );

    board = [ 0, 0, 1, 0, 0, 1, 0, 0, 1 ];
    expect( getStraightHorizontalWalk( board ) ).toEqual( 0 );

    board = [ 1, 1, 1, 1, 1, 1, 0, 1, 0 ];
    expect( getStraightHorizontalWalk( board ) ).toEqual( 6 );

    board = [ 1, 0, 1, 0, 0, 1, 1, 0, 1 ];
    expect( getStraightHorizontalWalk( board ) ).toEqual( 1 );

    board = [ 1, 1, 1, 1, 1, 0, 0, 1, 0 ];
    expect( getStraightHorizontalWalk( board ) ).toEqual( 5 );

    board = [ 1, 1, 1, 1, 0, 0, 1, 1, 0 ];
    expect( getStraightHorizontalWalk( board ) ).toEqual( 4 );

    board = [ 1, 0, 0, 1, 1, 0, 0, 1, 0 ];
    expect( getStraightHorizontalWalk( board ) ).toEqual( 1 );
  });

  it( 'getStraightVerticalWalk( board ) : return next cell by vertical line', function() {

    board = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
    expect( getStraightVerticalWalk( board ) ).toEqual( 0 );

    board = [ 1, 1, 1, 1, 0, 0, 0, 0, 0 ];
    expect( getStraightVerticalWalk( board ) ).toEqual( 6 );

    board = [ 1, 1, 0, 1, 0, 0, 1, 0, 0 ];
    expect( getStraightVerticalWalk( board ) ).toEqual( 4 );

    board = [ 0, 0, 1, 0, 0, 1, 0, 0, 1 ];
    expect( getStraightVerticalWalk( board ) ).toEqual( 0 );

    board = [ 1, 1, 1, 1, 1, 1, 0, 1, 0 ];
    expect( getStraightVerticalWalk( board ) ).toEqual( 6 );

    board = [ 1, 0, 1, 0, 0, 1, 1, 0, 1 ];
    expect( getStraightVerticalWalk( board ) ).toEqual( 3 );

    board = [ 1, 1, 1, 1, 1, 0, 0, 1, 0 ];
    expect( getStraightVerticalWalk( board ) ).toEqual( 6 );

    board = [ 1, 1, 1, 1, 0, 0, 1, 1, 0 ];
    expect( getStraightVerticalWalk( board ) ).toEqual( 4 );

    board = [ 1, 0, 0, 1, 1, 0, 0, 1, 0 ];
    expect( getStraightVerticalWalk( board ) ).toEqual( 6 );
  });
});


describe( 'OX Monster - UTILITIES', function() {

  it( 'getRandomInt() : between 0 and boardSize', function() {
    for ( i = 0; i < nTest; i++ ) {
      var data = getRandomInt();
      expect( data ).toBeBetween( 0, boardSize );
    }
  });

  it( 'getRandomBoolean() : boolean', function() {
    for ( i = 0; i < nTest; i++ ) {
      var data = getRandomBoolean();
      expect( data ).toBeBoolean();
    }
  });

  it( 'getRandomBooleanNumber() : 0 / 1', function() {
    for ( i = 0; i < nTest; i++ ) {
      var data = getRandomBooleanNumber();
      expect( data ).toMatch( /0|1/ );
    }
  });

  it( 'getAllIndexOf() : all index of value in array', function() {
    
    var board;
    var needle = 1;

    board = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
    expect( getAllIndexOf( board, needle ) ).toEqual( [] );

    board = [ 1, 1, 1, 1, 0, 0, 0, 0, 0 ];
    expect( getAllIndexOf( board, needle ) ).toEqual( [ 0, 1, 2, 3 ] );

    board = [ 1, 1, 0, 1, 0, 0, 1, 0, 0 ];
    expect( getAllIndexOf( board, needle ) ).toEqual( [ 0, 1, 3, 6 ] );

    board = [ 0, 0, 1, 0, 0, 1, 0, 0, 1 ];
    expect( getAllIndexOf( board, needle ) ).toEqual( [ 2, 5, 8 ] );

    board = [ 1, 1, 1, 1, 1, 1, 0, 1, 0 ];
    expect( getAllIndexOf( board, needle ) ).toEqual( [ 0, 1, 2, 3, 4, 5, 7 ] );

    board = [ 1, 0, 1, 0, 0, 1, 1, 0, 1 ];
    expect( getAllIndexOf( board, needle ) ).toEqual( [ 0, 2, 5, 6, 8 ] );

    board = [ 1, 1, 1, 1, 1, 0, 0, 1, 0 ];
    expect( getAllIndexOf( board, needle ) ).toEqual( [ 0, 1, 2, 3, 4, 7 ] );

    board = [ 1, 1, 1, 1, 0, 0, 1, 1, 0 ];
    expect( getAllIndexOf( board, needle ) ).toEqual( [ 0, 1, 2, 3, 6, 7 ] );

    board = [ 1, 0, 0, 1, 1, 0, 0, 1, 0 ];
    expect( getAllIndexOf( board, needle ) ).toEqual( [ 0, 3, 4, 7 ] );
  });

  it( 'isArrayContainArray() : (true / false) is array1 contain all value of array2', function() {
    
    var winPos;
    var indexes;

    winPos = [ 0, 3, 6 ];

    expect( isArrayContainArray( [], winPos ) ).toBeFalsy();
    expect( isArrayContainArray( [ 0 ], winPos ) ).toBeFalsy();
    expect( isArrayContainArray( [ 0, 3 ], winPos ) ).toBeFalsy();
    expect( isArrayContainArray( [ 1, 2, 6 ], winPos ) ).toBeFalsy();
    expect( isArrayContainArray( [ 0, 1, 3, 4, 5 ], winPos ) ).toBeFalsy();

    expect( isArrayContainArray( [ 0, 3, 6 ], winPos ) ).toBeTruthy();
    expect( isArrayContainArray( [ 0, 1, 3, 5, 6 ], winPos ) ).toBeTruthy();

    winPos = [ 1, 4, 7 ];
    expect( isArrayContainArray( [ 5, 1 ], winPos ) ).toBeFalsy();
    expect( isArrayContainArray( [ 1, 5, 8 ], winPos ) ).toBeFalsy();
    expect( isArrayContainArray( [ 1, 2, 4, 6 ], winPos ) ).toBeFalsy();

    expect( isArrayContainArray( [ 1, 4, 7 ], winPos ) ).toBeTruthy();
    expect( isArrayContainArray( [ 1, 2, 4, 7 ], winPos ) ).toBeTruthy();
    expect( isArrayContainArray( [ 1, 2, 3, 4, 5, 7, 8 ], winPos ) ).toBeTruthy();

    winPos = [ 2, 5, 8 ];
    expect( isArrayContainArray( [ 2 ], winPos ) ).toBeFalsy();
    expect( isArrayContainArray( [ 1, 4, 8 ], winPos ) ).toBeFalsy();
    expect( isArrayContainArray( [ 1, 2, 4, 5, 7 ], winPos ) ).toBeFalsy();

    expect( isArrayContainArray( [ 2, 5, 8 ], winPos ) ).toBeTruthy();
    expect( isArrayContainArray( [ 1, 2, 5, 8 ], winPos ) ).toBeTruthy();
    expect( isArrayContainArray( [ 1, 2, 4, 5, 8 ], winPos ) ).toBeTruthy();

    winPos = [ 0, 1, 2 ];
    expect( isArrayContainArray( [ 2 ], winPos ) ).toBeFalsy();
    expect( isArrayContainArray( [ 1, 4, 8 ], winPos ) ).toBeFalsy();
    expect( isArrayContainArray( [ 0, 2, 3, 5, 7 ], winPos ) ).toBeFalsy();

    expect( isArrayContainArray( [ 0, 1, 2 ], winPos ) ).toBeTruthy();
    expect( isArrayContainArray( [ 0, 1, 2, 4 ], winPos ) ).toBeTruthy();
    expect( isArrayContainArray( [ 0, 1, 2, 4, 5, 7, 8 ], winPos ) ).toBeTruthy();

    winPos = [ 3, 4, 5 ];
    expect( isArrayContainArray( [ 2 ], winPos ) ).toBeFalsy();
    expect( isArrayContainArray( [ 1, 4, 8 ], winPos ) ).toBeFalsy();
    expect( isArrayContainArray( [ 0, 2, 3, 5, 7 ], winPos ) ).toBeFalsy();    

    expect( isArrayContainArray( [ 3, 4, 5 ], winPos ) ).toBeTruthy();
    expect( isArrayContainArray( [ 0, 3, 4, 5, 7 ], winPos ) ).toBeTruthy();
    expect( isArrayContainArray( [ 3, 4, 5, 6, 7, 8 ], winPos ) ).toBeTruthy();

    winPos = [ 6, 7, 8 ];
    expect( isArrayContainArray( [ 2 ], winPos ) ).toBeFalsy();
    expect( isArrayContainArray( [ 1, 4, 8 ], winPos ) ).toBeFalsy();
    expect( isArrayContainArray( [ 0, 2, 3, 5, 7 ], winPos ) ).toBeFalsy();    

    expect( isArrayContainArray( [ 6, 7, 8 ], winPos ) ).toBeTruthy();
    expect( isArrayContainArray( [ 0, 2, 6, 7, 8 ], winPos ) ).toBeTruthy();
    expect( isArrayContainArray( [ 0, 2, 3, 6, 7, 8 ], winPos ) ).toBeTruthy();

    winPos = [ 0, 4, 8 ];
    expect( isArrayContainArray( [ 2 ], winPos ) ).toBeFalsy();
    expect( isArrayContainArray( [ 1, 4, 8 ], winPos ) ).toBeFalsy();
    expect( isArrayContainArray( [ 0, 2, 3, 5, 7 ], winPos ) ).toBeFalsy();    

    expect( isArrayContainArray( [ 0, 4, 8 ], winPos ) ).toBeTruthy();
    expect( isArrayContainArray( [ 0, 1, 2, 4, 8 ], winPos ) ).toBeTruthy();
    expect( isArrayContainArray( [ 0, 2, 3, 4, 7, 8 ], winPos ) ).toBeTruthy();

    winPos = [ 2, 4, 8 ];
    expect( isArrayContainArray( [ 2 ], winPos ) ).toBeFalsy();
    expect( isArrayContainArray( [ 1, 4, 8 ], winPos ) ).toBeFalsy();
    expect( isArrayContainArray( [ 0, 2, 3, 5, 7 ], winPos ) ).toBeFalsy();    

    expect( isArrayContainArray( [ 2, 4, 8 ], winPos ) ).toBeTruthy();
    expect( isArrayContainArray( [ 2, 4, 5, 8 ], winPos ) ).toBeTruthy();
    expect( isArrayContainArray( [ 2, 4, 5, 6, 7, 8 ], winPos ) ).toBeTruthy();
  });
});

describe( 'OX Monster - APP', function() {

  it( 'isWin( tag ) : (true / false) is this tag win', function() {

    var board;
    generateWinPossible();
    setBoardSize( boardWidth, boardWidth );

    board = [ 0, 1, 10, 0, 0, 10, 0, 1, 10 ];
    setBoard( board );
    expect( isWin( 1 ) ).toBeFalsy();
    expect( isWin( 10 ) ).toBeTruthy();

    board = [ 1, 10, 10, 1, 1, 10, 10, 1, 10 ];
    setBoard( board );
    expect( isWin( 1 ) ).toBeFalsy();
    expect( isWin( 10 ) ).toBeTruthy();

    board = [ 0, 1, 10, 10, 0, 10, 1, 1, 1 ];
    setBoard( board );
    expect( isWin( 1 ) ).toBeTruthy();
    expect( isWin( 10 ) ).toBeFalsy();

    board = [ 1, 1, 10, 10, 1, 1, 10, 1, 10 ];
    setBoard( board );
    expect( isWin( 1 ) ).toBeTruthy();
    expect( isWin( 10 ) ).toBeFalsy();

    board = [ 1, 0, 0, 10, 10, 10, 1, 1, 0 ];
    setBoard( board );
    expect( isWin( 1 ) ).toBeFalsy();
    expect( isWin( 10 ) ).toBeTruthy();

    board = [ 0, 1, 0, 10, 10, 10, 0, 0, 1 ];
    setBoard( board );
    expect( isWin( 1 ) ).toBeFalsy();
    expect( isWin( 10 ) ).toBeTruthy();

    board = [ 1, 10, 10, 1, 10, 1, 10, 10, 1 ];
    setBoard( board );
    expect( isWin( 1 ) ).toBeFalsy();
    expect( isWin( 10 ) ).toBeTruthy();

    board = [ 0, 10, 1, 10, 1, 10, 10, 1, 1 ];
    setBoard( board );
    expect( isWin( 1 ) ).toBeFalsy();
    expect( isWin( 10 ) ).toBeFalsy();

    board = [ 1, 0, 0, 1, 0, 1, 10, 10, 10 ];
    setBoard( board );
    expect( isWin( 1 ) ).toBeFalsy();
    expect( isWin( 10 ) ).toBeTruthy();

    board = [ 10, 0, 10, 1, 10, 0, 1, 1, 1 ];
    setBoard( board );
    expect( isWin( 1 ) ).toBeTruthy();
    expect( isWin( 10 ) ).toBeFalsy();

    board = [ 1, 10, 1, 1, 10, 10, 1, 0, 0 ];
    setBoard( board );
    expect( isWin( 1 ) ).toBeTruthy();
    expect( isWin( 10 ) ).toBeFalsy();

    board = [ 1, 1, 10, 1, 10, 1, 10, 10, 1 ];
    setBoard( board );
    expect( isWin( 1 ) ).toBeFalsy();
    expect( isWin( 10 ) ).toBeTruthy();

    board = [ 10, 1, 10, 1, 10, 10, 10, 1, 1 ];
    setBoard( board );
    expect( isWin( 1 ) ).toBeFalsy();
    expect( isWin( 10 ) ).toBeTruthy();

    board = [ 10, 0, 10, 1, 10, 0, 1, 1, 1 ];
    setBoard( board );
    expect( isWin( 1 ) ).toBeTruthy();
    expect( isWin( 10 ) ).toBeFalsy();

    board = [ 10, 10, 1, 1, 1, 10, 1, 10, 10 ];
    setBoard( board );
    expect( isWin( 1 ) ).toBeTruthy();
    expect( isWin( 10 ) ).toBeFalsy();

    board = [ 0, 1, 1, 10, 10, 10, 0, 10, 1 ];
    setBoard( board );
    expect( isWin( 1 ) ).toBeFalsy();
    expect( isWin( 10 ) ).toBeTruthy();

    board = [ 1, 10, 10, 1, 10, 1, 10, 1, 1 ];
    setBoard( board );
    expect( isWin( 1 ) ).toBeFalsy();
    expect( isWin( 10 ) ).toBeTruthy();

    board = [ 1, 10, 1, 1, 10, 10, 10, 10, 1 ];
    setBoard( board );
    expect( isWin( 1 ) ).toBeFalsy();
    expect( isWin( 10 ) ).toBeTruthy();
    
    board = [ 0, 1, 10, 0, 0, 10, 1, 1, 10 ];
    setBoard( board );
    expect( isWin( 1 ) ).toBeFalsy();
    expect( isWin( 10 ) ).toBeTruthy();
    
    board = [ 10, 1, 1, 10, 10, 10, 1, 0, 1 ];
    setBoard( board );
    expect( isWin( 1 ) ).toBeFalsy();
    expect( isWin( 10 ) ).toBeTruthy();

    board = [ 10, 1, 10, 10, 1, 1, 1, 10, 1 ];
    setBoard( board );
    expect( isWin( 1 ) ).toBeFalsy();
    expect( isWin( 10 ) ).toBeFalsy();

    board = [ 1, 10, 10, 10, 1, 10, 1, 1, 1 ];
    setBoard( board );
    expect( isWin( 1 ) ).toBeTruthy();
    expect( isWin( 10 ) ).toBeFalsy();

    board = [ 10, 1, 10, 10, 10, 0, 1, 1, 1 ];
    setBoard( board );
    expect( isWin( 1 ) ).toBeTruthy();
    expect( isWin( 10 ) ).toBeFalsy();

    board = [ 0, 1, 10, 0, 10, 0, 0, 1, 10 ];
    setBoard( board );
    expect( isWin( 1 ) ).toBeFalsy();
    expect( isWin( 10 ) ).toBeFalsy();

    board = [ 10, 0, 0, 1, 10, 1, 1, 0, 10 ];
    setBoard( board );
    expect( isWin( 1 ) ).toBeFalsy();
    expect( isWin( 10 ) ).toBeTruthy();

    board = [ 1, 1, 1, 0, 10, 0, 0, 10, 0 ];
    setBoard( board );
    expect( isWin( 1 ) ).toBeTruthy();
    expect( isWin( 10 ) ).toBeFalsy();

    board = [ 10, 1, 10, 10, 10, 1, 1, 10, 1 ];
    setBoard( board );
    expect( isWin( 1 ) ).toBeFalsy();
    expect( isWin( 10 ) ).toBeFalsy();

    board = [ 1, 1, 10, 10, 10, 10, 1, 10, 1 ];
    setBoard( board );
    expect( isWin( 1 ) ).toBeFalsy();
    expect( isWin( 10 ) ).toBeTruthy();

    board = [ 1, 10, 0, 1, 0, 10, 1, 0, 10 ];
    setBoard( board );
    expect( isWin( 1 ) ).toBeTruthy();
    expect( isWin( 10 ) ).toBeFalsy();

    board = [ 10, 1, 10, 10, 1, 1, 10, 10, 1 ];
    setBoard( board );
    expect( isWin( 1 ) ).toBeFalsy();
    expect( isWin( 10 ) ).toBeTruthy();
  });
});

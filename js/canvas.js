var canv,
  ctx,
  canvData,
  canvPlayer,
  isCanvDebug;

function init() {

  if ( isCanvDebug ) console.log( 'init()' );

  if ( canvData == null ) {
    canvData = [];

    for ( var i = 0; i < 9; i ++ ) {
      var x = ( i % 3 ) * 120 + 20;
      var y = Math.floor( i / 3 ) * 120 + 20;
      canvData.push( new Tile( x, y ) );
    }
  }
}

function reset() {

  if ( isCanvDebug ) console.log( 'reset()' );

  canvData = null;
  init();
  tick();
}

function tick() {

  if ( isCanvDebug ) console.log( 'tick()' );

  window.requestAnimationFrame( tick );

  update();
  render();
}

function update() {

  if ( isCanvDebug ) console.log( 'update()' );

  for ( var i = canvData.length; i--; ) {
    canvData[ i ].update();
  }
}

function render() {

  if ( isCanvDebug ) console.log( 'render()' );

  ctx.clearRect( 0, 0, canv.width, canv.height );

  for ( var i = canvData.length; i--; ) {
    canvData[ i ].draw( ctx );
  }
}

function mouseDown( evt ) {
  var el = evt.target;
  var px = evt.clientX - el.offsetLeft;
  var py = evt.clientY - el.offsetTop;

  console.log( px + ", " + py );

  if ( px % 120 > 20 && py % 120 >= 20 ) {
    var idx = Math.floor( px / 120 );
    idx += Math.floor( py / 120 ) * 3;

    if ( canvData[ idx ].hasData() ) {
      return;
    }

    canvData[ idx ].flip( canvPlayer );
    canvPlayer = canvPlayer === Tile.NOUGHT ? Tile.CROSS : Tile.NOUGHT;
  }
}

function Tile( x, y ) {

  if ( isCanvDebug ) console.log( 'Tile' );

  var x = x;
  var y = y;

  var tile = Tile.BLANK;
  var anim = 0;

  if ( tile == null ) {
    
    var _c = document.createElement( 'canvas' );
    _c.width = 100;
    _c.height = 100;

    _ctx = _c.getContext( '2d' );
    _ctx.fillStyle = '#59A0BD';
    _ctx.lineWidth = 4;
    _ctx.strokeStyle = 'white';
    _ctx.lineCap = 'round';

    // Blank
    _ctx.fillRect( 0, 0, 100, 100 );
    Tile.BLANK = new Image();
    Tile.BLANK.src = _c.toDataURL();

    // Nought
    _ctx.fillRect( 0, 0, 100, 100 );
    _ctx.beginPath();
    _ctx.arc( 50, 50, 30, 0, 2 * Math.PI );
    _ctx.stroke();

    Tile.NOUGHT = new Image();
    Tile.NOUGHT.src = _c.toDataURL();

    // Cross
    _ctx.fillRect( 0, 0, 100, 100 );
    _ctx.beginPath();
    _ctx.moveTo( 20, 20 );
    _ctx.lineTo( 80, 80 );
    _ctx.moveTo( 80, 20 );
    _ctx.lineTo( 20, 80 );
    _ctx.stroke();

    Tile.CROSS = new Image();
    Tile.CROSS.src = _c.toDataURL();

    tile = Tile.BLANK;
    // tile = Tile.NOUGHT;
    // tile = Tile.CROSS;
  }

  this.hasData = function() {

    if ( isCanvDebug ) console.log( 'Tile - hasData' );

    return tile !== Tile.BLANK;
  }

  this.flip = function( next ) {

    if ( isCanvDebug ) console.log( 'Tile - flip' );

    tile = next;
    anim = 1;
  }

  this.update = function() {

    if ( isCanvDebug ) console.log( 'Tile - update' );

    if ( anim > 0 ) {
      anim -= 0.02;
    }
  }

  this.draw = function( ctx ) {

    if ( isCanvDebug ) console.log( 'Tile - draw' );

    if ( anim <= 0 ) {
      ctx.drawImage( tile, x, y );
      return;
    }

    var tTile = anim > 0.5 ? Tile.BLANK : tile;
    var res = 2;
    var p = - Math.abs( 2 * anim - 1 ) + 1;

    for ( var i = 0; i < 100; i += res ) {

      var j = anim > 0.5 ? 100 - i : i;
      var j = 50 - ( anim > 0.5 ? 100 - i : i );

      ctx.drawImage( tTile, i, 0, res, 100,
        x + i - ( p * i ) + ( 50 * p ),
        y - j * p * 0.2,
        res,
        100 + j * p * 0.4
       );
    }
  }
}

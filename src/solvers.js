/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = undefined;
  var count = 0;

  var nextBoard = function(pos){
    var row = Math.floor(pos/n);
    var col = pos % n;
    this.togglePiece(row, col);
    count++;

    if (this.hasAnyRowConflicts() || this.hasAnyColConflicts()){
      this.togglePiece(row, col);
      count--;
      return;
    } 

    if (count === n) {
      solution = this.rows();
      return;
    }
    
    for(let i = pos; i < (n * n - 1); i++){
      if(count === n) {
        return;
      }
      nextBoard.call(this, ++pos);
    }

  }
  //start recursive algorithm with pos 0
  nextBoard.call(new Board({n:n}), 0);

  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var count = 0;
  
  var nextBoard = function(pos){
    var row = Math.floor(pos/n);
    var col = pos % n;
    this.togglePiece(row, col);
    count++;

    if (this.hasAnyRowConflicts() || this.hasAnyColConflicts()){
      this.togglePiece(row, col);
      count--;
      return;
    } 

    if (count === n) {
      solutionCount++;
      return;
    }
    
    for(let i = pos; i < (n * n - 1); i++){
      if(count === n) {
        return;
      }
      nextBoard.call(this, ++pos);
    }

  }
  //start recursive algorithm with pos 0
  for(var i = 0; i < (n*n - n); i++ ) {
    nextBoard.call(new Board({n:n}), i);
  }
  

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

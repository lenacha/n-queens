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

  var backtracker = function (row) {
    if (row === n) {
      solution = this.rows();
      return;
    }

    for (var col = 0; col < n; col++) {
      if(solution !== undefined) {
        return;
      }
      this.togglePiece(row, col);
      if ( this.hasAnyColConflicts() || this.hasAnyRowConflicts()) {
        this.togglePiece(row, col);
      } else {
        backtracker.call(this, ++row);
      }
    }
  }
  backtracker.call(new Board({n:n}), 0);

  // define function backtrack that takes row
    //check if row === n
      //set solution var to this.rows()
      //return

    //iterate over columns
      //toggle piece at row, column(from loop)
      //check for conflicts
        //is it has, untoggle piece
      //else
        //call backtrack with row incremented

  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme

  var backtrack = function(row){
    // check if row === n
      // if so, increment solutionCount
      // return
    if(row === n) {
      solutionCount++;
      return;
    };

    for (var col = 0; col < n; col++) {
      this.togglePiece(row, col)
      if(this.hasAnyRooksConflicts()) {
        this.togglePiece.call(this, row, col);
      } else {
        backtrack.call(this, row + 1);
        this.togglePiece.call(this, row, col);
      }
    }
    //iterate over columns
      //toggle piece at row, column(from loop)
      //check for conflicts
        //is it has, untoggle piece
      //else
        //call backtrack with row incremented
        //untoggle after recursive calls
  }
  backtrack.call(new Board({n:n}), 0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

countNRooksSolutions(3);

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme
  var count = 0;

  var backtrack = function(row){
    if(row === n) {
      solution = this.rows();
      return;
    };

    for (var col = 0; col < n; col++) {
      this.togglePiece(row, col)
      if(this.hasAnyQueensConflicts()) {
        this.togglePiece.call(this, row, col);

        if (col === n-1) {
          backtrack.call(this, row + 1);
        }
      } else {
        // debugger;
        count++;
        // if(count !== row + 1) {
        //   return;
        // }
        backtrack.call(this, row + 1);

        if(count === n) {
          return;
        }

        this.togglePiece.call(this, row, col);
        count--;
      }
    }
  }
  backtrack.call(new Board({n:n}), 0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  var count = 0;

  if(n === 2 || n === 3) {
    return 0;
  }

  var backtrack = function(row){
    if(row === n ) {
      if(count === n){
        solutionCount++;
      }
      return;
    };

    for (var col = 0; col < n; col++) {
      //debugger;
      this.togglePiece(row, col);
      if(this.hasAnyQueensConflicts()) {
        this.togglePiece.call(this, row, col);

        if (col === n-1) {
          backtrack.call(this, row + 1);
        }
      } else {
        // debugger;
        count++;
        backtrack.call(this, row + 1);

        // if(count === n) {
        //   return;
        // }

        this.togglePiece.call(this, row, col);
        count--;
      }
    }
  }
  backtrack.call(new Board({n:n}), 0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

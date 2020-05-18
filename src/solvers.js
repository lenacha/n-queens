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

window.findNRooksSolution = function (n) {
  var solution = undefined; //fixme
  var board = new Board({ n: n });
  var colConf = {};

  var solver = function (row) {
    if (row === n) {
      solution = board.rows();
      return;
    } else if (solution !== undefined) {
      return;
    }

    for (let i = 0; i < n; i++) {
      if (colConf[i] === undefined) {
        board.togglePiece(row, i);
        colConf[i] = i;
        solver(row + 1);
      }
    }
  };

  solver(0);

  console.log("Single solution for " + n + " rooks:", JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var solutionCount = 0; //fixme

  var board = new Board({ n: n });
  var colConf = {};

  var solver = function (row) {
    if (row === n) {
      solutionCount += 1;
      return;
    }
    for (let i = 0; i < n; i++) {
      if (colConf[i] === undefined) {
        board.togglePiece(row, i);
        colConf[i] = i;
        solver(row + 1);
        delete colConf[i];
      }
    }
  };

  solver(0);

  console.log("Number of solutions for " + n + " rooks:", solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  var solution = undefined; //fixme
  var count = 0;
  var board = new Board({ n: n });

  var solver = function (row) {
    if (row === n) {
      solution = board.rows();
      return;
    }

    for (let i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (
        board.hasColConflictAt(i) ||
        board.hasMajorDiagonalConflictAt(i - row) ||
        board.hasMinorDiagonalConflictAt(i + row)
      ) {
        board.togglePiece(row, i);
        if (i === n - 1) {
          solver(row + 1);
        }
      } else {
        count += 1;
        solver(row + 1);
        if (count === n) {
          return;
        }
        board.togglePiece(row, i);
        count -= 1;
      }
    }
  };
  solver(0);

  console.log(
    "Single solution for " + n + " queens:",
    JSON.stringify(solution)
  );
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = 0; //fixme
  var board = new Board({ n: n });
  var colConf = {};
  var count = 0;
  if (n === 2 || n === 3) {
    return 0;
  }

  var solver = function (row) {
    if (row === n) {
      if(count === n) {
        solutionCount += 1;
      }
      return;
    }
    
    for (let i = 0; i < n; i++) {
      if (colConf[i] === undefined) {
        board.togglePiece(row, i);
        if (
          board.hasColConflictAt(i) ||
          board.hasMajorDiagonalConflictAt(i - row) ||
          board.hasMinorDiagonalConflictAt(i + row)
        ) {
          board.togglePiece(row, i);
          if (i === n - 1) {
            solver(row + 1);
          }
        } else {
          colConf[i] = i;
          count += 1;
          solver(row + 1);
          board.togglePiece(row, i);
          delete colConf[i];
          count -= 1;
        }
      }
    }
  };

  solver(0);

  console.log("Number of solutions for " + n + " queens:", solutionCount);
  return solutionCount;
};

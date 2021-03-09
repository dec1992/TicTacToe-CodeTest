var boxes = [],
    turn = 'X',
    score,
    moves;

function init() {
    var boarder = document.createElement('table');
    boarder.setAttribute('border', 1);
    boarder.setAttribute('cellspacing', 0);

    var identifier = 1;
    for (var i = 0; i < 3; i++) {
        var row = document.createElement('tr');
        boarder.appendChild(row);
        for (var j = 0; j < 3; j++) {
            var box = document.createElement('td');
            box.setAttribute('height', 120);
            box.setAttribute('width', 120);
            box.setAttribute('align', 'center');
            box.setAttribute('valign', 'center');
            box.classList.add('col' + j, 'row' + i);
            if (i == j) {
                box.classList.add('diagonal0');
            }
            if (j == 3 - i - 1) {
                box.classList.add('diagonal1');
            }
            box.identifier = identifier;
            box.addEventListener('click', set);
            row.appendChild(box);
            boxes.push(box);
            identifier += identifier;
        }
    }

    document.getElementById('game').appendChild(boarder);
    score = {'X': 0,'O': 0};
    moves = 0;
    turn = 'X';
    boxes.forEach(function (square) {
        square.innerHTML = '&nbsp;';
    });
}

function condition(clicked) {
    var memberOf = clicked.className.split(/\s+/);
    for (var i = 0; i < memberOf.length; i++) {
        var testClass = '.' + memberOf[i];
        var items = contains('#board ' + testClass, turn);
        if (items.length == 3) {
            return true;
        }
    }
    return false;
}

function contains(selector, text) {
    var elements = document.querySelectorAll(selector);
    return [].filter.call(elements, function (element) {
        return RegExp(text).test(element.textContent);
    });
}

function set() {
    if (this.innerHTML !== '&nbsp;') {
        return;
    }
    this.innerHTML = turn;
    moves += 1;
    score[turn] += this.identifier;
    if (condition(this)) {
        alert('Winner: Player ' + turn);
        score = {'X': 0,'O': 0};
        moves = 0;
        turn = 'X';
        boxes.forEach(function (square) {
            square.innerHTML = '&nbsp;';
        });
    } else if (moves === 8) {
        alert('Draw');
        score = {'X': 0,'O': 0};
        moves = 0;
        turn = 'X';
        boxes.forEach(function (square) {
            square.innerHTML = '&nbsp;';
        });
    } else {
        turn = turn === 'X' ? 'O' : 'X';
        document.getElementById('turn').textContent = 'Player ' + turn;
    }
}

init();
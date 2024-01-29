const { getAllowedTimeout } = require('../utils/utils');

class Player {
    constructor(id, balance) {
        this.id = id;
        this.balance = balance || 0;

        this.betHistory = [];
    }

    makeBet(board, options) {
        let allowedTimeoutId;
        if (!this.balance) {
            console.log(`Player ${this.id} has no money`);
            this.passBet(board, options);
            return;
        }

        // тут эмуляцию задержки ввода от пользователя
        const userTimeoutEmulationId = setTimeout(() => {
            const boardSectors = board.getAvailableSectors();
            const chosenSector = boardSectors[Math.floor(Math.random() * boardSectors.length)];
            
            let amount = Math.floor(Math.random() * this.balance);

            while (amount > this.balance || amount < 0) {
                amount = Math.floor(Math.random() * this.balance);
            }

            this.updateBalance(-amount);

            const localHistoryData = {
                amount,
                chosenSector,
                boardId: board.id,
            };

            const boardHistoryData = {
                player: this,
                chosenSector,
                amount,
            };
            this._updateHistory(board, localHistoryData, boardHistoryData);

            console.log(`Player ${this.id} bet ${amount} on sector: ${chosenSector}`);
            clearTimeout(allowedTimeoutId);
        }, options.randomTimeout);

        allowedTimeoutId = getAllowedTimeout.call(this, options.maxTimeout, userTimeoutEmulationId);
    }

    passBet(board, options) {
        let allowedTimeoutId;

        const userTimeoutEmulationId = setTimeout(() => {
            const boardHistoryData = {
                player: this,
                chosenSector: null,
                amount: 0,
            };
    
            const localHistoryData = {
                amount: 0,
                chosenSector: null,
                boardId: board.id,
            };

            this._updateHistory(board, localHistoryData, boardHistoryData);

            console.log(`Player ${this.id} passed bet`);
            clearTimeout(allowedTimeoutId);

        }, options.randomTimeout);

        allowedTimeoutId = getAllowedTimeout.call(this, options.maxTimeout, userTimeoutEmulationId);
    }

    updateBalance(amount) {
        this.balance += amount;
    }

    join(board) {
        board.connect(this);
    }

    // PRIVATE METHODS ========================================
    _updateHistory(board, localHistoryData, boardHistoryData) {
        board.addBet(boardHistoryData);
        this.betHistory.push(localHistoryData);
    }

}

module.exports = Player;
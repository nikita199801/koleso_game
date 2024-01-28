const RANDOM_USER_INPUT_TIMEOUT = 20000;

class KolesoBoard {
    constructor(id, betTimeout, rollTimeout, payoutTimeout, sectorSettings) {
        this.id = id;
        this.betsTimeout = betTimeout;
        this.rollTimeout = rollTimeout;
        this.payoutTimeout = payoutTimeout;
        
        this.players = [];
        this.currentBets = [];
        this.winBets = [];

        this.winSector = null;
        this.sectorSettings = sectorSettings;
    }

    connect(player) {
        this.players.push(player);
    }

    play() {
        this.winSector = null;
        this.currentBets = [];
        this._start();
        setInterval(() => {
            this.winSector = null;
            this.currentBets = [];
            this._start();
        }, this.betsTimeout + this.rollTimeout + this.payoutTimeout);
        
    }

    addBet(bet) {
        this.currentBets.push(bet);
    }

    getAvailableSectors() {
        return this.sectorSettings.map(s => s.sector);
    };

    // PRIVATE METHODS ========================================
    // прием ставок
    _start() {
        setTimeout(() => {
            console.log('Bets are closed');
            this._rollNumber();
        }, this.betsTimeout);

        this.players.forEach(p => {
            const options = {
                maxTimeout: this.betsTimeout,
                randomTimeout: Math.floor(Math.random() * RANDOM_USER_INPUT_TIMEOUT)
            };

            // выбор действия (сделать/пропустить ставку)
            const playerAction = Math.round(Math.random());
            if (playerAction) {
                p.makeBet(this, options);
            } else {
                p.passBet(this, options);
            }
        });
    }

    // выбор числа
    _rollNumber() {
        setTimeout(() => {
            console.log(`Number is ${this.winSector}`);
            this._bankPrize();
        }, this.rollTimeout);

        console.log('Rolling number');

        const sectorPool = [];

        this.sectorSettings.forEach(({ sector, count }) => {
            for (let i = 0; i < count; i++) {
                sectorPool.push(sector);
            }
        });
    
        const randomIndex = Math.floor(Math.random() * sectorPool.length);
        this.winSector = sectorPool[randomIndex];
    }

    // зачисление выигрыша
    _bankPrize() {
        setTimeout(() => {
            console.log('Money payout finished', `Winner bets: ${JSON.stringify(this.winBets)}`);
            console.log('-----------------------------------');

        }, this.payoutTimeout);

        this.currentBets.forEach(bet => {
            if (bet.chosenSector === this.winSector) {
                const { amount, chosenSector } = bet;
                const prize = amount * chosenSector;
                bet.player.updateBalance(prize);
                this.winBets.push(bet);
            }
        });
    }
    
}

module.exports = KolesoBoard;
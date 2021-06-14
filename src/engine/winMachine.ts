import { Result } from "../constants/constants";


export class WinMachine {
    private static chestWin: number = 0;
    private static chestBonusWin: number = 0;
    private static chestTotalWin: number = 0;
    private static totalWin: number = 0;

    private static getNewChestWin() {
        this.chestWin = Math.random() > 0.5 ? Math.round(Math.random() * 1000) : 0;

        return this.chestWin;
    }

    private static getNewChestBonusWin() {
        this.chestBonusWin = Math.random() > 0.5 ? Math.round(Math.random() * 1000) : 0;

        return this.chestBonusWin;
    }

    public static playChestRound(): Result {
        this.getNewChestWin();

        // chestBonusWin is possible only if there is a chestWin
        if (this.chestWin > 0) {
            this.getNewChestBonusWin();
        } else {
            this.chestBonusWin = 0;
        }
        this.chestTotalWin = this.chestWin + this.chestBonusWin;
        this.totalWin += this.chestTotalWin;

        return {
            chestWin: this.chestWin,
            chestBonusWin: this.chestBonusWin,
            chestTotalWin: this.chestTotalWin,
            totalWin: this.totalWin
        } as Result;
    }

    public static getCurrentResult(): Result {
        return {
            chestWin: this.chestWin,
            chestBonusWin: this.chestBonusWin,
            chestTotalWin: this.chestTotalWin,
            totalWin: this.totalWin
        } as Result;
    }

    public static refresh() {
        this.chestWin = 0;
        this.chestBonusWin = 0;
        this.chestTotalWin = 0;
        this.totalWin = 0;
    }
}


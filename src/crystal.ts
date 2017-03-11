export type Flavor = "red" | "green" | "blue";

export interface Energy {
    intensity: number;
    flavor: Flavor;
}

export interface Crystal {
    eval(): Energy;
}

export class CrystalShard implements Crystal {
    public constructor(private intensity: number, private flavor: Flavor) {}

    public eval() {
        return {
            intensity: this.intensity,
            flavor: this.flavor
        };
    }
}
import * as React from "react";

import { OperatorComponent, CrystalShardComponent } from "./components";

export type Flavor = "red" | "green" | "blue";

export function strongerOf(f1: Flavor, f2: Flavor) {
    if (f1 === f2) {
        return f1;
    } else if (
        f1 === "red" && f2 === "green" ||
        f1 === "green" && f2 === "blue" ||
        f1 === "blue" && f2 === "red") {
        return f1;
    } else {
        return f2;
    }
}

export interface Energy {
    intensity: number;
    flavor: Flavor;
}

export interface Crystal {
    eval(): Energy;
    render(): JSX.Element;
}

export class CrystalShard implements Crystal {
    public constructor(private intensity: number, private flavor: Flavor) {}

    public eval() {
        return {
            intensity: this.intensity,
            flavor: this.flavor
        };
    }

    public render(): JSX.Element {
        return <CrystalShardComponent shard={this} />;
    }
}

export type Socket = Crystal | undefined;

export interface Socketable {
    sockets: Socket[];
}

export abstract class Operator implements Crystal, Socketable {
    abstract sockets: Socket[];
    public render(): JSX.Element {
        return <OperatorComponent operator={this} />;
    }

    abstract getOperation(): string;

    abstract eval(): Energy;
}

export class Intensifier extends Operator {
    sockets: Socket[] = [undefined];
    public constructor(private factor: number) {
        super();
    }

    public getOperation() {
        return `x${this.factor}`;
    }

    public eval() {
        if (this.sockets[0] == null) {
            return {
                intensity: 0,
                flavor: "red" as "red"
            };
        } else {
            const energy = this.sockets[0].eval();
            return {
                intensity: energy.intensity * this.factor,
                flavor: energy.flavor
            };
        }
    }
}

export class Adder extends Operator {
    sockets: Socket[] = [undefined, undefined];
    public constructor() {
        super();
    }

    public getOperation() {
        return `+`;
    }

    public eval() {
        const s0 = ((this.sockets[0] && this.sockets[0].eval()) || { intensity: 0, flavor: "red" });
        const s1 = ((this.sockets[1] && this.sockets[1].eval()) || { intensity: 0, flavor: "red" });
        return {
            intensity: s0.intensity + s1.intensity,
            flavor: strongerOf(s0.flavor, s1.flavor),
        };
    }
}
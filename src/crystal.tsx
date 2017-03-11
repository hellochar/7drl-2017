import * as React from "react";

import { OperatorComponent, CrystalShardComponent } from "./components";

export type Flavor = "red" | "green" | "blue";

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

    abstract eval(): Energy;
}

export class Intensifier extends Operator {
    sockets: Socket[] = [undefined];
    public constructor(private factor: number) {
        super();
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
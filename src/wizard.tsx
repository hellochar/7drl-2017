import { Socketable, Socket, Crystal } from "./crystal";

/**
 * red/green/blue intensities.
 */
export interface MultiEnergy {
    red: number;
    green: number;
    blue: number;
}

export function subtract(a: MultiEnergy, b: MultiEnergy) {
    return {
        red: a.red - b.red,
        green: a.green - b.green,
        blue: a.blue - b.blue
    };
}

export class Equipment implements Socketable {
    sockets: Socket[] = [undefined, undefined, undefined];

    getMultiEnergy(): MultiEnergy {
        const nonNullSockets: Crystal[] = this.sockets.filter((s) => s !== undefined);
        const multiEnergy: MultiEnergy = {
            red: 0,
            green: 0,
            blue: 0
        };
        nonNullSockets.forEach((crystal) => {
            const energy = crystal.eval();
            multiEnergy[energy.flavor] += energy.intensity;
        });
        return multiEnergy;
    }
}

export class Wizard {
    public weapon: Equipment;
    public shield: Equipment;
    public hp: MultiEnergy;
}
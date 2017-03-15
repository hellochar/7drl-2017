import * as React from "react";
import * as ReactDOM from "react-dom";

import { CrystalShard, Intensifier, Adder } from "./crystal";
import { Wizard, Equipment } from "./wizard";
import { WizardComponent } from "./components";

const root = document.createElement("div");
root.className = "root";
document.body.appendChild(root);

const shard = new CrystalShard(7, "red");
const i1 = new Intensifier(1.3);
i1.sockets[0] = shard;
const i2 = new Intensifier(0.9);
i2.sockets[0] = i1;
const a = new Adder();
a.sockets[0] = i2;
const subAdder = new Adder();
subAdder.sockets[0] = new CrystalShard(4, "green");
subAdder.sockets[1] = new CrystalShard(2, "blue");
a.sockets[1] = subAdder;
const finalAdder = new Adder();
finalAdder.sockets[1] = a;

const wizard = new Wizard();
wizard.hp = {
    red: 10,
    green: 10,
    blue: 10
};
wizard.shield = new Equipment();
wizard.shield.sockets[0] = new CrystalShard(1, "red");
wizard.shield.sockets[1] = new CrystalShard(1, "green");
wizard.weapon = new Equipment();
wizard.weapon.sockets[0] = finalAdder;
wizard.weapon.sockets[1] = new CrystalShard(2, "red");
wizard.weapon.sockets[2] = new CrystalShard(1, "blue");

ReactDOM.render(
    <WizardComponent wizard={wizard} />,
    root
);
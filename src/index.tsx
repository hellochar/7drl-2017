import * as ReactDOM from "react-dom";
import { CrystalShard, Intensifier, Adder } from "./crystal";

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

ReactDOM.render(
    a.render(),
    root
);
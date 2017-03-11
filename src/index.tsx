import * as React from "react";
import * as ReactDOM from "react-dom";
import { CrystalShard, Intensifier } from "./crystal";

const root = document.createElement("div");
root.className = "root";
document.body.appendChild(root);

const shard = new CrystalShard(7, "red");
const i1 = new Intensifier(1.3);
i1.sockets[0] = shard;
const i2 = new Intensifier(0.9);
i2.sockets[0] = i1;

ReactDOM.render(
    i2.render(),
    root
);
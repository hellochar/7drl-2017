import * as React from "react";
import * as ReactDOM from "react-dom";

import { CrystalShard, Crystal } from "./crystal";
const shard = new CrystalShard(7, "red");

class CrystalComponent extends React.Component<{ crystal: Crystal }, {}> {
    public render() {
        const energy = this.props.crystal.eval();
        return (
            <div className={"crystal crystal-" + energy.flavor}>
                {energy.intensity}
            </div>
        );
    }
}


const root = document.createElement("div");
root.className = "root";
document.body.appendChild(root);

ReactDOM.render(
    <CrystalComponent crystal={shard} />,
    root
);
import * as React from "react";

import { Operator, Energy, CrystalShard, Socket } from "./crystal";

export class EnergyComponent extends React.Component<{ energy: Energy }, {}> {
    public render() {
        const energy = this.props.energy;
        return (
            <div className={"energy energy-" + energy.flavor}>
                {energy.intensity}
            </div>
        );
    }
}

export class CrystalShardComponent extends React.Component<{ shard: CrystalShard }, {}> {
    public render() {
        return <EnergyComponent energy={this.props.shard.eval()} />
    }
}

export class SocketComponent extends React.Component<{ socket: Socket }, {}> {
    public render() {
        return (
            <div className="socket">
                { this.maybeRenderCrystal() }
            </div>
        )
    }

    public maybeRenderCrystal() {
        if (this.props.socket == null) {
            return null;
        } else {
            return this.props.socket.render();
        }
    }
}

export class OperatorComponent extends React.Component<{ operator: Operator }, {}> {
    public render() {
        return (
            <div className="operator">
                <div className="operator-display">
                    <div className="operator-display-energy">
                        <EnergyComponent energy={this.props.operator.eval()} />
                    </div>
                    <div className="operator-display-sockets">
                        { this.renderSockets() }
                    </div>
                </div>
            </div>
        )
    }

    private renderSockets() {
        return this.props.operator.sockets.map((socket, index) => {
            return <SocketComponent key={index} socket={socket} />;
        });
    }
}


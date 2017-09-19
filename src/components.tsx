import * as React from "react";
import { DragSource, DragSourceSpec, Identifier, DragSourceMonitor, DragSourceCollector, DragSourceConnector, ConnectDragSource } from "react-dnd";

import { Operator, Energy, CrystalShard, Socket, Crystal } from "./crystal";
import { Equipment, Wizard, MultiEnergy } from "./wizard";

export class EnergyComponent extends React.Component<{ energy: Energy }, {}> {
    public render() {
        const energy = this.props.energy;
        return (
            <div className={"energy energy-" + energy.flavor}>
                {energy.intensity.toFixed(0)}
            </div>
        );
    }
}

export class CrystalShardComponent extends React.Component<{ shard: CrystalShard }, {}> {
    public render() {
        return <EnergyComponent energy={this.props.shard.eval()} />
    }
}

const DRAG_TYPES = {
    socket: "socket"
};

interface SocketDragItem {
    socket: Socket;   
}

const SocketDragSource: DragSourceSpec<SocketComponentProps> = {
    beginDrag: (props: SocketComponentProps) => {
        const item: SocketDragItem = {
            socket: props.socket
        };
        return item;
    },

    endDrag: (props: SocketComponentProps, monitor: DragSourceMonitor) => {
        if (monitor.didDrop()) {
            const item = monitor.getItem() as SocketDragItem;
            const { socket } = item;
            monitor.getDropResult()
        }
    }
};

interface SocketDragSourceInjectedProps {
    connectDragSource: ConnectDragSource;
    isDragging: boolean;
}

const SocketDragSourceCollector: DragSourceCollector = (connect: DragSourceConnector, monitor: DragSourceMonitor) => {
    const injectedProps: SocketDragSourceInjectedProps = {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
    return injectedProps;
};

export interface SocketComponentProps extends SocketDragSourceInjectedProps {
    socket: Socket;
}

class UninjectedSocketComponent extends React.Component<SocketComponentProps, {}> {
    public render() {
        const className = "socket" + ((this.props.socket == null) ? " socket-empty" : "");
        return (
            <div className={className}>
                { this.maybeRenderCrystal() }
            </div>
        );
    }

    public maybeRenderCrystal() {
        if (this.props.socket == null) {
            return null;
        } else {
            return this.props.connectDragSource(this.props.socket.render());
        }
    }
}

export const SocketComponent = DragSource(DRAG_TYPES.socket, SocketDragSource, SocketDragSourceCollector)(UninjectedSocketComponent);

export class OperatorComponent extends React.Component<{ operator: Operator }, {}> {
    public render() {
        return (
            <div className="operator">
                <div className="operator-display">
                    <div className="operator-display-energy">
                        <EnergyComponent energy={this.props.operator.eval()} />
                    </div>
                    <div className="operator-display-operation">
                        <div className="operator-display-operation-text">
                            {this.props.operator.getOperation()}
                        </div>
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

export class EquipmentComponent extends React.Component<{ equipment: Equipment }, {}> {
    public render() {
        return (
            <div className="equipment">
                { this.renderSockets() }
            </div>
        );
    }

    public renderSockets() {
        return this.props.equipment.sockets.map((socket, index) => {
            return <SocketComponent key={index} socket={socket} />;
        });
    }
}

export class WizardComponent extends React.Component<{ wizard: Wizard }, {}> {
    public render() {
        return (
            <div className="wizard">
                <div className="wizard-container">
                    <div className="wizard-image">🙏</div>
                    <div className="wizard-status">{this.renderHP()}</div>
                    <div className="wizard-equipments">
                        <div className="wizard-equipment wizard-weapon">
                            <div className="wizard-weapon-name">Weapon</div>
                            <EquipmentComponent equipment={this.props.wizard.weapon} />
                        </div>
                        <div className="wizard-equipment wizard-shield">
                            <div className="wizard-shield-name">Shield</div>
                            <EquipmentComponent equipment={this.props.wizard.shield} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    public renderHP() {
        const hp = this.props.wizard.hp;
        const sumHP = hp.blue + hp.green + hp.red;
        return (
            <div className="wizard-hp">
                <div className="wizard-hp-part wizard-hp-red" style={{width: (hp.red / sumHP * 100) + "%"}}>{hp.red}</div>
                <div className="wizard-hp-part wizard-hp-green" style={{width: (hp.green / sumHP * 100) + "%"}}>{hp.green}</div>
                <div className="wizard-hp-part wizard-hp-blue" style={{width: (hp.blue / sumHP * 100) + "%"}}>{hp.blue}</div>
            </div>
        );
    }
}
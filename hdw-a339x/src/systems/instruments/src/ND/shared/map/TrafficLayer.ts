import { NdTraffic } from '@shared/NavigationDisplay';
// import { MathUtils } from '@flybywiresim/fbw-sdk';
import { TaRaIntrusion } from '@tcas/lib/TcasConstants';
import { MapLayer } from './MapLayer';
import { PaintUtils } from './PaintUtils';
import { CanvasMap } from './CanvasMap';

const DiamondHeight = 18 * 2;
const DiamondWidth = 12 * 2;

export class TrafficLayer implements MapLayer<NdTraffic> {
    public data: NdTraffic[] = [];

    constructor(private readonly canvasMap: CanvasMap) {
    }

    paintShadowLayer(context: CanvasRenderingContext2D, mapWidth: number, mapHeight: number) {
        for (const intruder of this.data) {
            const x = intruder.posX;
            const y = intruder.posY;
            const rx = x + mapWidth / 2;
            const ry = y + mapHeight / 2;

            this.paintIntruder(false, context, rx, ry, intruder);
        }
    }

    paintColorLayer(context: CanvasRenderingContext2D, mapWidth: number, mapHeight: number) {
        for (const intruder of this.data) {
            const x = intruder.posX;
            const y = intruder.posY;
            const rx = x + mapWidth / 2;
            const ry = y + mapHeight / 2;

            this.paintIntruder(true, context, rx, ry, intruder);
        }
    }

    private paintIntruder(isColorLayer: boolean, context: CanvasRenderingContext2D, x: number, y: number, intruder: NdTraffic) {
        let color;
        const ownHeading = Math.round(SimVar.GetSimVarValue('PLANE HEADING DEGREES MAGNETIC', 'degree'));
        const trafficRotation = 360 - ((ownHeading - intruder.heading) % 360);
        switch (intruder.intrusionLevel) {
        case TaRaIntrusion.TRAFFIC:
            // paint intruder symbol
            color = '#fff';
            this.paintNormalIntruder(context, x, y, isColorLayer ? color : '#040405', isColorLayer ? 1.6 : 3.5, trafficRotation);
            break;
        case TaRaIntrusion.PROXIMITY:
            color = '#fff';
            this.paintProximityIntruder(context, x, y, isColorLayer ? color : '#040405', isColorLayer ? 1.6 : 3.5, trafficRotation);
            break;
        case TaRaIntrusion.TA:
            color = '#e38c56';
            this.paintTaIntruder(context, x, y, isColorLayer ? color : '#040405', isColorLayer ? 1.6 : 3.5, trafficRotation);
            break;
        case TaRaIntrusion.RA:
            color = '#ff0000';
            this.paintRaIntruder(context, x, y, isColorLayer ? color : '#040405', isColorLayer ? 1.6 : 3.5, trafficRotation);
            break;
        default:
            break;
        }
        // paint vertical speed arrow (-/+ 500 fpm)
        this.paintVertArrow(intruder.vertSpeed, context, x, y, isColorLayer ? color : '#040405', isColorLayer ? 1.6 : 3.5);

        // paint relative altitude
        context.font = '21px Ecam';
        PaintUtils.paintText(
            isColorLayer,
            context,
            x - 24,
            y + (intruder.relativeAlt > 0 ? -25 : 25),
            `${intruder.relativeAlt > 0 ? '+' : '-'}${Math.abs(intruder.relativeAlt) < 10 ? '0' : ''}${Math.abs(intruder.relativeAlt)}`,
            color,
        );
    }

    private paintVertArrow(vertSpeed: number, context: CanvasRenderingContext2D, x: number, y: number, color: string, lineWidth: number) {
        context.strokeStyle = color;
        context.fillStyle = color;
        context.lineWidth = lineWidth;

        const arrowOffsetX = DiamondHeight * 0.3;
        const arrowWidth = DiamondHeight / 7;
        const arrowHeight = DiamondHeight / 7;

        context.translate(x, y);

        if (vertSpeed <= -500 || vertSpeed >= 500) {
            context.beginPath();
            context.moveTo(DiamondWidth / 2 + arrowOffsetX - lineWidth / 4, -DiamondHeight * 1.1);
            context.lineTo(DiamondWidth / 2 + arrowOffsetX - lineWidth / 4, DiamondHeight * -0.7);
            context.stroke();
            context.closePath();
        }

        if (vertSpeed <= -500) {
            context.beginPath();
            context.moveTo(DiamondWidth / 2 + arrowOffsetX, DiamondHeight * -0.7);
            context.lineTo(DiamondWidth / 2 + arrowOffsetX - arrowWidth / 2, DiamondHeight * -0.7 - arrowHeight);
            context.lineTo(DiamondWidth / 2 + arrowOffsetX + arrowWidth / 2, DiamondHeight * -0.7 - arrowHeight);
            context.fill();
            context.stroke();
            context.closePath();
        } else if (vertSpeed >= 500) {
            context.beginPath();
            context.moveTo(DiamondWidth / 2 + arrowOffsetX, -DiamondHeight * 1.1);
            context.lineTo(DiamondWidth / 2 + arrowOffsetX - arrowWidth / 2, -DiamondHeight * 1.1 + arrowHeight);
            context.lineTo(DiamondWidth / 2 + arrowOffsetX + arrowWidth / 2, -DiamondHeight * 1.1 + arrowHeight);
            context.fill();
            context.stroke();
            context.closePath();
        }

        context.resetTransform();
    }

    private paintNormalIntruder(context: CanvasRenderingContext2D, x: number, y: number, color: string, lineWidth: number, trafficRotation: number) {
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        context.lineCap = 'round';
        context.lineJoin = 'round';

        context.translate(x, y);
        context.rotate(trafficRotation * Math.PI / 180);

        // Draw the line
        context.beginPath();
        context.moveTo(0, -DiamondHeight / 2);
        context.lineTo(0, DiamondHeight / 2);
        context.stroke();

        // Draw the first polyline
        context.beginPath();
        context.moveTo(DiamondWidth * 0.5, 0);
        context.lineTo(0, -DiamondHeight / 5);
        context.lineTo(DiamondWidth * -0.5, 0);
        context.stroke();


        // Draw the second polyline
        context.beginPath();
        context.moveTo(-DiamondWidth / 4, DiamondHeight / 2);
        context.lineTo(0, DiamondHeight / 3);
        context.lineTo(DiamondWidth / 4, DiamondHeight / 2);
        context.stroke();

        context.resetTransform();
    }

    private paintProximityIntruder(context: CanvasRenderingContext2D, x: number, y: number, color: string, lineWidth: number, trafficRotation: number) {
        context.strokeStyle = color;
        context.fillStyle = color;
        context.lineWidth = lineWidth;

        context.translate(x, y);
        context.rotate(trafficRotation * Math.PI / 180);

        context.beginPath();
        context.moveTo(0, DiamondHeight * -0.5);
        context.lineTo(0, DiamondHeight * -0.3);
        context.moveTo(0, DiamondHeight * 0.075);
        context.lineTo(0, DiamondHeight * 0.5);
        context.stroke();

        // Draw the polygon
        context.beginPath();
        context.moveTo(0, DiamondHeight * -0.3);
        context.lineTo(DiamondWidth * 0.20, DiamondHeight * -0.1);
        context.lineTo(0, DiamondHeight * 0.0786);
        context.lineTo(DiamondWidth * -0.20, DiamondHeight * -0.1);
        context.closePath();
        context.stroke();


        // Draw the line
        context.beginPath();
        context.moveTo(DiamondWidth * -0.20, DiamondHeight * -0.1);
        context.lineTo(DiamondWidth * -0.5, 0);
        context.stroke();

        // Draw the line
        context.beginPath();
        context.moveTo(DiamondWidth * 0.20, DiamondHeight * -0.1);
        context.lineTo(DiamondWidth * 0.5, 0);
        context.stroke();


        // Draw the polyline
        context.beginPath();
        context.moveTo(-DiamondWidth / 4, DiamondHeight / 2);
        context.lineTo(0, DiamondHeight / 3);
        context.lineTo(DiamondWidth / 4, DiamondHeight / 2);
        context.stroke();

        context.resetTransform();
    }

    private paintTaIntruder(context: CanvasRenderingContext2D, x: number, y: number, color: string, lineWidth: number, trafficRotation: number) {
        context.strokeStyle = color;
        context.fillStyle = color;
        context.lineWidth = lineWidth;

        context.translate(x, y);
        context.rotate(trafficRotation * Math.PI / 180);

        // Draw the line
        context.beginPath();
        context.moveTo(0, DiamondHeight * -0.5);
        context.lineTo(0, DiamondHeight * -0.3);
        context.moveTo(0, DiamondHeight * 0.075);
        context.lineTo(0, DiamondHeight * 0.5);
        context.stroke();

        // Draw the arc
        context.beginPath();
        context.arc(0, DiamondHeight * -0.11, DiamondHeight * 0.17, 0, 2 * Math.PI, false);
        context.fill();
        context.stroke();
        context.closePath();


        // Draw the line
        context.beginPath();
        context.moveTo(DiamondWidth * -0.20, DiamondHeight * -0.1);
        context.lineTo(DiamondWidth * -0.5, 0);
        context.stroke();

        // Draw the line
        context.beginPath();
        context.moveTo(DiamondWidth * 0.20, DiamondHeight * -0.1);
        context.lineTo(DiamondWidth * 0.5, 0);
        context.stroke();


        // Draw the polyline
        context.beginPath();
        context.moveTo(-DiamondWidth / 4, DiamondHeight / 2);
        context.lineTo(0, DiamondHeight / 3);
        context.lineTo(DiamondWidth / 4, DiamondHeight / 2);
        context.stroke();

        context.resetTransform();
    }

    private paintRaIntruder(context: CanvasRenderingContext2D, x: number, y: number, color: string, lineWidth: number, trafficRotation: number) {
        context.strokeStyle = color;
        context.fillStyle = color;
        context.lineWidth = lineWidth;

        context.translate(x, y);
        context.rotate(trafficRotation * Math.PI / 180);

        context.beginPath();
        context.moveTo(0, DiamondHeight * -0.5);
        context.lineTo(0, DiamondHeight * -0.3);
        context.moveTo(0, DiamondHeight * 0.075);
        context.lineTo(0, DiamondHeight * 0.5);
        context.stroke();

        // Draw the polygon
        context.beginPath();
        context.rect(DiamondHeight * 0.15, DiamondHeight * 0.05, DiamondHeight * -0.30, DiamondHeight * -0.30);
        context.fill();
        context.stroke();
        context.closePath();


        // Draw the line
        context.beginPath();
        context.moveTo(DiamondWidth * -0.20, DiamondHeight * -0.1);
        context.lineTo(DiamondWidth * -0.5, 0);
        context.stroke();

        // Draw the line
        context.beginPath();
        context.moveTo(DiamondWidth * 0.20, DiamondHeight * -0.1);
        context.lineTo(DiamondWidth * 0.5, 0);
        context.stroke();


        // Draw the polyline
        context.beginPath();
        context.moveTo(-DiamondWidth / 4, DiamondHeight / 2);
        context.lineTo(0, DiamondHeight / 3);
        context.lineTo(DiamondWidth / 4, DiamondHeight / 2);
        context.stroke();

        context.resetTransform();
    }
}
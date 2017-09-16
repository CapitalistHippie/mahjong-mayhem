import { Observable } from 'rxjs/Observable';

declare var io: any;

export abstract class GameObserver {
    protected socket: any

    private createObserver<T>(functionName: string, callback: (n: T) => void) {
        new Observable<T>(observer => {
            this.socket.on(functionName, (obj: T) => {
                observer.next(obj);
            }, error => {
                observer.error(error);
            });
        })
        .subscribe(
            callback,
            error => this.error(error)
        );
    }

    constructor(protected gameId: string) { 
        this.socket = io.connect("http://mahjongmayhem.herokuapp.com?gameId=" + gameId);
        
        this.createObserver<void>('start', this.start);
        this.createObserver<void>('end',   this.end);
        this.createObserver<PlayerId>('playerJoined', this.playerJoined);
        this.createObserver<MatchTile[]>('match', this.match);
    }

    abstract start() : void;
    abstract end() : void;
    abstract playerJoined(player : PlayerId) : void;
    abstract match(matches : MatchTile[]) : void;
    abstract error(error: any): void;
}

export class PlayerId{
    _id: string
} 
export class MatchTile{
    xPos: number
    yPos: number
    zPos: number
    tile: number
    _id: string
}
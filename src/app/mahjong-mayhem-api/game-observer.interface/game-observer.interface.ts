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

    protected connectToSocket(socketGameId: string) {
        this.socket = io.connect("http://mahjongmayhem.herokuapp.com?gameId=" + socketGameId);
    }

    protected subscribeToMatch(callback: (matches: MatchTile[]) => void): void {
        this.createObserver<MatchTile[]>('match', callback);
    }
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
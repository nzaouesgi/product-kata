import { IDisplay } from "../../domain/common/ports/IDisplay"

export class ConsoleDisplay implements IDisplay {
    
    public log(message: any, ...optionalParams: any[]) {
        console.log(message, ...optionalParams)
    }
}
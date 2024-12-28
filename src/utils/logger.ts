import winston, { transports} from "winston";

export class Logger{
    private static instance: Logger;
    private readonly _logger: winston.Logger;

    private constructor() {
       this._logger = winston.createLogger({
           format: winston.format.combine(
               winston.format.timestamp(),
               winston.format.json(),
           ),
           transports: [new transports.Console()],
       })
    }

    public static getInstance(): Logger {
        if (!Logger.instance){
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    public logger(): winston.Logger{
        return this._logger;
    }
}
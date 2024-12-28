import {Pool, PoolClient, QueryResult} from "pg";
import {Logger} from "../utils/logger";

import {
    CONNECTED_POSTGRESQL_DB,
    ERROR_ESTABLISHING_POSTGRESQL_CONNECTION,
    DATABASE_CONNECTION_NOT_ESTABLISHED,
    FAILED_TO_EXECUTE_QUERY
} from "../utils/constants.utils";
export default class PostgreSQLService {
    private static instance: PostgreSQLService;
    private client?: PoolClient;
    private readonly logger = Logger.getInstance().logger();

    private constructor(pool: Pool) {
        this.connect(pool);
    }

    private async connect(pool: Pool): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            pool.connect((err, client) => {
                if (err) {
                    this.logger.error(
                        ERROR_ESTABLISHING_POSTGRESQL_CONNECTION,
                        err
                    );
                    reject(err);
                } else {
                    this.logger.info(CONNECTED_POSTGRESQL_DB);
                    this.client = client;
                    resolve();
                }
            });
        });
    }

    public static async initialize(pool: Pool): Promise<void> {
        if (PostgreSQLService.instance) {
            return;
        }
        PostgreSQLService.instance = new PostgreSQLService(pool);
        await PostgreSQLService.instance.connect(pool);
    }

    public static getInstance(): PostgreSQLService {
        return PostgreSQLService.instance;
    }

    public async query(
        queryString: string,
        values?: any[]
    ): Promise<QueryResult<any>> {
        if (!this.client) {
            this.logger.error(DATABASE_CONNECTION_NOT_ESTABLISHED);
            throw new Error(DATABASE_CONNECTION_NOT_ESTABLISHED);
        }
        try {
            // @ts-ignore
            return this.client.query(queryString, values);
        } catch (error) {
            this.logger.error(FAILED_TO_EXECUTE_QUERY, error);
            this.logger.error(queryString);
            throw new Error(FAILED_TO_EXECUTE_QUERY);
        }
    }
}
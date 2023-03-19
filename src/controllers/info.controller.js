import { argv } from '../app.js';
import path from 'path';
import os from "os";
import { logger } from '../logs/logger.logs.js';

export async function indexInfo(_, res, next) {
    try {
        const data = {
            arguments: JSON.stringify(argv),
            executionPath: process.cwd(),
            platformName: process.platform,
            processID: process.pid,
            nodeVersion: process.version,
            projectFolder: path.basename(process.cwd()),
            totalReservedMemory: process.memoryUsage().rss,
            totalCPUs: os.cpus().length
        }
        res.render('info.pug', { data });
    } catch (err) {
        logger.error(err.message);
        const customError = new Error(err.message);
        customError.id = 3;
        next(customError);
    }
}
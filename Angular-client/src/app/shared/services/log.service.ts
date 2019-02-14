import { Injectable } from "@angular/core";
export enum LogLevel {
  INFO,
  DEBUG,
  ERROR
}

@Injectable()
export class LogService {
  constructor() {}
  minimumLevel: LogLevel = LogLevel.DEBUG;
  logInfoMessage(message: string) {
    this.logMessage(LogLevel.INFO, message);
  }
  logDebugMessage(message: string) {
    this.logMessage(LogLevel.DEBUG, message);
  }
  logErrorMessage(message: string) {
    this.logMessage(LogLevel.ERROR, message);
  }
  logMessage(level: LogLevel, message: string) {
    if (level >= this.minimumLevel) {
      console.log(`Message (${LogLevel[level]}): ${message}`);
    }
  }
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUEUE_NAME = exports.REDIS_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.REDIS_URL = process.env.REDIS_URL ||
    "redis://default:xhF58bE5ejPCwaxJr47cKm2J1iE4QlvB@redis-10867.c90.us-east-1-3.ec2.cloud.redislabs.com:10867";
exports.QUEUE_NAME = "scrape-jobs";

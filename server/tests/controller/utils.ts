import type { Request, Response } from "express";
import type { RedisClientType } from "redis";

export function getMockRequest() {
  return {
    params: {},
    query: {},
    body: {},
    session: {},
  } as Request;
}

export function getMockResponse() {
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  } as any as Response;
  return res;
}

export function getMockRedisClient() {
  const redisClient = {
    exists: jest.fn(() => Promise.resolve(true)),
    get: jest.fn(),
    setEx: jest.fn(),
  } as any as RedisClientType;
  return redisClient;
}

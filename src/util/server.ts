import express from 'express'
import * as OpenApiValidator from 'express-openapi-validator'
import {Express} from 'express-serve-static-core'
import YAML from 'yamljs'
import {connector} from 'swagger-routes-express'

import * as api from '../controllers'

export async function createServer (): Promise<Express> {
  const apiSpecFile = './api/apispec.yaml'
  const apiDefinition = YAML.load(apiSpecFile)
  
  const server = express();

  const validatorOptions = {
    apiSpec: apiSpecFile,
    validateRequests: true,
    validateResponses: true
  }

  server.use(OpenApiValidator.middleware(validatorOptions))

  const connect = connector(api, apiDefinition, {
    onCreateRoute: (method: string, descriptor: any[]) => {
      console.log(`${method}: ${descriptor[0]} : ${(descriptor[1] as any).name}`)
    }
  })

  connect(server)

  return server;
}
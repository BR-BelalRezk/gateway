import { defineConfig } from '@kubb/core'
import createSwagger from '@kubb/swagger'
import createSwaggerTS from '@kubb/swagger-ts'
import createSwaggerZod from '@kubb/swagger-zod'
import createSwaggerClient from '@kubb/swagger-client'

export default defineConfig(async () => {
  return {
    root: '.',
    input: {
      path: './src/lib/api-client/swagger.json',
    },
    output: {
      path: './src/lib/api-client/gen',
    },
    plugins: [
      createSwagger({ validate: false, output: false }),
      createSwaggerTS({ output: 'models', enumType: 'enum' }),
      createSwaggerZod(
        {
          output: './zod',
        },
      ),
      createSwaggerClient({
        output: './api-client',
        client: './src/lib/api-client/kubb-client.ts',
      }),

    ],
  }
})
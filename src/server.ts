import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { accessInviteLinkRoute } from './routes/access-invite-link.routes'
import { GetRankingRoute } from './routes/get-ranking.route'
import { getSubscribersInviteClicksRoute } from './routes/get-subscribers-invite-clicks.routes'
import { getsubscribersInvitesCountRoute } from './routes/get-subscribers-invite-count.routes'
import { getSubscribersRankingPositionRoute } from './routes/get-subscribers-ranking-position.routes'
import { subscribeToEventRoute } from './routes/subscriptions.routes'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
  origin: true,
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NLW Connect',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(subscribeToEventRoute)
app.register(accessInviteLinkRoute)
app.register(getSubscribersInviteClicksRoute)
app.register(getsubscribersInvitesCountRoute)
app.register(getSubscribersRankingPositionRoute)
app.register(GetRankingRoute)

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('🚀 HTTP Server running!')
  })

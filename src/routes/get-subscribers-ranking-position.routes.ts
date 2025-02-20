import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getSubscriberRankingPosition } from '../functions/get-subscriber-ranking-position'

export const getSubscribersRankingPositionRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/position',
      {
        schema: {
          summary: 'Get subscriber ranking position',
          tags: ['referral'],
          params: z.object({
            subscriberId: z.string(),
          }),
        },
      },
      async (request, reply) => {
        const { subscriberId } = request.params

        const { position } = await getSubscriberRankingPosition({
          subscriberId,
        })

        reply.status(200).send({
          position,
        })
      }
    )
  }

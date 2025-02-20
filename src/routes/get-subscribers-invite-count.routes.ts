import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getSubscriberInviteCount } from '../functions/get-subscriber-invites-count'

export const getsubscribersInvitesCountRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/rankink/count',
      {
        schema: {
          summary: 'Get subscriber invites count',
          tags: ['referral'],
          params: z.object({
            subscriberId: z.string(),
          }),
          response: {
            200: z.object({
              count: z.number(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { subscriberId } = request.params

        const { count } = await getSubscriberInviteCount({ subscriberId })

        reply.status(200).send({
          count,
        })
      }
    )
  }

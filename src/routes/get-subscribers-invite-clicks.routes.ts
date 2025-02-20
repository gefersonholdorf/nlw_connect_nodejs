import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getSubscriberInvitesClicks } from '../functions/get-subscriber-invites-clicks'

export const getSubscribersInviteClicksRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/rankink/clicks',
      {
        schema: {
          summary: 'Get subscriber invite clicks count',
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

        const { count } = await getSubscriberInvitesClicks({ subscriberId })

        reply.status(200).send({
          count,
        })
      }
    )
  }

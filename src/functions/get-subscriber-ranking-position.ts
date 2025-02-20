import { redis } from '../redis/client'
import { getSubscribersInviteClicksRoute } from '../routes/get-subscribers-invite-clicks.routes'

export interface GetSubscriberRankingPositionParams {
  subscriberId: string
}

export async function getSubscriberRankingPosition({
  subscriberId,
}: GetSubscriberRankingPositionParams) {
  const rank = await redis.zrevrank('referral:ranking', subscriberId)

  if (rank == null) {
    return {
      position: null,
    }
  }

  return {
    position: rank + 1,
  }
}

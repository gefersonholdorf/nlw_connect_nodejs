import { redis } from '../redis/client'

export interface GetSubscriberInviteCountParams {
  subscriberId: string
}

export async function getSubscriberInviteCount({
  subscriberId,
}: GetSubscriberInviteCountParams) {
  const count = await redis.zscore('referral:ranking', subscriberId)

  return {
    count: count ? Number.parseInt(count) : 0,
  }
}

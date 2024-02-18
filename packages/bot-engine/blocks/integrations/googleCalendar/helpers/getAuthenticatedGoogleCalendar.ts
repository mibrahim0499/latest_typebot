import { google } from 'googleapis'
import { getAuthenticatedGoogleClient } from '@typebot.io/lib/google'
import { TRPCError } from '@trpc/server'

export const getAuthenticatedGoogleCalendar = async ({
  credentialsId,
}: {
  credentialsId?: string
}) => {
  if (!credentialsId)
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Missing credentialsId',
    })

  const auth = await getAuthenticatedGoogleClient(credentialsId)
  if (!auth)
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: "Couldn't find credentials in database",
    })

  const calendar = google.calendar({ version: 'v3', auth } as any)
  return calendar
}

import {
  SessionState,
  GoogleCalendarCreateEventOptions,
} from '@typebot.io/schemas'
import { getAuthenticatedGoogleCalendar } from './helpers/getAuthenticatedGoogleCalendar'
import { ExecuteIntegrationResponse } from '../../../types'

export const createEvent = async (
  state: SessionState,
  {
    outgoingEdgeId,
    options,
  }: { outgoingEdgeId?: string; options: GoogleCalendarCreateEventOptions }
): Promise<ExecuteIntegrationResponse> => {
  const { calendarId, event } = options
  const calendar = await getAuthenticatedGoogleCalendar({
    credentialsId: options.credentialsId,
  })

  try {
    const createdEvent = await calendar.events.insert({
      calendarId: calendarId,
      requestBody: event,
    })

    // Assuming you want to log or use the created event's ID or other details
    const logs = [
      {
        status: 'info',
        description: 'Event created successfully',
        details: `Event ID: ${createdEvent.data.id}`,
      },
    ]

    return {
      outgoingEdgeId,
      logs,
    }
  } catch (error) {
    console.error('Failed to create event:', error)
    return {
      outgoingEdgeId,
      logs: [
        {
          status: 'error',
          description: 'Failed to create event',
        },
      ],
    }
  }
}

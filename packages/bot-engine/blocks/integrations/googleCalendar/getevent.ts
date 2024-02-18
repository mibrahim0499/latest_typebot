import {
  SessionState,
  GoogleCalendarGetEventOptions,
} from '@typebot.io/schemas'
import { getAuthenticatedGoogleCalendar } from './helpers/getAuthenticatedGoogleCalendar'
import { ExecuteIntegrationResponse } from '../../../types'

export const getEvent = async (
  state: SessionState,
  {
    outgoingEdgeId,
    options,
  }: { outgoingEdgeId?: string; options: GoogleCalendarGetEventOptions }
): Promise<ExecuteIntegrationResponse> => {
  const { calendarId, eventId } = options
  if (!eventId) {
    console.error('Event ID is required')
    return {
      outgoingEdgeId,
      logs: [
        {
          status: 'error',
          description: 'Event ID is required',
        },
      ],
    }
  }

  try {
    const calendar = await getAuthenticatedGoogleCalendar({
      credentialsId: options.credentialsId,
    })

    const event = await calendar.events.get({
      calendarId: calendarId,
      eventId: eventId,
    })

    // Assuming you want to log or use the retrieved event's details
    const logs = [
      {
        status: 'info',
        description: 'Event retrieved successfully',
        details: JSON.stringify(event.data, null, 2),
      },
    ]

    return {
      outgoingEdgeId,
      logs,
    }
  } catch (error) {
    console.error('Failed to retrieve event:', error)
    return {
      outgoingEdgeId,
      logs: [
        {
          status: 'error',
          description: 'Failed to retrieve event',
        },
      ],
    }
  }
}

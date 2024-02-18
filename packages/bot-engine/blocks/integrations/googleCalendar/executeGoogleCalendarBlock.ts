import {
  GoogleCalendarBlock,
  SessionState,
  GoogleCalendarGetEventOptions,
} from '@typebot.io/schemas'
import { createEvent } from './createevent'
import { getEvent } from './getevent'
import { ExecuteIntegrationResponse } from '../../../types'
import { GoogleCalendarAction } from '@typebot.io/schemas/features/blocks/integrations/googleCalendar/constant'

export const executeGoogleCalendarBlock = async (
  state: SessionState,
  block: GoogleCalendarBlock
): Promise<ExecuteIntegrationResponse> => {
  if (!block.options) return { outgoingEdgeId: block.outgoingEdgeId }

  const action = block.options.action
  if (!action) return { outgoingEdgeId: block.outgoingEdgeId }

  switch (action) {
    case GoogleCalendarAction.CREATE_EVENT:
      return createEvent(state, {
        options: block.options,
        outgoingEdgeId: block.outgoingEdgeId,
      })
    case GoogleCalendarAction.GET_EVENT:
      // Now TypeScript knows eventId is included, resolving the type error
      return getEvent(state, {
        options: block.options as GoogleCalendarGetEventOptions, // Explicit casting if necessary
        outgoingEdgeId: block.outgoingEdgeId,
      })
    default:
      return { outgoingEdgeId: block.outgoingEdgeId }
  }
}

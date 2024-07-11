import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";
import { ClientError } from "../errors/client-error";

export async function removeParticipantFromTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/participants/:participantId/trip/:tripId', {
    schema: {
      params: z.object({
        participantId: z.string().uuid(),
        tripId: z.string().uuid(),
      }),
    }
  }, async (req) => {

    const { participantId, tripId } = req.params

    const participant = await prisma.participant.delete({
      select: {
        id: true,
      },
      where: {
        id: participantId,
        trip_id: tripId
      }
    })

    if (!participant) {
      throw new ClientError('Participant not found or already deleted')
    }

    return { participant }
  })
}
import fastify from "fastify";
import cors from '@fastify/cors'
import { createTrip } from "./routes/create-trip";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { confirmTrip } from "./routes/confirm-trip";
import { confirmParticipant } from "./routes/confirm-participant";
import { createActivity } from "./routes/create-activity";
import { getActivity } from "./routes/get-activities";
import { createLink } from "./routes/create-link";
import { getLinks } from "./routes/get-links";
import { getParticipants } from "./routes/get-participants";
import { createInvite } from "./routes/create-invite";
import { updateTrip } from "./routes/update-trip";
import { getTripDetails } from "./routes/get-trip-details";
import { getParticipant } from "./routes/get-participant";
import { errorHandler } from "./error-handler";
import { env } from "./env";
import { removeParticipantFromTrip } from "./routes/remove-participant-from-trip";

const app = fastify()

app.register(cors, {
  origin: env.WEB_BASE_URL,
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler(errorHandler)

app.register(createTrip)
app.register(updateTrip)
app.register(confirmTrip)
app.register(getTripDetails)
app.register(confirmParticipant)
app.register(getParticipants)
app.register(getParticipant)
app.register(removeParticipantFromTrip)
app.register(createActivity)
app.register(getActivity)
app.register(createLink)
app.register(getLinks)
app.register(createInvite)

app.listen({ port: env.PORT }, () => {
  console.log("🔥 Server running ☕🚀")
})
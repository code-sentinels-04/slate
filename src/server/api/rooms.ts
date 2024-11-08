import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { AccessToken } from "livekit-server-sdk";

const apiKey = process.env.LIVEKIT_API_KEY!;
const apiSecret = process.env.LIVEKIT_API_SECRET!;

export const livekitRouter = t.router({
  createRoom: t.procedure
    .input(z.object({ roomName: z.string() }))
    .mutation(async ({ input }) => {
      try {
        // Replace with LiveKit server logic to create a room
        const livekitClient = new AccessToken(apiKey, apiSecret);
        const room = await livekitClient.createRoom(input.roomName);
        return { success: true, room };
      } catch (error) {
        console.error("Error creating room:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create room",
        });
      }
    }),
  
  generateToken: t.procedure
    .input(z.object({ roomName: z.string(), userName: z.string() }))
    .mutation(({ input }) => {
      try {
        const token = new AccessToken(apiKey, apiSecret, {
          identity: input.userName,
        });
        token.addGrant({ roomJoin: true, room: input.roomName });
        return { token: token.toJwt() };
      } catch (error) {
        console.error("Error generating token:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Token generation failed",
        });
      }
    }),
});

//errors to be corrected //
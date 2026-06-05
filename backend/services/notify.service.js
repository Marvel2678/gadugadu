import { db } from "../index.js";

export const notifyService = {
  sendNotification: async (ExpoService, tokens, title) => {
    console.log("TOKENS: ", tokens);
    const messages = tokens.map((token) => {
      // if (!ExpoService.isExpoPushToken(token)) {
      //   console.error(`Invalid Expo push token: ${token}`);
      //   throw new Error(`Invalid Expo push token: ${token}`);
      // }
      return {
        to: token,
        sound: "default",
        title,
        body: "Masz nową wiadomość",
      };
    });

    const chunks = ExpoService.chunkPushNotifications(messages);
    let tickets = [];
    // Send the chunks to the Expo push notification service. There are
    // different strategies you could use. A simple one is to send one chunk at a
    // time, which nicely spreads the load out over time:
    for (const chunk of chunks) {
      try {
        const ticketChunk = await ExpoService.sendPushNotificationsAsync(chunk);
        console.log("result of sending push messages to Expo:", ticketChunk);
        tickets.push(...ticketChunk);
        // NOTE: If a ticket contains an error code in ticket.details.error, you
        // must handle it appropriately. The error codes are listed in the Expo
        // documentation:
        // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
      } catch (error) {
        console.error(error);
      }
    }
    // NOTE: Not all tickets have IDs; for example, tickets for notifications
    // that could not be enqueued will have error information and no receipt ID.
    const receiptIds = tickets
      .filter((ticket) => ticket.status === "ok")
      .map((ticket) => ticket.id);

    const receiptIdChunks =
      ExpoService.chunkPushNotificationReceiptIds(receiptIds);

    // Like sending notifications, there are different strategies you could use
    // to retrieve batches of receipts from the Expo service.
    for (let chunk of receiptIdChunks) {
      try {
        const receipts =
          await ExpoService.getPushNotificationReceiptsAsync(chunk);
        console.log({ chunk, receipts });

        // The receipts specify whether Apple or Google successfully received the
        // notification and information about an error, if one occurred.
        const failedReceipts = Object.values(receipts).filter(
          (receipt) => receipt.status !== "ok",
        );

        failedReceipts.forEach(({ message, details }) => {
          console.error(
            `There was an error sending a notification: ${message}`,
          );
          if (details && details.error) {
            // The error codes are listed in the Expo documentation:
            // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
            // You must handle the errors appropriately.
            console.error(`The error code is ${details.error}`);
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  },
  getPushTokens: async (conversation_id, userId) => {
    try {
      const result = await db.query(
        "SELECT token FROM push_tokens join conversation_members on push_tokens.user_id = conversation_members.user_id WHERE conversation_members.conversation_id = $1 AND conversation_members.user_id != $2",
        [conversation_id, userId],
      );
      console.log(
        "PUSH TOKENS:",
        result.rows.map((row) => row.token),
      );
      return result.rows.map((row) => row.token);
    } catch (error) {
      throw new Error("Could not retrieve push tokens");
    }
  },
};

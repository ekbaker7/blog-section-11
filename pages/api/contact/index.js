import { connectDatabase, insertDocument } from "../../../lib/db-utils";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !name ||
      !email.includes("@") ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const newMessage = {
      email,
      name,
      message,
    };

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Failed to connect to database" });
      return;
    }

    let result;

    try {
      result = await insertDocument(client, "contacts", newMessage);
    } catch (insertError) {
      res
        .status(500)
        .json({ message: "Failed to insert contact info into database" });

      client.close();

      return;
    }

    res
      .status(201)
      .json({ message: "Successfully stored message", newMessage });
  }
}

export default handler;

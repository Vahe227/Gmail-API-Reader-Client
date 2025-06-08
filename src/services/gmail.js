const { google } = require('googleapis');

// This function will return a list of emails in HTML format
async function readEmails(auth, res) {
    try {
        const gmail = google.gmail({ version: "v1", auth });
        const response = await gmail.users.messages.list({
            userId: "me",
            maxResults: 30,
        });

        const messages = response.data.messages;

        if (!messages || messages.length === 0) {
            res.send("There are no messages.");
            return;
        }

        const mails = await Promise.all(messages.map(async (m) => {
            try {
                const emailInfo = await getEmail(m.id, gmail);
                return `<li>${emailInfo}</li>`;
            } catch (emailError) {
                console.error(`Could not load email ${m.id}.`, emailError);
                return `<li>(Could not load email details.)</li>`;
            }
        }));

        const mailsHtml = mails.join("");
        res.status(200).send(`<h1>Messages</h1><ul>${mailsHtml}</ul>`);

        return;
    } catch (err) {
        console.log(err);
        res.status(500).send("Validation or upload failed.");
    }
}

// This function will return the details of a single email as a string
async function getEmail(emailId, gmail) {
    try {
        const response = await gmail.users.messages.get({ id: emailId, userId: "me" });
        const email = response.data;
        const subjectHeader = email.payload.headers.find(e => e.name === "Subject");
        const fromHeader = email.payload.headers.find(e => e.name === "From");
        const subject = subjectHeader ? subjectHeader.value : "(Without Subject)";
        const from = fromHeader ? fromHeader.value : "(Uniknown Send)";
        return `From: ${from} <br> Subject: ${subject}`;
    } catch (err) {
        console.error(err);
        return "(Could not load email details.)";
    }
}

module.exports = {
    readEmails,
    getEmail // Although getEmail is internal to readEmails, we can export it if needed
};
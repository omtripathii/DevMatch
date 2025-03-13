const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("./sesClient.js");

const createSendEmailCommand = (toAddress, fromAddress) => {
  return new SendEmailCommand({
    Destination: {
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="UTF-8">
                <title>Welcome to DevMatch</title>
              </head>
              <body style="margin:0; padding:0; background-color:#f4f4f4;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse:collapse;">
                  <tr>
                    <td align="center" bgcolor="#2c3e50" style="padding:40px 0 30px 0; color:#ffffff; font-size:28px; font-family:Arial, sans-serif;">
                      <strong>Welcome to DevMatch</strong>
                    </td>
                  </tr>
                  <tr>
                    <td bgcolor="#ffffff" style="padding:40px 30px 40px 30px; font-family:Arial, sans-serif; font-size:16px; line-height:24px;">
                      <p style="margin:0;">Hi there,</p>
                      <p>
                        We’re thrilled to have you join the DevMatch community—where talented developers connect, collaborate, and discover exciting opportunities.
                      </p>
                      <p style="font-weight:bold;">What to expect:</p>
                      <ul style="padding-left:20px; margin:0;">
                        <li>Smart matching with fellow developers</li>
                        <li>Opportunities to collaborate on innovative projects</li>
                        <li>Networking with industry professionals</li>
                      </ul>
                      <p>
                        Get started by logging into your account and exploring your personalized dashboard.
                      </p>
                      <p>Happy matching,</p>
                      <p><strong>The DevMatch Team</strong></p>
                    </td>
                  </tr>
                  <tr>
                    <td bgcolor="#2c3e50" style="padding:20px 30px 20px 30px; font-family:Arial, sans-serif; font-size:12px; color:#ffffff;" align="center">
                      © 2025 DevMatch. All rights reserved.
                    </td>
                  </tr>
                </table>
              </body>
            </html>
          `,
        },
        // Plain text alternative for email clients that don't support HTML
        Text: {
          Charset: "UTF-8",
          Data: `
            Welcome to DevMatch!

            Hi there,

            We’re thrilled to have you join the DevMatch community—where talented developers connect, collaborate, and discover exciting opportunities.

            What to expect:
            - Smart matching with fellow developers
            - Opportunities to collaborate on innovative projects
            - Networking with industry professionals

            Get started by logging into your account and exploring your personalized dashboard.

            Happy matching,
            The DevMatch Team

            © 2025 DevMatch. All rights reserved.
          `,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Welcome to DevMatch – Let’s Get Started!",
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [fromAddress],
  });
};

const run = async () => {
  const sendEmailCommand = createSendEmailCommand(
    "tripathi111om@gmail.com", // Replace with the recipient's email address
    "om@dev-om.live" // Replace with your verified sender email address
  );

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (caught) {
    if (caught instanceof Error && caught.name === "MessageRejected") {
      // Handle SES message rejection errors
      return caught;
    }
    throw caught;
  }
};

module.exports = { run };

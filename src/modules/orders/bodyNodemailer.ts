export const emailBody = (username: string)  => {
    return `
    <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                }
                .message {
                    font-size: 16px;
                    font-weight: bold;
                    color: #333;
                }
            </style>
        </head>
        <body>
            <p>Dear customer: ${username}</p>
            <p class="message">We received your order and it's being processed.</p>
            <p>Thank you for trusting in us!</p>
        </body>
    </html>
    `;
}
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const sendOrderConfirmationEmail = async ({
    email,
    name,
    order,
}) => {
    const itemsHtml = order.items
        .map((item) => {
            return `
                <tr>
                    <td style="padding:10px;border-bottom:1px solid #eee;">
                        ${
                            item.food?.name ||
                            "Food Item"
                        }
                    </td>

                    <td style="padding:10px;border-bottom:1px solid #eee;text-align:center;">
                        ${item.quantity}
                    </td>
                </tr>
            `;
        })
        .join("");

    const mailOptions = {
        from: `"Roopa's Restaurant" <${process.env.EMAIL_USER}>`,

        to: email,

        subject:
            "🍽️ Roopa's Restaurant - Order Update",

        html: `
            <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;background:#fffaf5;padding:20px;">

                <div style="background:#e85d2a;color:white;padding:25px;text-align:center;border-radius:15px 15px 0 0;">
                    <h1 style="margin:0;">
                        🍽️ Roopa's Restaurant
                    </h1>

                    <p style="margin:8px 0 0;">
                        Order Update
                    </p>
                </div>

                <div style="background:white;padding:30px;">

                    <h2>
                        Hey ${name || "there"}! 👋
                    </h2>

                    <p>
                        Your order status has been updated.
                    </p>

                    <table style="width:100%;border-collapse:collapse;margin-top:20px;">
                        <thead>
                            <tr style="background:#fff3eb;">
                                <th style="padding:10px;text-align:left;">
                                    Item
                                </th>

                                <th style="padding:10px;text-align:center;">
                                    Quantity
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            ${itemsHtml}
                        </tbody>
                    </table>

                    <div style="margin-top:25px;padding:18px;background:#fff3eb;border-radius:12px;">
                        <strong>
                            Order Status:
                        </strong>

                        <span style="color:#e85d2a;font-weight:bold;">
                            ${order.status}
                        </span>
                    </div>

                    <h2 style="color:#e85d2a;">
                        Total: ₹${order.totalAmount}
                    </h2>

                    <p style="color:#777;">
                        Thank you for ordering from Roopa's Restaurant ❤️
                    </p>

                </div>
            </div>
        `,
    };

    await transporter.sendMail(
        mailOptions
    );
};

module.exports = {
    sendOrderConfirmationEmail,
};
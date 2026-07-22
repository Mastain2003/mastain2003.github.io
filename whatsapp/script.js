const ACCESS_TOKEN = "YOUR_ACCESS_TOKEN";
const PHONE_NUMBER_ID = "YOUR_PHONE_NUMBER_ID";

async function sendMessage() {

    const response = await fetch(
        `https://graph.facebook.com/v23.0/${PHONE_NUMBER_ID}/messages`,
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${ACCESS_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                messaging_product: "whatsapp",
                to: "919876543210",
                type: "template",
                template: {
                    name: "YOUR_TEMPLATE_NAME",
                    language: {
                        code: "en"
                    },
                    components: [
                        {
                            type: "body",
                            parameters: [
                                {
                                    type: "text",
                                    text: "1001"
                                },
                                {
                                    type: "text",
                                    text: "2002"
                                },
                                {
                                    type: "text",
                                    text: "3003"
                                },
                                {
                                    type: "text",
                                    text: "4004"
                                },
                                {
                                    type: "text",
                                    text: "5005"
                                }
                            ]
                        }
                    ]
                }
            })
        }
    );

    const data = await response.json();

    document.getElementById("result").textContent =
        JSON.stringify(data, null, 2);
}

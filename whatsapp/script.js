
const ACCESS_TOKEN = "EAASZB1cCOVccBSFZCrY9MJDZBNkxBRAShm68mzYMuRaVxIXCSQ9vulq5pmlukzJkVHoBgVZBpfu3UviZCHvkyAjI6hSpJbHB7RHZC2CrpMUckAgXU1lGbSwhHdyS5MGKEZBzblBSnB0zkK7uZClSSX9xstK8aaPf7x2ZBWJa3cajz5agLOGzCUMVTXqNwJ4bDXW2hGvZAr8yBZBkfVWT1di8xTeo0uRcUIXi2K4wUp6jCy9409IsJOKgzVt9t7jBlFuZC4ZCQrmiE0tRAnrzL1AN0PAg2bnQn";
const PHONE_NUMBER_ID = "1169100286293064";

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
                to: "919955160127",
                type: "template",
                template: {
                    name: "independence_day_offer",
                    language: {
                        code: "en"
                    },
                    components: [
                        {
                            type: "body",
                            parameters: [
                                {
                                    type: "text",
                                    text: "Prakhar Mastain"
                                },
                                {
                                    type: "text",
                                    text: "Marketing Incharge"
                                },
                                {
                                    type: "text",
                                    text: "Milk Plant Ratlam"
                                },
                                {
                                    type: "text",
                                    text: "Ratlam"
                                },
                                {
                                    type: "text",
                                    text: "919955160127"
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

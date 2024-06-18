import { createApp } from "../../app.mjs";

test("GET /service/get_details without headers", async() => {
    const app = createApp(3000);
    await app.ready();

    const res = await app.inject({
        method: "GET",
        url: "/service/get_details",
    });
    const data = res.json();

    expect(data).toMatchObject({
        status: "error",
        key: "BAD_REQUEST_ERROR",
        data: null,
    }); 

    await app.close(); 
});
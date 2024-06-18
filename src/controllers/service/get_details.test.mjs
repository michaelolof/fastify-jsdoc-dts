import { describe, it, before, after } from "node:test";
import assert from "node:assert";
import { createApp } from "#src/app.mjs";

const path = "/api/v1/service/get_details";
const app = createApp(3000);

describe(`GET ${path}`, async() => {

    before(async() => {
        await app.ready();
    });
    
    it("should fail without request headers", async() => {
        const res = await app.inject({
            method: "GET",
            url: "/api/v1/service/get_details",
        });
    
        const actual = res.json();
        const expected = {
            status: "error",
            key: "BAD_REQUEST_ERROR",
            data: null,        
        };
    
        assert.equal(actual.status, expected.status);
        assert.equal(actual.key, expected.key);
        assert.equal(actual.data, expected.data);
        assert.match(actual.message, /headers must have required property/);        
    });

    after(async() => {
        await app.close(); 
    });
    
});
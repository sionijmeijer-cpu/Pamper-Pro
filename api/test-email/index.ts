import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export async function handler(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log("Test email endpoint hit");
    return {
        status: 200,
        jsonBody: { message: "test working" }
    };
}

app.http("test-email", {
    methods: ["GET"],
    authLevel: "anonymous",
    handler,
});

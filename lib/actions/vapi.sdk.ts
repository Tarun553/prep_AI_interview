import Vapi from "@vapi-ai/web";

const workflowId = process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID;

if (!workflowId) {
    throw new Error("NEXT_PUBLIC_VAPI_WORKFLOW_ID is not defined");
}

export const vapi = new Vapi(workflowId);

import { NextResponse } from "next/server";

// Utility function to create a standardized response message
export const getResponseMessage = (message, statusCode, successStatus) => {
    return NextResponse.json({
        message: message,
        success: successStatus,
    }, {
        status: statusCode,
    });
};
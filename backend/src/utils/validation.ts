import { BadRequestError } from "../errors/httpErrors";

export function validateStringField(
    value: unknown,
    fieldName: string
): string {
    if (typeof value !== "string") {
        throw new BadRequestError(`${fieldName} must be a string`);
    }

    const trimmed = value.trim();
    if (!trimmed) {
        throw new BadRequestError(`${fieldName} cannot be empty`);
    }

    return trimmed;
}

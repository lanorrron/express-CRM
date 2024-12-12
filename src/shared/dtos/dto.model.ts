import {validate, validateSync, ValidationError} from "class-validator";

interface Validation {
    isValid: boolean;
    errors: Array<string>;
}

export abstract class DTO<T> {
    constructor(data: Partial<T>) {
        Object.entries(data).forEach(([key, value])=>{
            if(typeof value === 'string'){
                (data as any)[key] = value.trim().replace(/\s+/g, ' ')
            }
        })
        Object.assign(this, data)
    }

    validate(): Validation {
        const validationsError = validateSync(this)
        return this.formatErrors(validationsError)
    }

    async validateAsync(): Promise<Validation> {
        const validationErrors = await validate(this)
        return this.formatErrors(validationErrors)
    }

    private formatErrors(errors: ValidationError[]): Validation {
        const flattenedErrors: string[] = []
        errors.forEach((error) => {
            if (error.constraints) {
                flattenedErrors.push(...Object.values((error.constraints)))
            }
        })
        return {
            isValid: errors.length === 0,
            errors: flattenedErrors
        };
    }
}
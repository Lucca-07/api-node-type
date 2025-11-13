import type { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";


interface ICidade {
    nome: string;
    estado: string;
}

const bodyValidation: yup.Schema<ICidade> = yup.object().shape({
    nome: yup.string().required().min(3),
    estado: yup.string().required().min(3),
});

export const createBodyValidator: RequestHandler = async (req, res, next) => {
    try {
        await bodyValidation.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {

        const yupError = error as yup.ValidationError;

        const validationErrors: Record<string, string> = {};

        yupError.inner.forEach((error) => {
            if (!error.path) return;
            validationErrors[error.path] = error.message;
        });

        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: validationErrors
        });
    }
}


interface IFilter {
    filter?: string;
}
const queryValidation: yup.Schema<IFilter> = yup.object().shape({
    filter: yup.string().required().min(3),
});
export const createQueryValidator: RequestHandler = async (req, res, next) => {
    try {
        await bodyValidation.validate(req.query, { abortEarly: false });
        next();
    } catch (error) {

        const yupError = error as yup.ValidationError;

        const validationErrors: Record<string, string> = {};

        yupError.inner.forEach((error) => {
            if (!error.path) return;
            validationErrors[error.path] = error.message;
        });

        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: validationErrors
        });
    }
}

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
    console.log(req.body)

    return res.send("Create!");
};
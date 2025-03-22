import joi from "joi";

const validTypes = ['latest','popular'];

const validateInput = (req, res, next) => {
    const schema = joi.object({
        type: joi.string().valid(...validTypes).required(),
    });

    const { error } = schema.validate(req.query);

    if (error) {
        return res.status(400).json({
            status: "fail",
            message: "Invalid input" // custom error message
        });
    }

    next();
}

export default validateInput;
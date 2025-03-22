import joi from "joi";

const validTypes = ['p', 'f', 'e', 'r'];

const validateInput = (req, res, next) => {
    const schema = joi.object({
        numberid: joi.string().valid(...validTypes).required(),
    });

    const { error } = schema.validate(req.params);

    if (error) {
        return res.status(400).json({
            status: "fail",
            message: "Invalid input" // custom error message
        });
    }

    next();
}

export default validateInput;